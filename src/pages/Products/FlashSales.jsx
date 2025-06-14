import React from "react";
import { customFetch } from "../../utils";
import { useQuery } from "@tanstack/react-query";

const FlashSales = () => {
	const {
		data: flashsales,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["flashSale"],
		queryFn: async () => {
			const response = await customFetch.get("/admin/flashsale");
			return response.data;
		},
	});
	console.log(flashsales);
	return <div></div>;
};

export default FlashSales;
