import React from 'react'
import { Field, ErrorMessage } from 'formik'
import { DatePicker, Input } from 'antd'
import TextError from '../../hoc/TextError'

const DatePickerComponent = props => {
	const {
		label,
		name,
		type,
		formfieldClass = '',
		isMasked = false,
		...rest
	} = props

	const maskDateValue = value => {
		if (isMasked && value) {
			return 'XX/XX/XXXX' // Show this masked date format when masked
		}
		return value ? value.format('DD/MM/YYYY') : '' // Show formatted date otherwise
	}

	return (
		<div className={`formField ${formfieldClass}`}>
			<label htmlFor={`${name}`} className="d-block">
				{label}
			</label>
			<Field name={name} id={name}>
				{({ field, form }) => {
					const { setFieldValue } = form
					const actualValue = field.value // Actual value from Formik

					return (
						<>
							{!isMasked ? (
								<DatePicker
									name={name}
									value={actualValue} // Show actual date value
									{...rest}
									onChange={e => {
										setFieldValue(name, e)
										if (rest.onDateChange) {
											rest.onDateChange(e)
										}
									}}
									className="d-block generic-date-picker"
								/>
							) : (
								<Input
									type="text"
									value={maskDateValue(actualValue)} // Show masked date when `isMasked` is true
									className="generic-input"
									disabled
								/>
							)}
						</>
					)
				}}
			</Field>
			<ErrorMessage name={name} component={TextError} />
		</div>
	)
}

export default DatePickerComponent
