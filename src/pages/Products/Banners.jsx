import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Upload, Input, Button, DatePicker, message, Modal } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { customFetch } from "../../utils";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const { Dragger } = Upload;

const BannerSchema = Yup.object().shape({
	image: Yup.mixed().required("Image is required"),
	title: Yup.string().required("Title is required"),
	url: Yup.string().url("Enter a valid URL").required("URL is required"),
	valid_until: Yup.date().required("Expiry date/time is required"),
});
const Banners = () => {
	const {
		control,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(BannerSchema),
		defaultValues: {
			image: null,
			title: "Something",
			url: "https://nurseryman.in",
			// valid_until: "Mon Jun 30 2025 00:00:00 GMT+0530 (India Standard Time)",
		},
	});
	const user = useSelector((state) => state.userState.user);

	const uploadProps = {
		beforeUpload: (file) => {
			return false;
		},
		name: "image",
		maxCount: 1,
		accept: "image/*", // Prevent auto upload
		// onChange(info) {
		// 	if (info.file.status !== 'uploading') {
		// 		console.log(info.file, info.fileList);
		// 	}
		// 	if (info.file.status === 'done') {
		// 		message.success(`${info.file.name} file uploaded successfully`);
		// 		setValue('image', info.file)

		// 	} else if (info.file.status === 'error') {
		// 		message.error(`${info.file.name} file upload failed.`);
		// 	}
		// },
	};

	const mutation = useMutation({
		mutationFn: async (data) => {
			console.log(data);
			// const imageFile = await getBase64(data?.file.originFileObj)
			const imageFile = data?.image;
			const body = {
				title: data.title,
				url: data.url,
				valid_until: data.valid_until,
				image: imageFile,
			};
			const formData = new FormData();
			formData.append("title", data.title);
			formData.append("url", data.url);
			formData.append("valid_until", data.valid_until);
			formData.append("type", "banners");
			formData.append("image", imageFile);

			return await customFetch.post("/admin/upload-banner", formData, {
				"Content-Type": "multipart/form-data",
			});
		},
		onSuccess: () => {
			message.success("Banner created successfully!");
			reset();
		},
		onError: (err) => {
			console.log(err);
			message.error(err?.response?.data?.message || "Failed to create banner.");
		},
	});
	const onSubmit = (data) => {
		console.log(data);
		mutation.mutateAsync(data);
	};
	const onInvalid = (errors) => {
		console.log(errors);
	};
	const dummyRequest = ({ file, onSuccess }) => {
		setTimeout(() => {
			onSuccess("ok");
		}, 0);
	};
	const {
		data: banners,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["banners"],
		queryFn: async () => {
			const response = await customFetch.get("/admin/banners");
			return response.data;
		},
	});

	const deleteMutation = useMutation({
		mutationFn: async (id) => {
			return await customFetch.delete("/admin/banner/" + id);
		},
		onSuccess: () => {
			message.success("Banner created successfully!");
			queryClient.invalidateQueries(["banners"]);
		},
		onError: (err) => {
			console.log(err);
			message.error(err?.response?.data?.message || "Failed to delete banner ");
		},
	});
	console.log(banners);
	//

	const [isModalOpen, setIsModalOpen] = useState(false);
	return (
		<div className=" mx-auto p-6 bg-white rounded shadow">
			<div className="flex justify-between align-center mb-4">
				<h2 className="text-2xl font-bold mb-4">Banners</h2>
				<Button
					type="primary"
					onClick={() => {
						setIsModalOpen(true);
					}}
					color="primary"
					variant="outlined"
				>
					+ Create Banner
				</Button>
				<Modal
					title="Create Banner"
					open={isModalOpen}
					onCancel={() => setIsModalOpen(false)}
					footer={null}
				>
					<div className="max-w-xl">
						<form
							onSubmit={handleSubmit(onSubmit, onInvalid)}
							className="space-y-6"
						>
							{/* Image Upload */}
							<div>
								<label className="block font-medium mb-1">
									Image<span className="text-red-500">*</span>
								</label>
								<Controller
									name="image"
									control={control}
									render={({ field }) => (
										<Dragger
											// customRequest={dummyRequest}
											{...uploadProps}
											fileList={field.value ? [field.value] : []}
											onChange={(info) => {
												console.log(info);
												field.onChange(info.file);
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

							{/* Title */}
							<div>
								<label className="block font-medium mb-1">
									Title<span className="text-red-500">*</span>
								</label>
								<Controller
									name="title"
									control={control}
									render={({ field }) => (
										<Input {...field} placeholder="Enter banner title" />
									)}
								/>
								{errors.title && (
									<p className="text-red-500 text-xs mt-1">
										{errors.title.message}
									</p>
								)}
							</div>

							{/* URL */}
							<div>
								<label className="block font-medium mb-1">
									URL<span className="text-red-500">*</span>
								</label>
								<Controller
									name="url"
									control={control}
									render={({ field }) => (
										<Input {...field} placeholder="https://example.com" />
									)}
								/>
								{errors.url && (
									<p className="text-red-500 text-xs mt-1">
										{errors.url.message}
									</p>
								)}
							</div>

							{/* Valid Until */}
							<div>
								<label className="block font-medium mb-1">
									Valid Until<span className="text-red-500">*</span>
								</label>
								<Controller
									name="valid_until"
									control={control}
									render={({ field }) => (
										<DatePicker
											{...field}
											showTime
											format="YYYY-MM-DDTHH:mm:ss[Z]"
											className="w-full"
											value={field.value}
											onChange={(val) => field.onChange(val)}
											placeholder="Select expiry date/time"
										/>
									)}
								/>
								{errors.valid_until && (
									<p className="text-red-500 text-xs mt-1">
										{errors.valid_until.message}
									</p>
								)}
							</div>
							<div className="flex gap-3">
								<Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
								<Button
									type="primary"
									htmlType="submit"
									loading={mutation.isLoading}
									className="w-full bg-[green]"
								>
									{mutation.isLoading ? "Submitting..." : "Create Banner"}
								</Button>
							</div>
						</form>
					</div>
				</Modal>
			</div>
			<div className="banner-listing">
				<div className="space-y-4">
					{isLoading ? (
						<div className="text-center">Loading...</div>
					) : error ? (
						<div className="text-red-500 text-center">
							Error loading banners
						</div>
					) : (
						banners?.map((banner) => (
							<div
								key={banner.id}
								className="border p-4 rounded-lg flex items-center justify-between"
							>
								<div className="flex items-center space-x-4">
									<img
										src={banner.imageUrl}
										alt={banner.title}
										className="w-80 h-40 object-cover rounded"
									/>
									<div>
										<h3 className="font-medium text-xl">{banner.title}</h3>
										<p className="text-sm text-gray-500">{banner.url}</p>
										<p className="text-xs text-gray-400">
											Valid until:{" "}
											{new Date(banner.valid_until).toLocaleDateString()}
										</p>
									</div>
								</div>
								<div className="flex space-x-2">
									<Button
										type="primary"
										color="black"
										variant="outlined"
										onClick={() => {
											// Add toggle active/inactive mutation here
											customFetch
												.patch(`/admin/banners/${banner.id}/toggle-status`)
												.then(() => {
													message.success("Banner status updated successfully");
													queryClient.invalidateQueries(["banners"]);
												})
												.catch((err) => {});
										}}
									>
										{banner.is_active ? "Mark Inactive" : "Mark Active"}
									</Button>
									<Button
										type="primary"
										danger
										onClick={() => {
											// Add delete mutation here
											deleteMutation.mutateAsync(banner.id);
										}}
									>
										Delete
									</Button>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default Banners;
