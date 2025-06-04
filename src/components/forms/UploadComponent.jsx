import { Upload } from "antd";
import { Field, ErrorMessage } from "formik";
import React from "react";
// import { uploadIcon } from '../../assets/svg'

const { Dragger } = Upload;

const UploadComponent = (props) => {
	const { name, ...rest } = props;
	return (
		<div className="formField">
			<Field name={name} id={name}>
				{({ field }) => {
					return (
						<Dragger className="dragger-upload-component" name={name} {...rest}>
							{/* <p className="ant-upload-drag-icon">{uploadIcon}</p> */}
							<p
								className="ant-upload-text font-neue-medium fw-500 mb-1 fs-6"
								style={{
									color: "#0273A7",
								}}
							>
								Browse files
							</p>
							<p className="ant-upload-hint font-neue-medium fs-14 fw-500 clr-677">
								Drag & Drop or{" "}
								<span
									style={{
										color: "#008FFF",
									}}
								>
									Choose file
								</span>{" "}
								to upload
							</p>
						</Dragger>
					);
				}}
			</Field>
			<ErrorMessage name={name} component={TextError} />
		</div>
	);
};

export default UploadComponent;
