import React from "react";
import { useSelector } from "react-redux";

const useAuth = () => {
	const { user } = useSelector((state) => state.userState);
	const userData = user;
	const isLoggedIn = user?.isLoggedIn ?? false;
	const email = userData?.email;
	const userName = `${userData?.firstName || ""} ${userData?.lastName || ""}`;
	const profilePicture = userData?.profilePicture || "";

	return { user, isLoggedIn, email, profilePicture, userName };
};

export default useAuth;
