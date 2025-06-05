import React, { useState } from "react";
import { useEffect } from "react";
import { BsBox, BsCart3, BsHeart, BsMoonFill, BsSunFill } from "react-icons/bs";
import {
	FaBarsStaggered,
	FaCaretDown,
	FaFirstOrder,
	FaUserAstronaut,
} from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { logo } from "../assets/images";
import { logoutUser, toggleTheme } from "../features/user/userSlice";
// import NavLinks from "./NavLinks";
import {
	FiSearch,
	FiHeart,
	FiShoppingCart,
	FiUser,
	FiMenu,
	FiX,
} from "react-icons/fi";
import { Drawer, Dropdown, Menu } from "antd";
import { PiCaretDownLight } from "react-icons/pi";
const Navbar = () => {
	const dispatch = useDispatch();
	const location = useLocation();

	const user = useSelector((state) => state.userState.user);
	const isLoggedIn = user?.isLoggedIn ?? false;
	// const handleTheme = () => {
	// 	// const { winter, dracula } = themes;
	// 	// const newTheme = theme === winter ? dracula : winter;
	// 	// //set html doc
	// 	// setTheme(newTheme);

	// 	dispatch(toggleTheme());
	// };

	// useEffect(() => {
	// 	document.documentElement.setAttribute("data-theme", theme);
	// 	localStorage.setItem("theme", theme);
	// }, [theme]);

	const loggedIn = isLoggedIn;

	const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);
	const [isOpen, setIsOpen] = useState(false);

	const items = [
		{
			key: "1",
			label: (
				<a target="_blank" rel="noopener noreferrer" href="/my-account">
					My Account
				</a>
			),
			icon: <FaUserAstronaut />,
		},
		{
			key: "2",
			label: <Link to="/my-orders">My Orders</Link>,
			icon: <BsBox />,
		},
		{
			key: "3",
			label: <p>Logout</p>,
			onClick: () => {
				dispatch(logoutUser());
				console.log("logout");
			},
			// icon: <BsBox />,
		},
	];

	const navLinks = [
		{
			key: "1",
			label: <NavLink to="/">Home</NavLink>,
			// icon: <FaUserAstronaut />,
		},
		{
			key: "2",
			label: <NavLink to="/contact">Contact</NavLink>,
			// icon: <FaUserAstronaut />,
		},
		{
			key: "3",
			label: <NavLink to="/about">About</NavLink>,
			// icon: <FaUserAstronaut />,
		},
		{
			key: "4",
			label: <NavLink to="/products">Products</NavLink>,
			// icon: <FaUserAstronaut />,
		},
	];
	useEffect(() => {
		setIsOpen(false);
	}, [location]);
	return (
		<>
			<nav className="bg-white shadow-md py-0 px-6">
				<div className="flex justify-between items-center  mx-auto">
					{/* Logo */}
					<NavLink to="/" className="flex text-3xl  h-[100]px">
						<img src={logo} alt="Grown Era Logo" className="w-full h-full" />
					</NavLink>
					{/* <div className="text-2xl font-bold">Exclusive</div> */}

					{/* Desktop Menu */}
					<div className="hidden md:flex space-x-6">
						{/* <NavLinks /> */}
						{/* <Menu
							className="mobile-nav-menu"
							mode="horizontal"
							items={[...navLinks]}
						/> */}
						{/* {loggedIn && <NavLinks />} */}
						{/* <Menu
							// className="mobile-nav-menu"
							mode="horizontal"
							items={navLinks}
						/> */}
					</div>

					{/* Icons or Login Button */}
					{loggedIn ? (
						<div className="hidden md:flex items-center space-x-4">
							<Dropdown
								menu={{
									items,
								}}
								placement="bottom"
								arrow
							>
								<a
									onClick={(e) => e.preventDefault()}
									className="flex item-center gap-0 cursor-pointer"
								>
									Hi, Admin
									<FiUser
										className="text-gray-700 hover:text-black cursor-pointer"
										size={21}
									/>
									<PiCaretDownLight />
									{/* {user?.name} */}
								</a>
							</Dropdown>
						</div>
					) : (
						<div className="flex items-center space-x-4">
							<Link
								to="/login"
								className="hidden md:block bg-green-600 text-white py-2 px-4 rounded-lg"
							>
								Login
							</Link>
						</div>
					)}

					{/* MOBILE */}
					{/* Hamburger Icon for Mobile */}
					<div className="md:hidden flex gap-3">
						{loggedIn && (
							<div className="md:hidden flex items-center space-x-1 gap-2">
								<Dropdown
									menu={{
										items,
									}}
									placement="bottom"
									arrow
								>
									<a
										onClick={(e) => e.preventDefault()}
										className="flex item-center gap-0 cursor-pointer"
									>
										<FiUser
											className="text-gray-700 hover:text-black cursor-pointer"
											size={21}
										/>
										{/* <PiCaretDownLight /> */}
										{/* {user?.name} */}
									</a>
								</Dropdown>
							</div>
						)}

						<button
							className="md:hidden text-gray-700"
							onClick={() => setIsOpen(!isOpen)}
						>
							{isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
						</button>
					</div>
				</div>

				{/* Mobile Drawer */}

				<Drawer
					open={isOpen}
					onClose={() => setIsOpen(false)}
					className="mobile-nav"
					rootClassName="mobile-nav-root"
					closeIcon={<FiX size={24} />}
				>
					{isLoggedIn ? (
						<Menu
							className="mobile-nav-menu"
							mode="inline"
							items={[...navLinks, ...items]}
						/>
					) : (
						<div className="d-flex justify-content-center">
							<Link
								to="/login"
								className="w-full block text-center hover:text-white bg-green-600 text-white py-2 px-4 rounded-lg"
							>
								Login
							</Link>
						</div>
					)}
				</Drawer>
			</nav>
		</>
	);
};

export default Navbar;
