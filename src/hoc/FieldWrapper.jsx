import React from 'react'
import VisibilityWrapper from './VisibilityComponent' // Your existing visibility component
import FormComponent from '../components/forms/index'

const FieldWrapper = ({
	visibilityId,
	visibilityData,
	label = <></>,
	disabled,
	...rest
}) => {
	// Get the visibility and other control data for the field
	const componentVisibility = visibilityData.find(
		component => component.componentNameId === visibilityId
	)

	if (!componentVisibility) {
		return null // If no visibility data is found, return null (don't render the field)
	}

	const { isVisible, isEnable, isMasked, isMandatory } = componentVisibility

	if (visibilityId === 'profile-education-add-end-date') {
		console.log('profile-education-add-end-date', componentVisibility)
	}

	if (!isVisible) {
		return null // Don't render the component if it is not visible
	}

	// Switch-case to handle different field types (control types)
	const getComponent = () => {
		switch (rest.control) {
			case 'input':
				return (
					<FormComponent
						{...rest}
						disabled={disabled || !isEnable} // Disable based on visibility data
						isMasked={isMasked} // Apply masking if required
						label={
							<>
								{label} {isMandatory && <span>*</span>}
							</>
						}
					/>
				)

			case 'phone-input':
				return (
					<FormComponent
						disabled={disabled || !isEnable} // Disable based on visibility data
						isMasked={isMasked} // Apply masking if required
						label={
							<>
								{label} {isMandatory && <span>*</span>}
							</>
						}
						{...rest}
					/>
				)
			case 'generic-select':
				return (
					<FormComponent
						{...rest}
						disabled={disabled || !isEnable} // Disable based on visibility data
						isMasked={isMasked} // Apply masking if required
						label={
							<>
								{label} {isMandatory && <span>*</span>}
							</>
						}
					/>
				)
			case 'date-picker':
				return (
					<FormComponent
						{...rest}
						disabled={disabled || !isEnable} // Disable based on visibility data
						isMasked={isMasked} // Apply masking if required
						label={
							<>
								{label} {isMandatory && <span>*</span>}
							</>
						}
					/>
				)
			case 'input-number':
				return (
					<FormComponent
						{...rest}
						disabled={disabled || !isEnable} // Disable based on visibility data
						//isMasked={isMasked} // Apply masking if required
						label={
							<>
								{label} {isMandatory && <span>*</span>}
							</>
						}
					/>
				)
			case 'radio-btn':
				return (
					<FormComponent
						{...rest}
						disabled={disabled || !isEnable} // Disable based on visibility data
						//isMasked={isMasked} // Apply masking if required
						label={
							<>
								{label} {isMandatory && <span>*</span>}
							</>
						}
					/>
				)
			case 'slider':
				return (
					<FormComponent
						{...rest}
						disabled={!isEnable} // Disable based on visibility data
						//isMasked={isMasked} // Apply masking if required
						label={
							<>
								{label} {isMandatory && <span>*</span>}
							</>
						}
					/>
				)

			// You can add other field types (like date-picker, generic-select, etc.)
			default:
				return (
					<FormComponent
						{...rest}
						disabled={!isEnable}
						//isMasked={isMasked}
						label={
							<>
								{label} {isMandatory && <span>*</span>}
							</>
						}
					/>
				)
		}
	}

	return (
		<VisibilityWrapper componentVisibility={componentVisibility}>
			{getComponent()}
		</VisibilityWrapper>
	)
}

export default FieldWrapper
