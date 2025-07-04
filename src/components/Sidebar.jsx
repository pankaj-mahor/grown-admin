import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { useLocation } from "react-router";
import { IoIosMenu } from "react-icons/io";

const { Sider } = Layout;

const Sidebar = ({ menus, extraClass }) => {
	const [selectedKey, setSelectedKey] = useState("0");
	const [collapsed, setCollapsed] = useState(false);
	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};

	const location = useLocation();

	useEffect(() => {
		const currentKey = menus.find((item) => {
			if (item.children) {
				return item.children.some((child) =>
					location.pathname.includes(child.link)
				);
			}
			return location.pathname.includes(item.link);
		})?.key;

		setSelectedKey(currentKey || "0");
	}, [location.pathname]);

	return (
		<Sider
			width={250}
			className={`app-sidebar ${extraClass} d-none d-lg-block`}
			collapsed={collapsed}
		>
			<div
				className={`d-flex align-items-center justify-content-center controller-btn-wrapper ${
					collapsed ? "collapsed" : "show"
				}`}
			>
				<button
					className={`controller-btn border-0 outline-0 d-block bg-white collapse-button py-2 ms-4 ${
						collapsed ? "collapsed" : ""
					}`}
					title={collapsed ? "Open Drawer" : "Close Drawer"}
					onClick={toggleCollapsed}
				>
					<IoIosMenu color="#000" size={24} />
				</button>
			</div>

			<Menu
				className={`app-sidebar-menu ${extraClass}`}
				mode="inline"
				style={{ borderRight: 0 }}
				defaultOpenKeys={["5", "3"]}
				items={menus}
				selectedKeys={[selectedKey]}
				onClick={(e) => {
					setSelectedKey(e.key);
				}}
			/>
		</Sider>
	);
};

export default Sidebar;
