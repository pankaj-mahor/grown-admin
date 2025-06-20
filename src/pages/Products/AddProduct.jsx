import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
	Input,
	InputNumber,
	Button,
	Switch,
	Upload,
	message,
	Select,
} from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "../../utils";

const { Dragger } = Upload;

const schema = yup.object().shape({
	name: yup.string().required("Name is required"),
	image: yup.mixed().required("Image is required"),
	description: yup.string().required("Description is required"),
	price: yup.string().required("Price is required"),
	offer_price: yup.string().required("Offer price is required"),
	rating: yup
		.number()
		.typeError("Rating must be a number")
		.min(0, "Min 0")
		.max(5, "Max 5")
		.required("Rating is required"),
	category: yup.string().required("Category is required"),
	pot: yup.boolean(),
	safty: yup.boolean(),
	Stock_availble: yup.string().required("Stock available is required"),
	stock_total: yup.string().required("Stock total is required"),
	is_flash: yup.boolean(),
});

const AddProduct = ({ record }) => {
	const queryClient = useQueryClient();
	const {
		control,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: record?.name || "",
			image: record?.image || null,
			description: record?.description || "",
			price: record?.price || "",
			offer_price: record?.offer_price || "",
			rating: record?.rating || 0,
			category: record?.category || "",
			pot: record?.pot || false,
			safty: record?.safty || false,
			Stock_availble: record?.Stock_availble || "",
			stock_total: record?.stock_total || "",
			is_flash: record?.is_flash || false,
			returnAvailable: record?.returnAvailable || true,
			size: record?.size || "",
		},
	});

	const mutation = useMutation({
		mutationFn: async (data) => {
			const formData = new FormData();
			Object.entries(data).forEach(([key, value]) => {
				if (key === "image") {
					formData.append("image", data?.image);
				} else {
					formData.append(key, value);
				}
			});
			return await customFetch.post("/admin/products", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
		},
		onSuccess: () => {
			message.success("Product created successfully!");
			reset();
			queryClient.invalidateQueries(["products"]);
		},
		onError: (err) => {
			message.error(
				err?.response?.data?.message || "Failed to create product."
			);
		},
	});

	const onSubmit = (data) => {
		mutation.mutate(data);
	};

	return (
		<div className=" mx-auto p-6 bg-white rounded shadow">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="grid grid-cols-2 gap-4">
					{/* Name */}
					<div className="mb-4 ">
						<label className="block font-medium mb-1">Name</label>
						<Controller
							name="name"
							control={control}
							render={({ field }) => (
								<Input {...field} placeholder="Enter name" />
							)}
						/>
						{errors.name && (
							<p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
						)}
					</div>

					{/* Price */}
					<div className="mb-4 ">
						<label className="block font-medium mb-1">Price</label>
						<Controller
							name="price"
							control={control}
							render={({ field }) => (
								<Input {...field} placeholder="Enter price" />
							)}
						/>
						{errors.price && (
							<p className="text-red-500 text-xs mt-1">
								{errors.price.message}
							</p>
						)}
					</div>

					{/* Image */}
					<div className="mb-4 ">
						<label className="block font-medium mb-1">Image</label>
						<Controller
							name="image"
							control={control}
							render={({ field }) => (
								<Dragger
									beforeUpload={() => false}
									maxCount={1}
									accept="image/*"
									fileList={field.value ? [field.value] : []}
									onChange={(info) => {
										console.log(info);
										field.onChange(info.file);
										// setValue("image", info.fileList[0]);
										// setValue("image", info.fileList[0]);
									}}
								>
									<p className="ant-upload-text">Browse files</p>
									<p className="ant-upload-hint">
										Drag & Drop or Choose file to upload
									</p>
								</Dragger>
							)}
						/>
						{errors.image && (
							<p className="text-red-500 text-xs mt-1">
								{errors.image.message}
							</p>
						)}
					</div>

					{/* Description */}
					<div className="mb-4 ">
						<label className="block font-medium mb-1">Description</label>
						<Controller
							name="description"
							control={control}
							render={({ field }) => (
								<Input.TextArea {...field} placeholder="Enter description" />
							)}
						/>
						{errors.description && (
							<p className="text-red-500 text-xs mt-1">
								{errors.description.message}
							</p>
						)}
					</div>

					{/* Offer Price */}
					<div className="mb-4 ">
						<label className="block font-medium mb-1">Offer Price</label>
						<Controller
							name="offer_price"
							control={control}
							render={({ field }) => (
								<Input {...field} placeholder="Enter offer price" />
							)}
						/>
						{errors.offer_price && (
							<p className="text-red-500 text-xs mt-1">
								{errors.offer_price.message}
							</p>
						)}
					</div>

					{/* Rating */}
					<div className="mb-4 ">
						<label className="block font-medium mb-1">Rating</label>
						<Controller
							name="rating"
							control={control}
							render={({ field }) => (
								<InputNumber
									{...field}
									min={0}
									max={5}
									step={0.1}
									style={{ width: "100%" }}
									placeholder="Enter rating"
								/>
							)}
						/>
						{errors.rating && (
							<p className="text-red-500 text-xs mt-1">
								{errors.rating.message}
							</p>
						)}
					</div>

					{/* Category */}
					<div className="mb-4 ">
						<label className="block font-medium mb-1">Category</label>
						<Controller
							name="category"
							control={control}
							render={({ field }) => (
								<Input {...field} placeholder="Enter category" />
							)}
						/>
						{errors.category && (
							<p className="text-red-500 text-xs mt-1">
								{errors.category.message}
							</p>
						)}
					</div>

					{/* Stock Available */}
					<div className="mb-4 ">
						<label className="block font-medium mb-1">Stock Available</label>
						<Controller
							name="Stock_availble"
							control={control}
							render={({ field }) => (
								<Input {...field} placeholder="Enter available stock" />
							)}
						/>
						{errors.Stock_availble && (
							<p className="text-red-500 text-xs mt-1">
								{errors.Stock_availble.message}
							</p>
						)}
					</div>

					{/* Stock Total */}
					<div className="mb-4 ">
						<label className="block font-medium mb-1">Stock Total</label>
						<Controller
							name="stock_total"
							control={control}
							render={({ field }) => (
								<Input {...field} placeholder="Enter total stock" />
							)}
						/>
						{errors.stock_total && (
							<p className="text-red-500 text-xs mt-1">
								{errors.stock_total.message}
							</p>
						)}
					</div>
					{/* Size  */}
					<div className="mb-4 ">
						<label className="block font-medium mb-1">Plant Size</label>
						<Controller
							name="size"
							control={control}
							render={({ field }) => (
								<Select
									options={[
										{
											label: "2 Inch",
											value: 2,
										},
										{
											label: "4 Inch",
											value: 4,
										},
										{
											label: "6 Inch",
											value: 6,
										},
										{
											label: "8 Inch",
											value: 8,
										},
										{
											label: "10 Inch",
											value: 10,
										},
									]}
									{...field}
									placeholder="Enter Size"
								/>
							)}
						/>
						{errors.size && (
							<p className="text-red-500 text-xs mt-1">{errors.size.message}</p>
						)}
					</div>
				</div>

				<div className="grid grid-cols-4 gap-4">
					{/* Pot */}
					<div className="mb-4 ">
						<label className="block font-medium mb-1">Pot</label>
						<Controller
							name="pot"
							control={control}
							render={({ field }) => (
								<Switch checked={field.value} onChange={field.onChange} />
							)}
						/>
					</div>

					{/* Safty */}
					<div className="mb-4 ">
						<label className="block font-medium mb-1">Safty</label>
						<Controller
							name="safty"
							control={control}
							render={({ field }) => (
								<Switch checked={field.value} onChange={field.onChange} />
							)}
						/>
					</div>

					{/* Is Flash Sale */}
					<div className="mb-4">
						<label className="block font-medium mb-1">Is Flash Sale</label>
						<Controller
							name="is_flash"
							control={control}
							render={({ field }) => (
								<Switch checked={field.value} onChange={field.onChange} />
							)}
						/>
					</div>

					{/* Return Available */}
					<div className="mb-4">
						<label className="block font-medium mb-1">Return Available</label>
						<Controller
							name="returnAvailable"
							control={control}
							render={({ field }) => (
								<Switch checked={field.value} onChange={field.onChange} />
							)}
						/>
					</div>
				</div>

				<Button
					type="primary"
					htmlType="submit"
					loading={mutation.isLoading}
					block
					className="w-full bg-[green] mt-8"
				>
					{mutation.isLoading ? "Submitting..." : "Add Product"}
				</Button>
			</form>
		</div>
	);
};

export default AddProduct;
