import { ErrorMessage, Field } from 'formik'
import React from 'react'
import TextError from '../../hoc/TextError'
import { Radio } from 'antd'

const RadioButtons = props => {
	const { label, options, name, setIsCurrentState, ...rest } = props

	return (
		<div className="formField">
			<label htmlFor="">{label}</label>
			<Field name={name} id={name}>
				{({ field, form }) => {
					const { setFieldValue } = form
					return (
						<Radio.Group
							{...field}
							options={options}
							onChange={(e, value) => {
								setIsCurrentState(e.target.value)
								setFieldValue(name, e.target.value)
							}}
							value={field?.value}
							optionType="button"
							buttonStyle="solid"
							className="generic-radio-btns"
							{...rest}
						/>
					)
				}}
			</Field>
			<ErrorMessage name={name} component={TextError} />
		</div>
	)
}

export default RadioButtons
