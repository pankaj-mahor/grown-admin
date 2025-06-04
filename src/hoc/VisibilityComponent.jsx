import React, { Fragment, useEffect } from 'react'

const VisibilityWrapper = ({ componentVisibility, children }) => {
	if (!componentVisibility || !componentVisibility.isVisible) {
		return null // If the component is not visible, don't render it
	}

	useEffect(() => {
		if (
			componentVisibility.componentNameId ===
			'job-details-industry-requirements-section'
		) {
			console.log(
				'job-details-industry-requirements-section',
				children,
				componentVisibility
			)
		}
	}, [componentVisibility])

	// Function to replace all text with 'X' recursively
	const maskText = children => {
		return React.Children.map(children, child => {
			// If child is a string (text node), replace it with masked 'X'
			if (typeof child === 'string') {
				return child.replace(/\S/g, 'X') // Replace every non-whitespace character with 'X'
			}

			if (typeof child === 'number') {
				// If you want to mask numbers as well, replace them with 'X'
				// Otherwise, just return the number if you want to preserve it
				return child.toString().replace(/\d/g, 'X')
			}

			// If child is a React element, recursively mask its children
			if (React.isValidElement(child)) {
				return React.cloneElement(child, {
					children: maskText(child.props.children) // Recursively mask child nodes
				})
			}

			return child // Return the child as is for other cases
		})
	}

	const { isVisible, isEnable, isMasked } = componentVisibility

	const getComponents = childComponent => {
		switch (childComponent?.type?.name) {
			case 'ButtonComponent':
				return React.cloneElement(childComponent, {
					...childComponent.props,
					variant: isEnable
						? childComponent?.props?.disabled
							? 'grey'
							: childComponent?.props?.variant
								? childComponent?.props?.variant
								: 'light-red '
						: childComponent?.props?.disabled
							? childComponent?.props?.variant
							: 'grey',
					disabled: isEnable
						? childComponent?.props?.disabled
							? childComponent?.props?.disabled
							: false
						: childComponent?.props?.disabled
							? childComponent?.props?.disabled
							: true
				})
			default:
				return (
					<Fragment
						key={componentVisibility.componentNameId} // Assign the componentNameId as the wrapper's ID
					>
						{isVisible
							? isMasked
								? maskText(childComponent)
								: children
							: null}
					</Fragment>
				)
		}
	}

	return children?.length && children?.length >= 1 ? (
		<>
			{children.map((childComponent, index) => getComponents(childComponent))}
		</>
	) : (
		getComponents(children)
	)
}

export default VisibilityWrapper
