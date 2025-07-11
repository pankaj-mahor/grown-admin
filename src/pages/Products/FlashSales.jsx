import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Badge, Button, Modal } from "antd";
import { customFetch } from "../../utils";
import { toast } from "react-toastify";
import { FaInfoCircle } from "react-icons/fa";
import CreateFlashProducts from "./CreateFlashProducts";
const FlashSales = () => {
	const queryClient = useQueryClient();
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

	const deleteCategory = async (flashId) => {
		try {
			const res = await customFetch.delete(`/admin/delete-flash/${flashId}`);
			const { data } = res;
			toast.success(data?.message || "Flash Product Deleted Successfully");
			queryClient.invalidateQueries(["flashSale"]);
		} catch (error) {
			const { response } = error;
			const { data } = response;
			toast.error(`${data?.message || "Try Again"}`);
		}
	};

	const [addFlashProduct, setAddFlashProduct] = useState(false);

	return (
		<div className="p-3">
			<Modal
				title={`Add Flash Product - `}
				open={addFlashProduct}
				onCancel={() => setAddFlashProduct(false)}
				footer={null}
				// width={"75%"}
			>
				<CreateFlashProducts setAddFlashProduct={setAddFlashProduct} />
			</Modal>

			<div className="mb-8 flex justify-between items-center">
				<h4 className="text-xl py-3">All Flash Product</h4>
				<div className="flex">
					<Button
						// size="small"
						variant="default"
						type="primary"
						className="bg-primary"
						onClick={() => setAddFlashProduct(true)}
					>
						+ Add Flash Product
					</Button>
				</div>
			</div>
			{/* {categories?.map((cat) => {
		return (
			<div
				key={cat.id}
				className="flex gap-2 items-center justify-between border p-2 m-2 mb-4 rounded-md  "
			>
				<div className="flex gap-4 items-center ">
					<p className="">{cat.id}.</p>
					<p>{cat.categoryName}</p>
				</div>
				<div>
					<Button danger onClick={() => showDeleteConfirm(record?.id)}>
						Delete
					</Button>
				</div>
			</div>
		);
	})} */}
		</div>
	);
};

export default FlashSales;
