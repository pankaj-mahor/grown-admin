import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { FaDashcube, FaProductHunt, FaUsers } from "react-icons/fa6";
import { SlSocialDropbox } from "react-icons/sl";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsBoxes } from "react-icons/bs";

const DashboardLayout = () => {
	const navigate = useNavigate();
	const sidebarList = [
		{
			key: "1",
			label: "Dashboard",
			icon: (
				<span className="sidebar-icon">
					<LuLayoutDashboard size={24} stroke="#000" />
				</span>
			),
			// icon: <span className="sidebar-icon">{dashboardIcon}</span>,
			onClick: () => {
				navigate("/home");
			},
			link: "/home",
		},
		{
			key: "2",
			label: "Users",
			icon: (
				<span className="sidebar-icon">
					<FaUsers size={24} stroke="#000" />
				</span>
			),
			onClick: () => {
				navigate("/all-users");
			},
			link: "/all-users",
		},
		{
			key: "3",
			label: "Orders",
			icon: (
				<span className="sidebar-icon">
					<BsBoxes size={24} stroke="#000" />
				</span>
			),
			children: [
				{
					key: "3-1",
					label: "All orders",
					onClick: () => {
						navigate("/all-orders");
					},
					link: "/all-orders",
				},

				// {
				// 	key: '3-2',
				// 	label: 'Shortlisted Candidates',
				// 	onClick: () => {
				// 		navigate('/recruiter/short-listed')
				// 	},
				// 	link: '/recruiter/short-listed'
				// }
			],
		},
		{
			key: "5",
			label: "Products",
			icon: (
				<span className="sidebar-icon">
					<SlSocialDropbox size={24} stroke="#000" />
				</span>
			),
			children: [
				{
					key: "5-1",
					label: "All Products",
					onClick: () => {
						navigate("/all-products");
					},
				},
				{
					key: "5-2",
					label: "Flash Sales",
					onClick: () => {
						navigate("/flash-sales");
					},
				},
				{
					key: "5-3",
					label: "Categories",
					onClick: () => {
						navigate("/categories");
					},
				},
				// {
				// 	key: "5-3",
				// 	label: "Featured Products",
				// 	onClick: () => {
				// 		navigate("/featured");
				// 	},
				// },
				{
					key: "5-4",
					label: "Banners",
					onClick: () => {
						navigate("/banners");
					},
				},
			],
			// onClick: () => {
			// 	navigate("/all-products");
			// },
		},
		// 	// children: [
		// 	// 	{
		// 	// 		key: '4-1',
		// 	// 		label: 'Change Password',
		// 	// 		onClick: () => {
		// 	// 			navigate('/recruiter/change-password')
		// 	// 		},
		// 	// 		link: '/recruiter/change-password'
		// 	// 	}
		// 	// ]
		// },
		// {
		// 	key: '4',
		// 	label: 'Settings',
		// 	icon: (
		// 		<span className="sidebar-icon">
		// 			<IoSettingsOutline size={24} stroke="#fff" />
		// 		</span>
		// 	),
		// 	children: [
		// 		{
		// 			key: '4-1',
		// 			label: 'Change Password',
		// 			onClick: () => {
		// 				navigate('/recruiter/change-password')
		// 			},
		// 			link: '/recruiter/change-password'
		// 		}
		// 	]
		// }
	];
	return (
		<div>
			<Layout className={`sme-layout-outer ${"outerClass"}`}>
				<Navbar />

				<Layout className="sme-layout">
					<Sidebar menus={sidebarList} extraClass={"sideMenuExtraClass"} />

					<Layout style={{ padding: "1rem" }}>
						<Content
							style={{
								margin: "0.5rem",
								overflow: "auto",
								background: "white",
								borderRadius: "0.5rem",
							}}
							className={`sme-layout-content ${""}`}
						>
							<Outlet />
						</Content>
					</Layout>
				</Layout>
			</Layout>
		</div>
	);
};

export default DashboardLayout;
