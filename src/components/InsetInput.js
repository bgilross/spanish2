"use client"

import "../styles/insetInput.css"
import { useState } from "react"

const InsetInput = () => {
	const [hasText, setHasText] = useState(false)

	const handleInputChange = (e) => {
		setHasText(e.target.value.length > 0)
	}

	return (
		<div className="flex flex-col items-center justify-center rounded-2xl w-full">
			<input
				type="text"
				placeholder="Enter text here"
				onChange={handleInputChange}
				style={{ caretColor: hasText ? "black" : "transparent" }}
				className="inset-input w-full p-4 text-center"
				spellCheck="false"
			/>
		</div>
	)
}
export default InsetInput
