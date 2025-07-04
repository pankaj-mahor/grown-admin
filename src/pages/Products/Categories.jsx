import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Badge, Button, Modal } from "antd";
import React, { useState } from "react";
import { customFetch } from "../../utils";
import { toast } from "react-toastify";
import { FaInfoCircle } from "react-icons/fa";
import CreateCategory from "./CreateCategory";

const Categories = () => {
	const queryClient = useQueryClient();

	const {
		data: categories,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			const response = await customFetch.get("/admin/categories");
			// setData(() => {
			// 	return response?.data?.data?.map((user, index) => ({
			// 		...user,
			// 		index: index + 1,
			// 	}));
			// });
			return response.data.data;
		},
	});

	const showDeleteConfirm = (id) => {
		confirm({
			title: "Are you sure delete this category?",
			icon: <FaInfoCircle size={25} className="mr-4" />,
			// content: 'Some descriptions',
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			onOk() {
				deleteCategory(id);
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	const deleteCategory = async (categoryId) => {
		try {
			const res = await customFetch.delete(`/admin/categories/${categoryId}`);
			const { data } = res;
			toast.success(data?.message || "Category Deleted Successfully");
			queryClient.invalidateQueries(["categories"]);
		} catch (error) {
			const { response } = error;
			const { data } = response;
			toast.error(`${data?.message || "Try Again"}`);
		}
	};

	const [addCategoryModal, setAddCategoryModal] = useState(false);

	return (
		<div className="p-3">
			<Modal
				title={`Add Category - `}
				open={addCategoryModal}
				onCancel={() => setAddCategoryModal(false)}
				footer={null}
				// width={"75%"}
			>
				<CreateCategory setAddCategoryModal={setAddCategoryModal} />
			</Modal>

			<div className="mb-8 flex justify-between items-center">
				<h4 className="text-xl py-3">All Categories</h4>
				<div className="flex">
					<Button
						// size="small"
						variant="default"
						type="primary"
						className="bg-primary"
						onClick={() => setAddCategoryModal(true)}
					>
						+ Add Category
					</Button>
				</div>
			</div>
			{categories?.map((cat) => {
				return (
					<div
						key={cat.id}
						className="flex gap-2 items-center justify-between border p-2 m-2 mb-4 rounded-md  "
					>
						<div className="flex gap-4 items-center ">
							{/* <img src={cat.image} alt={cat.name} className='w-10 h-10 rounded-full' /> */}
							<p className="">{cat.id}.</p>
							<p>{cat.categoryName}</p>
							{/* {cat?.isActive && <Badge text="Active" status="success" />} */}
						</div>
						<div>
							<Button danger onClick={() => showDeleteConfirm(record?.id)}>
								Delete
							</Button>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Categories;
