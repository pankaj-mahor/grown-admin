import { Input } from 'antd'
import { ErrorMessage, Field } from 'formik'
import TextError from '../../hoc/TextError'

const InputComponent = props => {
	const {
		label,
		name,
		type,
		formfieldClass = '',
		labelClass,
		extraClass = '',
		isMasked = false,
		...rest
	} = props

	const maskValue = value => {
		if (isMasked && value) {
			return value.replace(/\S/g, 'X') // Replace all characters with 'X'
		}
		return value
	}

	return (
		<div className={`formField ${formfieldClass}`}>
			<label htmlFor={`${name}`}>{label}</label>
			<Field id={name} name={name}>
				{({ field, form }) => {
					if (type === 'password') {
						return (
							<Input.Password
								{...field} // Formik field props
								{...rest} // Other props (e.g., placeholder, type)
								value={maskValue(field.value)} // Masked value if required
								onChange={e => {
									const value = e.target.value
									// Update Formik state with the actual value
									form.setFieldValue(field.name, value)
								}}
								className={`generic-input ${extraClass}`}
								type={type}
							/>
						)
					} else {
						return (
							<Input
								{...field} // Formik field props
								{...rest} // Other props (e.g., placeholder, type)
								value={maskValue(field.value)} // Masked value if required
								onChange={e => {
									const value = e.target.value
									// Update Formik state with the actual value
									form.setFieldValue(field.name, value)
								}}
								className={`generic-input ${extraClass}`}
								type={type}
							/>
						)
					}
				}}

				{/* {type === 'password' ? (
					<Input.Password
						label={label}
						className={`generic-input ${extraClass}`}
						{...rest}
					/>
				) : (
					<Input
						id={name}
						name={name}
						label={label}
						className={`generic-input ${extraClass}`}
						{...rest}
					/>
				)} */}
			</Field>
			<ErrorMessage name={name} component={TextError} />
		</div>
	)
}

export default InputComponent
