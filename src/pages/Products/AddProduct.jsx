import { Form, Formik } from "formik";
import React from "react";
import { useState } from "react";
import * as Yup from "yup";
import FormComponent from "../../components/forms";

const AddProduct = () => {
	const [loading, setLoading] = useState(false);
	const initialValues = {
		email: "",
		password: "",
	};

	const validationSchema = Yup.object({
		email: Yup.string().email("Incorrect email format").required("Required"),
		password: Yup.string(),
	});

	const onSubmit = async (values) => {
		setLoading(true);
		// try {
		// 	const res = await userLogin(values)

		// 	const { data } = res

		// 	setIsLoading(false)

		// 	message.success(res?.data?.message || 'Login Successful.')

		// 	Cookies.set('user-status', true, { expires: 12 / 24 })

		// 	Cookies.set(
		// 		'userData',
		// 		JSON.stringify({
		// 			...data?.userData
		// 		}),
		// 		{ expires: 12 / 24 }
		// 	)

		// 	dispatch(
		// 		login({
		// 			userData: {
		// 				...data?.userData
		// 			}
		// 		})
		// 	)

		// 	const { state = {} } = location

		// 	if (state?.redirectPath) {
		// 		navigate(state.redirectPath, { state: { ...state } })
		// 	} else {
		// 		navigate('/app')
		// 	}
		// } catch (error) {
		// 	debugger
		// 	const { response = '' } = error
		// 	const { data = '' } = response

		// 	setIsLoading(false)

		// 	message.error(`${data?.message || 'Something went wrong.'}`)
		// }
	};
	return (
		<div>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{(submitForm, values) => {
					return (
						<Form>
							<div className="grid grid-cols-2 gap-4 p-4">
								{/* Name */}
								<FormComponent
									control="input"
									type="text"
									name="name"
									placeholder="Enter name"
									label={
										<>
											<span>Name</span>
											<span>*</span>
										</>
									}
								/>

								{/* Image */}
								<FormComponent
									control="input"
									type="file"
									name="image"
									placeholder=""
									label={
										<>
											<span>Image</span>
											<span>*</span>
										</>
									}
								/>

								{/* Description */}
								<FormComponent
									control="input"
									type="text"
									name="desc"
									placeholder="Enter description"
									label={
										<>
											<span>Description</span>
											<span>*</span>
										</>
									}
								/>

								{/* Price */}
								<FormComponent
									control="input"
									type="number"
									name="price"
									placeholder="Enter price"
									label={
										<>
											<span>Price</span>
											<span>*</span>
										</>
									}
								/>

								{/* Offer Price */}
								<FormComponent
									control="input"
									type="number"
									name="offer_price"
									placeholder="Enter offer price"
									label={
										<>
											<span>Offer Price</span>
											<span>*</span>
										</>
									}
								/>

								{/* Rating */}
								<FormComponent
									control="input"
									type="number"
									name="rating"
									placeholder="Enter rating"
									label={
										<>
											<span>Rating</span>
											<span>*</span>
										</>
									}
								/>

								{/* Category */}
								<FormComponent
									control="input"
									type="text"
									name="category"
									placeholder="Enter category"
									label={
										<>
											<span>Category</span>
											<span>*</span>
										</>
									}
								/>

								{/* Pot */}
								{/* <FormComponent
									control="checkbox"
									type="checkbox"
									name="pot"
									label={
										<>
											<span>Pot</span>
										</>
									}
								/> */}

								{/* Safety */}
								{/* <FormComponent
									control="checkbox"
									type="checkbox"
									name="safety"
									label={
										<>
											<span>Safety</span>
										</>
									}
								/> */}

								{/* Stock Available */}
								<FormComponent
									control="input"
									type="number"
									name="stock_avilable"
									placeholder="Enter available stock"
									label={
										<>
											<span>Stock Available</span>
											<span>*</span>
										</>
									}
								/>

								{/* Stock Total */}
								<FormComponent
									control="input"
									type="number"
									name="stock_total"
									placeholder="Enter total stock"
									label={
										<>
											<span>Stock Total</span>
											<span>*</span>
										</>
									}
								/>

								{/* Flash Sale */}
								{/* <FormComponent
									control="checkbox"
									type="checkbox"
									name="isFlashSale"
									label={
										<>
											<span>Flash Sale</span>
										</>
									}
								/> */}

								{/* Extra */}
								<FormComponent
									control="textarea"
									name="extra"
									placeholder="Enter extra details"
									label={
										<>
											<span>Extra</span>
											<span>*</span>
										</>
									}
								/>

								{/* Cash on Delivery */}
								<FormComponent
									control="checkbox"
									type="checkbox"
									name="isCod"
									label={
										<>
											<span>Cash on Delivery</span>
										</>
									}
								/>
							</div>
							{/* <ButtonComponent
														text={
															<LoaderButtonText
																isLoading={isLoading}
																text="Sign In"
															/>
														}
														click={submitForm}
														variant="red"
														extraclass="w-100 rounded-pill"
														disabled={isLoading}
													/> */}
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

export default AddProduct;
