import axios from "axios";
// http://192.168.0.128:8000/api/v1/products/
const API_URL = import.meta.env.VITE_APP_URL;
const AWS_API_URL = import.meta.env.VITE_APP_API_AWS;
const ENVIRONMENT = import.meta.env.VITE_APP_ENV;
const BASE_URL = API_URL || AWS_API_URL;
const LOCAL_URL = import.meta.env.VITE_APP_LOCAL_URL;
// const BASE_URL = AWS_API_URL;

export const customFetch = axios.create({
	// baseURL: ENVIRONMENT === "development" ? AWS_API_URL : API_URL,
	baseURL: LOCAL_URL,
	// baseURL: API_URL,
});

customFetch.interceptors.request.use((config) => {
	let token = localStorage.getItem("user")
		? JSON.parse(localStorage.getItem("user")).token
		: "";

	config.headers = {
		Authorization: `Bearer ${token}`,
	};
	return config;
});
export const formatPriceUSD = (price) => {
	const dollarsAmount = new Intl.NumberFormat("en-us", {
		style: "currency",
		currency: "usd",
	}).format((price / 100).toFixed(2));
	return dollarsAmount;
};

export const formatPriceInr = (price) => {
	const dollarsAmount = new Intl.NumberFormat("en-us", {
		style: "currency",
		currency: "inr",
	}).format(price);
	return dollarsAmount;
};

export const generateAmountOptions = (number) => {
	return Array.from({ length: number }, (_, index) => {
		const amount = index + 1;
		return (
			<option key={amount} value={amount}>
				{amount}
			</option>
		);
	});
};

export const getDiscountPercentage = (mrp, offerPrice) => {
	const discountAmount = mrp - offerPrice;
	const discountPercentage = (discountAmount / mrp) * 100;
	return discountPercentage.toFixed(0);
};
