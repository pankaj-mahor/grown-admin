import React from "react";
import InputComponent from "./InputComponent";
import PhoneNumberInput from "./PhoneNumberInput";
import GenericSelect from "./GenericSelect";
import DatePickerComponent from "./DatePickerComponent";

import "./forms.css";
import RadioButtons from "./RadioButtons";
import SliderComponent from "./SliderComponent";
import UploadComponent from "./UploadComponent";

const FormComponent = (props) => {
	const { control, ...rest } = props;

	switch (control) {
		case "input":
			return <InputComponent {...rest} />;
		case "phone-input":
			return <PhoneNumberInput {...rest} />;
		case "date-picker":
			return <DatePickerComponent {...rest} />;
		case "generic-select":
			return <GenericSelect {...rest} />;
		case "input-number":
			return <InputComponent {...rest} />;
		case "radio-btn":
			return <RadioButtons {...rest} />;
		case "slider":
			return <SliderComponent {...rest} />;
		case "drag-upload":
			return <UploadComponent />;
		default:
			return "Something went wrong";
	}
};

export default FormComponent;
