import React from "react"
import BigModal from "./BigModal"
import { useQuiz } from "@/lib/QuizContext"
import MyButton from "./MyButton"

const FeedbackModal = ({ isOpen, onClose }) => {
	const { currentData, setCurrentData, userInput, getNextSentence } = useQuiz()

	console.log(
		"Feedback modal: currentData.randomizedSentence[currentData.sentenceIndex] = ",
		currentData.randomizedSentences[currentData.sentenceIndex]
	)

	const currentLog = currentData.lessonLog[currentData.lessonLog.length - 1]
	if (!currentLog) {
		return null
	}

	const handleNextSentenceClick = () => {
		getNextSentence()
		onClose()
	}
	return (
		<BigModal
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className="p-2">
				<div>
					Current Sentence ID {currentLog.sentence.id}:{" "}
					{currentLog.sentence.sentence}
				</div>
				<div>User Input: {currentLog.userInput}</div>

				<div>Correct Answer: {currentLog.sentence.translation}</div>
				{currentData.quizType === "parts" && (
					<MyButton isPrimary={false}>Next Section</MyButton>
				)}
				<MyButton
					isPrimary={false}
					onClick={handleNextSentenceClick}
				>
					Next Sentence
				</MyButton>
			</div>
		</BigModal>
	)
}

export default FeedbackModal
