import { Slider } from 'antd'
import { ErrorMessage, Field } from 'formik'
import React from 'react'
import TextError from '../../hoc/TextError'

const SliderComponent = props => {
	const { label, name, type, formfieldClass = '', labelClass, ...rest } = props

	return (
		<div className={`formField ${formfieldClass}`}>
			<label htmlFor={`${name}`}>{label}</label>
			<Field id={name} name={name}>
				{({ field, form }) => {
					return (
						<Slider
							defaultValue={0}
							{...rest}
							value={field.value}
							onChange={e => {
								const value = e
								// Update Formik state with the actual value
								form.setFieldValue(field.name, value)
							}}
						/>
					)
				}}
			</Field>
			{/* <ErrorMessage name={name} component={TextError} /> */}
		</div>
	)
}

export default SliderComponent
