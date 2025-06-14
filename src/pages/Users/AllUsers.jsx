import { Avatar, Button, Input, Space, Table } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { IoIosPerson } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutUser } from "../../features/user/userSlice";
import { customFetch } from "../../utils";
import { CiSearch } from "react-icons/ci";

const AllUsers = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);

	const getAllUsers = async () => {
		try {
			setLoading(true);
			const res = await customFetch("/admin/users");
			const { data } = res;
			// console.log(data);
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
		getAllUsers();
	}, []);

	const columns = [
		{
			title: "S. No.",
			dataIndex: "index",
			align: "center",
			render: (text) => <p className="fw-500 mb-0 font-neue-medium">{text}</p>,
			width: "3%",
			showSorterTooltip: {
				target: "full-header",
			},
		},
		{
			title: "Full Name",
			dataIndex: "fullname",
			render: (text, record) => (
				<p
					// to={`/recruiter/candidate/${record?.userId}`}
					className="d-flex align-items-center text-decoration-none gap-3 clr-21 font-neue-medium fw-500 fs-16 text-capitalize cursor-pointer"
					state={{
						jobId: record?.jobId,
					}}
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					<Avatar
						icon={
							record?.profilePicture &&
							record?.profilePicture !== null ? null : (
								<IoIosPerson />
							)
						}
						src={
							record?.profilePicture && record?.profilePicture !== null
								? record?.profilePicture
								: ""
						}
					/>
					<span className="underline text-green-800 lh-1 ms-2">{text}</span>
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
			title: "Email",
			dataIndex: "email",
			align: "center",
			render: (text) => <p className="fw-500 mb-0 font-neue-medium">{text}</p>,
			// width: '30%'
		},
		{
			title: "Mobile",
			dataIndex: "mobile",
			align: "center",
			render: (text) => (
				<p className=" fw-500 mb-0 font-neue-regular">{text}</p>
			),
		},
		{
			title: "Gender",
			dataIndex: "gender",
			align: "center",
			render: (text, record) => (
				<p className=" fw-500 mb-0 font-neue-regular">{text}</p>
			),
		},
		{
			title: "Otp",
			dataIndex: "otp",
			align: "center",
			render: (text, record) => (
				<p className=" fw-500 mb-0 font-neue-regular">{text}</p>
			),
		},
		{
			title: "DOB",
			dataIndex: "dob",
			align: "center",
			render: (text) => (
				<p className="jobMatch fw-500 mb-0 font-neue-regular">
					{text ? <>{dayjs(text).format("D MMM YYYY")}</> : "N/A"}
				</p>
			),
		},
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
				<button className="btn btn-xs btn-error ">Delete</button>
			),
			// width: '15%',
			align: "center",
		},
	];
	return (
		<div className="bg-white rounded p-3 ">
			<h4 className="text-3xl">All Users</h4>

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
		</div>
	);
};

export default AllUsers;
