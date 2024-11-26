import React from "react"
import BigModal from "./BigModal"
import { useQuiz } from "@/lib/QuizContext"
import MyButton from "./MyButton"

const FeedbackModal = ({ isOpen, onClose }) => {
	const { currentData, setCurrentData, userInput } = useQuiz()

	console.log(
		"Feedback modal: currentData.randomizedSentence[currentData.sentenceIndex] = ",
		currentData.randomizedSentences[currentData.sentenceIndex]
	)

	const currentLog = currentData.lessonLog[currentData.lessonLog.length - 1]
	if (!currentLog) {
		return null
	}
	return (
		<BigModal
			isOpen={isOpen}
			onClose={onClose}
		>
			<div>
				Current Sentence: ID: {currentLog.sentence.id}
				{currentLog.sentence.sentence}
			</div>
			<div>User Input: {currentLog.userInput}</div>

			<div>Correct Answer: {currentLog.sentence.translation}</div>
			<MyButton>Next Section</MyButton>
			<MyButton>Next Sentence</MyButton>
		</BigModal>
	)
}

export default FeedbackModal
