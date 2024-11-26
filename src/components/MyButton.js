"use client"

import "react-awesome-button/dist/styles.css"
import { AwesomeButton } from "react-awesome-button"
import { useState } from "react"

const MyButton = ({
	onClick,
	children,
	disabled = false,
	isPrimary = true,
}) => {
	return (
		<div className="flex justify-center items-center ">
			<AwesomeButton
				type="primary"
				onPress={onClick}
				style={{
					//button face color
					"--button-primary-color": isPrimary
						? "var(--primary)"
						: "var(--secondary)",
					//bottom of button color, between shadow and button face
					"--button-primary-color-dark": isPrimary
						? "var(--primary-light)"
						: "var(--secondary-light)",
					"--button-primary-color-light": isPrimary
						? "var(--secondary)"
						: "var(--primary)",
					"--button-font-color": isPrimary
						? "var(--secondary)"
						: "var(--primary)",
					"--button-border-radius": "0.5rem",
					"--button-padding": "0.5rem 1rem",
					"--button-primary-color-hover": isPrimary
						? "var(--primary-med)"
						: "var(--secondary-dark)",
					//  isPrimary

					// ? "var(--cornell)"
					// : "var(--secondary-dark)",
					"--button-primary-color-active": "var(--accent)",
					"--button-shadow-color": "rgba(0, 0, 0, 0.3)",
					height: "4rem",
					width: "8rem",
					fontSize: "1.25rem",
				}}
				disabled={disabled}
			>
				{children}
			</AwesomeButton>
		</div>
	)
}
export default MyButton

// style={{
// 	"--button-primary-color": isPrimary
// 		? "var(--primary)"
// 		: "var(--secondary)",
// 	"--button-primary-color-dark": isPrimary
// 		? "var(--primary-light)"
// 		: "var(--secondary-light)",
// 	"--button-primary-color-light": isPrimary
// 		? "var(--secondary)"
// 		: "var(--primary)",
// 	"--button-font-color": isPrimary
// 		? "var(--secondary)"
// 		: "var(--primary)",
// 	"--button-border-radius": "0.5rem",
// 	"--button-padding": "0.5rem 1rem",
// 	"--button-primary-color-hover": isPrimary
// 		? "var(--cornell)"
// 		: "var(--cornell-light)",
// 	"--button-primary-color-active": isPrimary
// 		? "var(--accent)"
// 		: "var(--secondary-accent)",
// 	"--button-shadow-color": "rgba(0, 0, 0, 0.3)",
