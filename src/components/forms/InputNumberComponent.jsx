import { InputNumber } from "antd";
import { Field, useFormikContext, ErrorMessage } from "formik";
import TextError from "../../../hoc/TextError";

const InputNumberComponent = (props) => {
	const { label, name, type, formfieldClass = "", ...rest } = props;
	const { setFieldValue } = useFormikContext();

	const handleValueChange = (value) => {
		setFieldValue(name, value);
	};

	return (
		<div className={`formField ${formfieldClass}`}>
			<Field name={name}>
				{({ form, field }) => {
					return (
						<div className="d-flex border border-1">
							<InputNumber
								name={name}
								id={name}
								{...rest}
								value={field.value}
								step={1}
								onChange={handleValueChange}
								label={label}
								style={{
									width: "100%",
								}}
								controls={false}
								type={type}
							/>
						</div>
					);
				}}
			</Field>
			<ErrorMessage name={name} component={TextError} />
		</div>
	);
};

export default InputNumberComponent;
