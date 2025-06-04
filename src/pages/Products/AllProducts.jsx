import { Avatar, Modal, Table, Tag } from "antd";
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
const { confirm } = Modal;
const AllProducts = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);

	const getAllProducts = async () => {
		try {
			setLoading(true);
			const res = await customFetch("/admin/getAllProducts");
			const { data } = res;
			console.log(data);
			// setData(data?.data || []);

			setData(() => {
				return data?.data?.map((user, index) => ({
					...user,
					index: index + 1,
				}));
			});
			setLoading(false);
		} catch (error) {
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
		getAllProducts();
	}, []);

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
			const res = await customFetch.delete(
				`/admin/delete-product/${productId}`
			);
			const { data } = res;
			toast.success(data?.message);
			getAllProducts();
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
		},
		{
			title: "Category",
			dataIndex: "category_id",
			align: "center",
			render: (text, record) => (
				<p className=" fw-500 mb-0 font-neue-regular">{text}</p>
			),
		},
		// {
		// 	title: "Otp",
		// 	dataIndex: "otp",
		// 	align: "center",
		// 	render: (text, record) => (
		// 		<p className=" fw-500 mb-0 font-neue-regular">{text}</p>
		// 	),
		// },
		// {
		// 	title: "DOB",
		// 	dataIndex: "dob",
		// 	align: "center",
		// 	render: (text) => (
		// 		<p className="jobMatch fw-500 mb-0 font-neue-regular">
		// 			{dayjs(text).format("D MMM YYYY")}
		// 		</p>
		// 	),
		// },
		// {
		// 	title: 'Engagement Rate',
		// 	dataIndex: 'isEngagementRate',
		// 	align: 'center',
		// 	render: (_, record) => {
		// 		return (
		// 			<div
		// 				className={
		// 					record.isEngagementRate
		// 						? 'treandIndicaterGreen font-general-regular'
		// 						: 'treandIndicater font-general-regular'
		// 				}
		// 			>
		// 				{record.isEngagementRate ? <FaArrowUpLong /> : <FaArrowDownLong />}
		// 				{record.engagementRate}%
		// 			</div>
		// 		)
		// 	}
		// },
		// {
		// 	title: 'Roadmap Progress',
		// 	dataIndex: 'roadmapProgress',
		// 	align: 'center',
		// 	render: text => (
		// 		<Progress
		// 			className="font-neue-regular fs-6 mb-0 clr-676"
		// 			type="circle"
		// 			percent={text}
		// 			strokeColor={{
		// 				'0%': '#04702C',
		// 				'100%': '#04702C'
		// 			}}
		// 			strokeWidth={12}
		// 			size={60}
		// 		/>
		// 	)
		// },
		// {
		// 	title: 'Status',
		// 	dataIndex: 'status',
		// 	render: text => (
		// 		<Text type="success" className=" fw-500">
		// 			{/* success, error, warning */}
		// 			<Badge status="success" className="me-2" />

		// 			{text}
		// 		</Text>
		// 	)
		// },
		// {
		// 	title: "Location",
		// 	dataIndex: "city",
		// 	render: (text) => (
		// 		<p className="fw-500  text-black font-neue-medium mb-0">{text}</p>
		// 	),
		// 	// width: '30%',
		// 	align: "center",
		// },
		// {
		// 	title: "Status",
		// 	dataIndex: 'isActive',
		// 	render: text => (
		// 		<Pill
		// 			className={`${text === 'active' ? 'active' : 'inactive'} fw-500  text-black font-neue-medium mb-0`}
		// 			extraClass={text == 1 ? 'active ' : 'inactive'}
		// 		>
		// 			{text == 1 ? 'Active ' : 'Inactive'}
		// 		</Pill>
		// 	),
		// 	// width: '30%',
		// 	align: 'center'
		// }
		{
			title: "Action",
			dataIndex: "",
			render: (text, record) => (
				<div className="flex gap-4 items-center">
					<button className="btn btn-xs btn-warning ">Edit</button>
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
		</div>
	);
};

export default AllProducts;
