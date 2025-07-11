import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, DatePicker, Input, message, Select } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "../../utils";

const schema = yup.object().shape({
	productId: yup.string().required("Product is required"),
	startTime: yup.date().required("Start time is required"),
	endTime: yup.date().required("End time is required"),
	discountPrice: yup
		.number()
		.typeError("Discount price must be a number")
		.required("Discount price is required"),
});

const CreateFlashProducts = ({ setAddFlashProduct }) => {
	const queryClient = useQueryClient();
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			productId: "",
			startTime: null,
			endTime: null,
			discountPrice: "",
		},
	});

	const { data: products, isLoading: loadingProducts } = useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const response = await customFetch.get("/admin/products");
			return response.data.data;
		},
	});

	const mutation = useMutation({
		mutationFn: async (data) => {
			return await customFetch.post(
				"/admin/create-flashsale",
				{
					productId: data.productId,
					startTime: data.startTime,
					endTime: data.endTime,
					discountPrice: data.discountPrice,
				},
				{ headers: { "Content-Type": "application/json" } }
			);
		},
		onSuccess: () => {
			message.success("Flash sale product created successfully!");
			reset();
			setAddFlashProduct(false);
			queryClient.invalidateQueries(["flashSale"]);
		},
		onError: (err) => {
			message.error(
				err?.response?.data?.message || "Failed to create flash sale product."
			);
		},
	});

	const onSubmit = (data) => {
		console.log(data);
		mutation.mutateAsync(data);
	};

	const productOptions =
		products?.map((p) => ({ label: p.name, value: p.id })) || [];

	return (
		<div className="mx-auto p-6 bg-white rounded shadow">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="grid grid-cols-1 gap-4">
					<div className="mb-4">
						<label className="block font-medium mb-1">Product</label>
						<Controller
							name="productId"
							control={control}
							render={({ field }) => (
								<Select
									{...field}
									options={productOptions}
									className="w-full"
									placeholder="Select product"
								/>
							)}
						/>
						{errors.productId && (
							<p className="text-red-500 text-xs mt-1">
								{errors.productId.message}
							</p>
						)}
					</div>
					<div className="mb-4">
						<label className="block font-medium mb-1">Start Time</label>
						<Controller
							name="startTime"
							control={control}
							render={({ field }) => (
								<DatePicker
									{...field}
									className="w-full"
									placeholder="Select start time"
									showTime
									format="YYYY-MM-DD HH:mm:ss"
								/>
							)}
						/>
						{errors.startTime && (
							<p className="text-red-500 text-xs mt-1">
								{errors.startTime.message}
							</p>
						)}
					</div>
					<div className="mb-4">
						<label className="block font-medium mb-1">End Time</label>
						<Controller
							name="endTime"
							control={control}
							render={({ field }) => (
								<DatePicker
									{...field}
									className="w-full"
									placeholder="Select end time"
									showTime
									format="YYYY-MM-DD HH:mm:ss"
								/>
							)}
						/>
						{errors.endTime && (
							<p className="text-red-500 text-xs mt-1">
								{errors.endTime.message}
							</p>
						)}
					</div>
					<div className="mb-4">
						<label className="block font-medium mb-1">Discount Price</label>
						<Controller
							name="discountPrice"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									className="w-full"
									placeholder="Enter discount price"
								/>
							)}
						/>
						{errors.discountPrice && (
							<p className="text-red-500 text-xs mt-1">
								{errors.discountPrice.message}
							</p>
						)}
					</div>
				</div>
				<Button
					type="primary"
					htmlType="submit"
					loading={mutation.isLoading}
					block
					className="w-full bg-[green] mt-4"
				>
					Add Flash Product
				</Button>
			</form>
		</div>
	);
};

export default CreateFlashProducts;
