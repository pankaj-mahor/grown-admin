import {
	Avatar,
	Modal,
	Table,
	Tag,
	Typography,
	Select,
	Button,
	Space,
	Input,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { IoIosPerson } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutUser } from "../../features/user/userSlice";
import { customFetch } from "../../utils";
import { CiSearch } from "react-icons/ci";
const { confirm } = Modal;
const { Text } = Typography;
const { Option } = Select;

const AllOrders = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [updatingStatus, setUpdatingStatus] = useState(false);

	const getAllOrders = async () => {
		try {
			setLoading(true);
			const res = await customFetch("/admin/orders");
			const { data } = res;
			console.log(data);
			// Assuming the API returns an array of order objects like the sample provided
			setData(() => {
				return data?.data?.orders?.map((order, index) => ({
					...order,
					index: index + 1,
					// Parse the stringified arrays if they are strings
					productIds:
						typeof order.productIds === "string"
							? JSON.parse(order.productIds)
							: order.productIds,
					productImages:
						typeof order.productImages === "string"
							? JSON.parse(order.productImages)
							: order.productImages,
					quantity:
						typeof order.quantity === "string"
							? JSON.parse(order.quantity)
							: order.quantity,
					productName:
						typeof order.productName === "string"
							? JSON.parse(order.productName)
							: order.productName,
					productSize:
						typeof order.productSize === "string"
							? JSON.parse(order.productSize)
							: order.productSize,
				}));
			});
			setLoading(false);
		} catch (error) {
			setLoading(false);
			const { response } = error;
			const { data } = response;

			if (data?.message.includes("Unauthorized")) {
				navigate("/login");
				dispatch(logoutUser());
			} else {
				toast.error(`${data?.message || "Try Again"}`);
			}
		}
	};

	useEffect(() => {
		getAllOrders();
	}, []);

	const handleViewDetails = (order) => {
		setSelectedOrder(order);
		setIsModalVisible(true);
	};

	const handleCloseModal = () => {
		setIsModalVisible(false);
		setSelectedOrder(null);
	};

	const handleStatusUpdate = async (orderId, newStatus) => {
		console.log(`Update status for order ${orderId} to ${newStatus}`);
		setUpdatingStatus(true);
		try {
			await customFetch.put(`/admin/orders/${orderId}/status`, {
				status: newStatus,
			}); // Placeholder endpoint
			toast.success("Order status updated");
			getAllOrders(); // Refresh orders
			// Optionally update the selectedOrder state to reflect the change immediately
			if (selectedOrder && selectedOrder.id === orderId) {
				setSelectedOrder({ ...selectedOrder, status: newStatus });
			}
		} catch (error) {
			toast.error(
				error?.response?.data?.message || "Failed to update order status"
			);
		} finally {
			setUpdatingStatus(false);
		}
	};

	const handleCancelOrder = async (orderId) => {
		console.log(`Cancel order ${orderId}`);
		setUpdatingStatus(true);
		try {
			await customFetch.put(`/admin/orders/${orderId}/cancel`); // Placeholder endpoint
			toast.success("Order cancelled");
			getAllOrders(); // Refresh orders
			// Optionally update the selectedOrder state to reflect the change immediately
			if (selectedOrder && selectedOrder.id === orderId) {
				setSelectedOrder({ ...selectedOrder, status: "Cancelled" }); // Assuming status becomes 'Cancelled'
			}
		} catch (error) {
			toast.error(error?.response?.data?.message || "Failed to cancel order");
		} finally {
			setUpdatingStatus(false);
		}
	};

	const columns = [
		// {
		// 	title: "S. No.",
		// 	dataIndex: "index",
		// 	align: "center",
		// 	render: (text) => <p className="fw-500 mb-0 font-neue-medium">{text}</p>,
		// 	width: "5%",
		// },
		{
			title: "Order ID",
			dataIndex: "id",
			align: "center",
			render: (text) => <Text>{text}</Text>,
		},
		{
			title: "Customer Email",
			dataIndex: "email",
			align: "center",
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
			}) => (
				<div style={{ padding: 8 }}>
					<Input
						placeholder="Search email"
						value={selectedKeys[0]}
						onChange={(e) =>
							setSelectedKeys(e.target.value ? [e.target.value] : [])
						}
						onPressEnter={() => confirm()}
						style={{ width: 188, marginBottom: 8, display: "block" }}
					/>
					<Space>
						<Button
							onClick={() => clearFilters()}
							size="small"
							style={{ width: 90 }}
						>
							Reset
						</Button>
						<Button
							type="primary"
							onClick={() => confirm()}
							icon={<CiSearch />}
							size="small"
							style={{ width: 90 }}
							variant="solid"
							color="default"
						>
							Search
						</Button>
					</Space>
				</div>
			),
			filterIcon: (filtered) => (
				<CiSearch style={{ color: filtered ? "#1890ff" : undefined }} />
			),
			onFilter: (value, record) =>
				record.email.toString().toLowerCase().includes(value.toLowerCase()),
		},
		{
			title: "Products",
			dataIndex: "productName",
			align: "center",
			render: (text, record) => (
				<div>
					{record?.productName?.map((name, idx) => (
						<div key={idx} className="flex items-center gap-2 mb-2">
							<Avatar
								size="large"
								icon={<IoIosPerson />}
								src={record.productImages[idx] || undefined}
							/>
							<div>
								<p className="mb-0">{name}</p>
								<p className="mb-0 text-gray-500 text-xs text-left">
									Qty: {record.quantity[idx]}
								</p>
							</div>
						</div>
					))}
				</div>
			),
			filterSearch: true,

			onFilter: (value, record) => record.name.includes(value),
		},
		{
			title: "Total Amount",
			dataIndex: "total",
			align: "center",
			render: (text, record) => (
				<p className="fw-500 mb-0 font-neue-medium">{`${text} ${record.currency}`}</p>
			),
			sorter: (a, b) => a.total - b.total,
			showSorterTooltip: () => console.log("a"),
		},
		// {
		// 	title: "Payment Method",
		// 	dataIndex: "method",
		// 	align: "center",
		// },
		{
			title: "Status",
			dataIndex: "status",
			align: "center",
			render: (text, record) => (
				<>
					<Tag
						color={
							text === "Delivered"
								? "green"
								: text === "Processing"
								? "blue"
								: "orange"
						}
						bordered={false}
					>
						{text}
					</Tag>{" "}
					<br />
					<small>{record?.method}</small>
				</>
			),
			filters: [
				{
					text: "Delivered",
					value: "Delivered",
				},
				{
					text: "Processing",
					value: "Processing",
				},
				{
					text: "Placed",
					value: "Placed",
				},
				{
					text: "Paid",
					value: "Paid",
				},
			],
			onFilter: (value, record) => record.status.indexOf(value) === 0,
		},
		{
			title: "Shipping Address",
			dataIndex: "address",
			align: "center",
			render: (text, record) => (
				<div>
					<p className="mb-0">{text}</p>
					<p className="mb-0 text-gray-500 text-xs">
						{record.city}, {record.state} - {record.pincode}
					</p>
					<p className="mb-0 text-gray-500 text-xs">{record.country}</p>
				</div>
			),
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
			}) => (
				<div style={{ padding: 8 }}>
					<Input
						placeholder="Search email"
						value={selectedKeys[0]}
						onChange={(e) =>
							setSelectedKeys(e.target.value ? [e.target.value] : [])
						}
						onPressEnter={() => confirm()}
						style={{ width: 188, marginBottom: 8, display: "block" }}
					/>
					<Space>
						<Button
							onClick={() => clearFilters()}
							size="small"
							style={{ width: 90 }}
						>
							Reset
						</Button>
						<Button
							type="primary"
							onClick={() => confirm()}
							icon={<CiSearch />}
							size="small"
							style={{ width: 90 }}
							variant="solid"
							color="default"
						>
							Search
						</Button>
					</Space>
				</div>
			),
			filterIcon: (filtered) => (
				<CiSearch style={{ color: filtered ? "#1890ff" : undefined }} />
			),
			onFilter: (value, record) =>
				record.email.toString().toLowerCase().includes(value.toLowerCase()),
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
			}) => (
				<div style={{ padding: 8 }}>
					<Input
						placeholder="Search email"
						value={selectedKeys[0]}
						onChange={(e) =>
							setSelectedKeys(e.target.value ? [e.target.value] : [])
						}
						onPressEnter={() => confirm()}
						style={{ width: 188, marginBottom: 8, display: "block" }}
					/>
					<Space>
						<Button
							onClick={() => clearFilters()}
							size="small"
							style={{ width: 90 }}
						>
							Reset
						</Button>
						<Button
							type="primary"
							onClick={() => confirm()}
							icon={<CiSearch />}
							size="small"
							style={{ width: 90 }}
							variant="solid"
							color="default"
						>
							Search
						</Button>
					</Space>
				</div>
			),
			filterIcon: (filtered) => (
				<CiSearch style={{ color: filtered ? "#1890ff" : undefined }} />
			),
			onFilter: (value, record) =>
				record.email.toString().toLowerCase().includes(value.toLowerCase()),
		},
		{
			title: "Mobile",
			dataIndex: "mobile",
			align: "center",
			filterSearch: true,

			onFilter: (value, record) => record.name.includes(value),
		},
		{
			title: "Order Date",
			dataIndex: "createdAt",
			align: "center",
			render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm"),
			sorter: (a, b) => dayjs(a.total) - dayjs(b.total),
		},
		{
			title: "Action",
			dataIndex: "",
			align: "center",
			render: (text, record) => (
				<button
					className="btn btn-xs btn-info"
					onClick={() => handleViewDetails(record)}
				>
					View Details
				</button>
			),
		},
	];
	return (
		<div className="bg-white rounded-xl shadow-sm p-3 ">
			<h4 className="text-2xl py-3">All Orders</h4>

			<Table
				id="orders-table"
				className="overflow-x-auto"
				dataSource={data}
				columns={columns}
				loading={loading}
				rowKey="id"
				pagination={{ pageSize: 10 }}
				scroll={{
					x: "max-content",
				}}
			/>

			{selectedOrder && (
				<Modal
					title={`Order Details (ID: ${selectedOrder.id})`}
					open={isModalVisible}
					onCancel={handleCloseModal}
					footer={[
						<Button key="back" onClick={handleCloseModal}>
							Close
						</Button>,
						// Add status update buttons here if needed instead of dropdown
					]}
					width={700}
				>
					<div>
						<h5 className="text-lg font-bold mb-3">Products:</h5>
						{selectedOrder?.productName?.map((name, idx) => (
							<div
								key={idx}
								className="flex items-center gap-3 mb-3 border-b pb-3"
							>
								<Avatar
									size={64}
									icon={<IoIosPerson />}
									src={selectedOrder.productImages[idx] || undefined}
								/>
								<div className="flex-1">
									<p className="font-medium mb-1">{name}</p>
									<p className="text-gray-600 text-sm mb-1">
										Qty: {selectedOrder.quantity[idx]}
									</p>
									<div className="mt-2">
										<Space>
											<Select
												defaultValue={
													selectedOrder.itemStatus?.[idx] ||
													selectedOrder.status
												}
												style={{ width: 200 }}
												onChange={(value) =>
													handleItemStatusUpdate(selectedOrder.id, idx, value)
												}
												disabled={updatingStatus}
											>
												<Option value="Placed">Placed</Option>
												<Option value="Processing">Processing</Option>
												<Option value="Shipped">Shipped</Option>
												<Option value="Delivered">Delivered</Option>
												<Option value="Cancelled">Cancelled</Option>
											</Select>
											{selectedOrder.itemStatus?.[idx] !== "Cancelled" &&
												selectedOrder.itemStatus?.[idx] !== "Delivered" && (
													<Button
														type="danger"
														size="small"
														onClick={() =>
															handleCancelItem(selectedOrder.id, idx)
														}
														loading={updatingStatus}
													>
														Cancel Item
													</Button>
												)}
										</Space>
									</div>
								</div>
							</div>
						))}

						<h5 className="text-lg font-bold mt-4 mb-3">Order Information:</h5>
						<p>
							<strong>Status:</strong>{" "}
							<Tag
								color={
									selectedOrder.status === "Delivered"
										? "green"
										: selectedOrder.status === "Processing"
										? "blue"
										: "orange"
								}
								bordered={false}
							>
								{selectedOrder.status}
							</Tag>
						</p>
						<p>
							<strong>Total:</strong> {selectedOrder.total}{" "}
							{selectedOrder.currency}
						</p>
						<p>
							<strong>Payment Method:</strong> {selectedOrder.method}
						</p>
						<p>
							<strong>Order Date:</strong>{" "}
							{dayjs(selectedOrder.createdAt).format("YYYY-MM-DD HH:mm")}
						</p>

						<h5 className="text-lg font-bold mt-4 mb-3">
							Update Overall Order Status:
						</h5>
						<Space>
							<Select
								defaultValue={selectedOrder.status}
								style={{ width: 200 }}
								onChange={(value) =>
									handleStatusUpdate(selectedOrder.id, value)
								}
								disabled={updatingStatus}
							>
								<Option value="Placed">Placed</Option>
								<Option value="Processing">Processing</Option>
								<Option value="Shipped">Shipped</Option>
								<Option value="Delivered">Delivered</Option>
								<Option value="Cancelled">Cancelled</Option>
							</Select>
							{selectedOrder.status !== "Cancelled" &&
								selectedOrder.status !== "Delivered" && (
									<Button
										type="danger"
										onClick={() => handleCancelOrder(selectedOrder.id)}
										loading={updatingStatus}
									>
										Cancel Order
									</Button>
								)}
						</Space>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default AllOrders;
