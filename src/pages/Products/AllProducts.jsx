import { Avatar, Button, Input, Modal, Space, Table, Tag } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { IoIosPerson } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutUser } from "../../features/user/userSlice";
import { customFetch } from "../../utils";
import AddProduct from "./AddProduct";
import { CiSearch } from "react-icons/ci";
import { useQuery, useQueryClient } from "@tanstack/react-query";
const { confirm } = Modal;
const AllProducts = () => {
	const queryClient = useQueryClient();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);

	const [showEditPopup, setShowEditPopup] = useState(false);
	const [editPopupData, setEditPopupData] = useState({});

	const {
		data: banners,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const response = await customFetch.get("/admin/products");
			setData(() => {
				return response?.data?.data?.map((user, index) => ({
					...user,
					index: index + 1,
				}));
			});
			return response.data.data;
		},
	});

	// const getAllProducts = async () => {
	// 	try {
	// 		setLoading(true);
	// 		const res = await customFetch("/admin/getAllProducts");
	// 		const { data } = res;
	// 		console.log(data);
	// 		// setData(data?.data || []);

	// 		setData(() => {
	// 			return data?.data?.map((user, index) => ({
	// 				...user,
	// 				index: index + 1,
	// 			}));
	// 		});
	// 		setLoading(false);
	// 	} catch (error) {
	// 		const { response } = error;
	// 		const { data } = response;

	// 		if (data?.message.includes("Unauthorized")) {
	// 			navigate("/login");
	// 			dispatch(logoutUser());
	// 		} else {
	// 			toast.error(`${data?.message || "Try Again"}`);
	// 		}
	// 	}
	// };

	// useEffect(() => {
	// 	getAllProducts();
	// }, []);

	const showDeleteConfirm = (id) => {
		confirm({
			title: "Are you sure delete this Product?",
			icon: <FaInfoCircle size={25} className="mr-4" />,
			// content: 'Some descriptions',
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			onOk() {
				deleteProduct(id);
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	const deleteProduct = async (productId) => {
		try {
			const res = await customFetch.delete(`/admin/products/${productId}`);
			const { data } = res;
			toast.success(data?.message);
			queryClient.invalidateQueries(["products"]);
		} catch (error) {
			const { response } = error;
			const { data } = response;
			toast.error(`${data?.message || "Try Again"}`);
		}
	};

	const columns = [
		{
			title: "S. No.",
			dataIndex: "index",
			align: "center",
			render: (text) => <p className="fw-500 mb-0 font-neue-medium">{text}</p>,
			width: "3%",
		},
		{
			title: "Name",
			dataIndex: "name",
			render: (text, record) => (
				<p
					// to={`/recruiter/candidate/${record?.userId}`}
					className="d-flex align-items-center text-decoration-none gap-3 clr-21 font-neue-medium fw-500 fs-16 text-capitalize cursor-pointer"
					state={{
						jobId: record?.id,
					}}
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					<Avatar
						icon={
							record?.p_image && record?.p_image !== null ? null : (
								<IoIosPerson />
							)
						}
						src={
							record?.p_image && record?.p_image !== null ? record?.p_image : ""
						}
					/>
					<span className="underline text-green-800 lh-1 ms-2 capitalize">
						{text} {record?.size}"
					</span>
					{record?.is_flash ? (
						<Tag bordered={false} color="purple" className="ms-2">
							Flash sale
						</Tag>
					) : null}
				</p>
			),
			sorter: (a, b) => a.name - b.name,
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
			}) => (
				<div style={{ padding: 8 }}>
					<Input
						placeholder="Search "
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
				record.name.toString().toLowerCase().includes(value.toLowerCase()),
		},
		{
			title: "Description",
			dataIndex: "description",
			align: "center",
			render: (text) => <p className="fw-500 mb-0 font-neue-medium">{text}</p>,
			// width: '30%'
		},
		{
			title: "Stock",
			dataIndex: "Stock_availble",
			align: "center",
			render: (text, record) => (
				<p className=" fw-500 mb-0 font-neue-regular">
					{record?.Stock_availble || 0}/{record?.stock_total || 0}
				</p>
			),
			sorter: (a, b) => a.Stock_availble - b.Stock_availble,
		},
		{
			title: "Price/MRP",
			dataIndex: "offer_price",
			align: "center",
			render: (text, record) => (
				<p className=" fw-500 mb-0 font-neue-regular">
					{record?.offer_price || 0}/{record?.price || 0}
				</p>
			),
			sorter: (a, b) => a.offer_price - b.offer_price,
		},
		{
			title: "Category",
			dataIndex: "category_id",
			align: "center",
			render: (text, record) => (
				<p className=" fw-500 mb-0 font-neue-regular">{text}</p>
			),
		},
		{
			title: "Action",
			dataIndex: "",
			render: (text, record) => (
				<div className="flex gap-4 items-center">
					<button
						className="btn btn-xs btn-warning "
						onClick={() => {
							setEditPopupData({});
							setShowEditPopup(true);
							setEditPopupData(record);
						}}
					>
						Edit
					</button>
					<button
						className="btn btn-xs btn-error "
						onClick={() => showDeleteConfirm(record?.id)}
					>
						Delete
					</button>
				</div>
			),
			// width: '15%',
			align: "center",
		},
	];

	const [addProductModal, setAddProductModal] = useState(false);
	const handleCloseModal = () => {
		setAddProductModal(false);
	};
	return (
		<div className="bg-white rounded-xl shadow-sm p-3 ">
			<div className="mb-4 flex justify-between items-center">
				<h4 className="text-2xl py-3">All Products</h4>
				<div className="flex">
					<button
						className="btn btn-primary"
						onClick={() => setAddProductModal(true)}
					>
						+ Add product
					</button>
				</div>
			</div>

			<Table
				id="users"
				className=""
				dataSource={data}
				columns={columns}
				loading={loading}
				scroll={{
					x: 690,
					// y: 450
				}}
			/>

			<Modal
				title={`Add Product - `}
				visible={addProductModal}
				onCancel={handleCloseModal}
				footer={null}
				width={"75%"}
			>
				<AddProduct />
			</Modal>
			<Modal
				title={`Edit Product - `}
				visible={showEditPopup}
				open={showEditPopup}
				onCancel={() => {
					setEditPopupData({});
					setShowEditPopup(false);
				}}
				footer={null}
				destroyOnClose
				width={"75%"}
			>
				<AddProduct
					record={editPopupData}
					setShowEditPopup={setShowEditPopup}
				/>
			</Modal>
		</div>
	);
};

export default AllProducts;
