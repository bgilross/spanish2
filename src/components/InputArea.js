"use client"
import { useState } from "react"
import { useTranslation } from "@/lib/TranslationContext"
import InsetInput from "./InsetInput"
import SlidingModal from "./SlidingModal"
import MyButton from "./MyButton"
import "../styles/myButton.css"
import WordBank from "./WordBank"
import LessonInfo from "./LessonInfo"
const InputArea = () => {
	const { handleSubmit } = useTranslation()
	const [userInput, setUserInput] = useState("")

	const [leftModalOpen, setLeftModalOpen] = useState(false)
	const [rightModalOpen, setRightModalOpen] = useState(false)

	const submit = async (event) => {
		event.preventDefault()
		if (userInput.trim()) {
			await handleSubmit(userInput)
			setUserInput("")
		}
	}

	const toggleLeftModal = () => {
		setLeftModalOpen(!leftModalOpen)
	}

	const toggleRightModal = () => {
		setRightModalOpen(!rightModalOpen)
	}

	return (
		<div className="relative bg-secondary justify-between rounded-t-2xl w-[95%] h-full flex flex-col items-center shadow-2xl shadow-primary z-20">
			{/* Sliding Window */}
			<SlidingModal
				isOpen={leftModalOpen}
				onClose={() => setLeftModalOpen(false)}
			>
				<WordBank />
			</SlidingModal>

			<SlidingModal
				isOpen={rightModalOpen}
				onClose={() => setRightModalOpen(false)}
				position="right"
			>
				<LessonInfo />
			</SlidingModal>

			{/* Buttons */}
			<div className="flex items-start justify-around w-full h-1/3">
				<MyButton onClick={toggleLeftModal}>Word Bank</MyButton>
				<MyButton>Hints</MyButton>
				<MyButton onClick={toggleRightModal}>Lesson Info</MyButton>
			</div>

			{/* Input Form */}
			<form
				onSubmit={submit}
				className="flex space-y-4 h-1/3 flex-col w-[80%] space-x-4 justify-center items-center"
			>
				<InsetInput
					inputText={userInput}
					setInputText={setUserInput}
				/>
			</form>
			<div className="flex justify-around w-full h-1/3">
				<MyButton type="primary">Submit</MyButton>
			</div>
		</div>
	)
}

export default InputArea
