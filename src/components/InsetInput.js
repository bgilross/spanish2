"use client"

import "../styles/insetInput.css"

const InsetInput = ({ inputText, setInputText }) => {
	const handleInputChange = (e) => {
		setInputText(e.target.value)
	}

	return (
		<div className="flex flex-col items-center justify-center rounded-2xl w-full">
			<input
				type="text"
				value={inputText}
				placeholder="Enter text here"
				onChange={handleInputChange}
				className="inset-input w-full p-4 text-center"
				spellCheck="false"
			/>
		</div>
	)
}

export default InsetInput
