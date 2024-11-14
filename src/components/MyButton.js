import "react-awesome-button/dist/styles.css"
import { AwesomeButton } from "react-awesome-button"

const MyButton = ({ onClick, children }) => {
	return (
		<div className="flex justify-center items-center ">
			<AwesomeButton
				type="primary"
				onPress={onClick}
				style={{
					"--button-primary-color": "var(--primary)",
					"--button-primary-color-dark": "var(--primary-light)",
					"--button-primary-color-light": "var(--secondary)",
					"--button-font-color": "var(--secondary)",
					"--button-border-radius": "0.5rem",
					"--button-padding": "0.5rem 1rem",
					"--button-primary-color-hover": "var(--cornell)",
					"--button-primary-color-active": "var(--accent)",
					"--button-shadow-color": "rgba(0, 0, 0, 0.3)",
					height: "4rem",
					width: "8rem",
					fontSize: "1.25rem",
				}}
			>
				{children}
			</AwesomeButton>
		</div>
	)
}
export default MyButton
