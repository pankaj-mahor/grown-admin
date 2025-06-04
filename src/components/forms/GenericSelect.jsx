import { Select } from "antd";
import { ErrorMessage, Field } from "formik";
import React, { useEffect } from "react";
import TextError from "../../hoc/TextError";
// import { ArrowDropDown, ExpandMore } from "@mui/icons-material";
import { IoMdArrowDropdown } from "react-icons/io";

const GenericSelect = ({
	options,
	name,
	label,
	formfieldClass = "",
	placeholder = "",
	extraclass = "",
	isMasked = false,
	...rest
}) => {
	const maskSelectValue = (value) => {
		if (isMasked && value) {
			const firstPart = value.slice(0, 3); // Show first 3 characters
			const maskedPart = value.slice(3).replace(/\S/g, "X"); // Mask the rest with 'X'
			return `${firstPart}${maskedPart}`;
		}
		return value;
	};

	return (
		<div className={`formField ${formfieldClass}`}>
			<label htmlFor={`${name}`}>{label}</label>
			<Field name={name} id={name}>
				{({ field, form }) => {
					const { setFieldValue } = form;

					// Get the actual value from form and apply masking logic
					const actualValue = field.value;
					const maskedValue = maskSelectValue(actualValue); // Apply masking if needed

					return (
						<Select
							className={`generic-select w-100 ${extraclass}`}
							style={{ width: 120 }}
							options={options}
							name={name}
							value={isMasked ? maskedValue : actualValue} // Show masked value or actual value
							onChange={(e) => {
								setFieldValue(name, e);
							}}
							suffixIcon={
								<IoMdArrowDropdown
									sx={{
										color: "#000",
										fontSize: "1rem",
									}}
								/>
							}
							popupClassName={`generic-select-dropdown ${extraclass}`}
							placeholder={placeholder}
							{...rest}
						/>
					);
				}}
			</Field>
			<ErrorMessage name={name} component={TextError} />
		</div>
	);
};

export default GenericSelect;
