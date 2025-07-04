import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Input, message } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { customFetch } from "../../utils";
import * as yup from "yup";

const CreateCategory = ({ setAddCategoryModal }) => {
	const queryClient = useQueryClient();
	const schema = yup.object().shape({
		name: yup.string().required("Category Name is required"),
	});
	const {
		control,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: "",
		},
	});

	const mutation = useMutation({
		mutationFn: async (data) => {
			return await customFetch.post("/admin/categories", data, {
				headers: { "Content-Type": "multipart/form-data" },
			});
		},
		onSuccess: () => {
			message.success("Category created successfully!");
			reset();
			setAddCategoryModal(false);
			queryClient.invalidateQueries(["categories"]);
		},
		onError: (err) => {
			message.error("Failed to create category");
		},
	});

	const onSubmit = (data) => {
		mutation.mutateAsync({
			categoryName: data.name,
		});
	};
	return (
		<div className=" mx-auto p-6 bg-white rounded shadow">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="grid grid-cols-1 gap-4">
					<div className="mb-4 ">
						<label className="block font-medium mb-1">Category Name</label>
						<Controller
							name="name"
							control={control}
							render={({ field }) => (
								<Input {...field} placeholder="Enter name" className="w-100" />
							)}
						/>
						{errors.name && (
							<p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
						)}
					</div>
				</div>

				<Button
					type="primary"
					htmlType="submit"
					loading={mutation.isLoading}
					block
					className="w-full bg-[green] mt-4	"
				>
					Add Category
				</Button>
			</form>
		</div>
	);
};

export default CreateCategory;
