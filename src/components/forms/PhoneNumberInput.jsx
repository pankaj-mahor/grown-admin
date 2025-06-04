import { Field, ErrorMessage } from 'formik'
import PhoneInput from 'react-phone-input-2'

import TextError from '../../hoc/TextError'

import 'react-phone-input-2/lib/style.css'
import { Input } from 'antd'

const PhoneNumberInput = props => {
	const { name, label, isMasked, ...rest } = props

	const maskPhoneNumber = value => {
		if (isMasked && value) {
			const countryCode = value.slice(0, 2) // Extract the country code based on length
			const phoneNumber = value.slice(2) // Extract the local number

			const firstFour = phoneNumber.slice(0, 4) // Show first 4 digits of the local number
			const masked = phoneNumber.slice(4).replace(/\d/g, 'X') // Mask remaining digits

			return `+${countryCode} ${firstFour}${masked}` // Combine country code with masked local number
		}
		return value
	}

	return (
		<div className="formField">
			<label htmlFor={name}>{label}</label>
			<Field
				id={name}
				name={name}
				render={({ field, form }) => {
					const actualValue = field.value
					const maskedValue = maskPhoneNumber(actualValue) // Masked display

					return (
						<>
							{/* Actual Phone Input */}
							{!isMasked && (
								<PhoneInput
									{...rest}
									className="phone-input"
									name={name}
									value={actualValue}
									onChange={value => {
										// Update Formik state with the actual value
										form.setFieldValue(field.name, value)
									}}
									specialLabel={label}
								/>
							)}

							{/* Masked Display (if isMasked) */}
							{isMasked && (
								<Input
									type="text"
									className="generic-input"
									value={maskedValue}
									disabled={true}
								/>
							)}
						</>
					)
				}}
			/>
			<ErrorMessage name={name} component={TextError} />
		</div>
	)
}

export default PhoneNumberInput
