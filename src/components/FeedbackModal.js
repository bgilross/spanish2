import React, { useEffect, useCallback } from "react"
import BigModal from "./BigModal"
import { useQuiz } from "@/lib/QuizContext"
import MyButton from "./MyButton"

const FeedbackModal = ({ isOpen, onClose }) => {
	const { currentData, getNextSentence, setCurrentData } = useQuiz()

	const currentLog = currentData.lessonLog[currentData.lessonLog.length - 1]
	const errorLog = currentData.errors[currentData.errors.length - 1]

	// Define these callbacks first so they are available as stable dependencies for handleKeyPress
	const handleNextSentenceClick = useCallback(() => {
		getNextSentence()
		onClose()
	}, [getNextSentence, onClose])

	const handleNextSectionClick = useCallback(() => {
		setCurrentData((prev) => ({
			...prev,
			sectionIndex: prev.sectionIndex + 1,
		}))
		onClose()
	}, [setCurrentData, onClose])

	const handleKeyPress = useCallback(
		(event) => {
			if (event.key === "Enter") {
				event.preventDefault()
				if (
					currentData.quizType === "parts" &&
					Number(currentData.sectionIndex + 1) <
						currentData.currentSections.length
				) {
					handleNextSectionClick()
				} else {
					handleNextSentenceClick()
				}
			}
		},
		[
			currentData.quizType,
			currentData.sectionIndex,
			currentData.currentSections.length,
			handleNextSectionClick,
			handleNextSentenceClick,
		]
	)

	useEffect(() => {
		if (isOpen) {
			window.addEventListener("keydown", handleKeyPress)
		}
		return () => {
			window.removeEventListener("keydown", handleKeyPress)
		}
	}, [isOpen, handleKeyPress])

	if (!currentLog) return null

	return (
		<BigModal
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className="p-2 flex flex-col space-y-5 justify-center items-center">
				<div
					className={`text-4xl text-center ${
						currentData.lessonLog.at(-1)?.isCorrect
							? "text-green-500"
							: "text-red-500"
					} font-bold`}
				>
					{currentLog.isCorrect ? "Correct" : "Incorrect"}
				</div>
				<div className="">
					{" "}
					<div>
						<span className="font-bold">
							Current Sentence ID {currentLog.sentence.id}:{" "}
						</span>{" "}
						{currentLog.sentence.sentence}
					</div>
					<div>
						<span className="font-bold">User Input: </span>{" "}
						{currentLog.userInput}
					</div>
					<div>
						<span className="font-bold">Correct Answer: </span>
						{currentData.quizType === "full"
							? currentLog.sentence.translation
							: currentLog.section.phraseTranslation
							? currentLog.section.phraseTranslation
							: currentLog.section.translation.word}
					</div>
				</div>
				{currentLog.isCorrect ? null : (
					<div>
						<span className="font-bold">Error Log:</span>
						{errorLog.errorWords.map((word, index) => (
							<div key={index}>
								<span className="font-bold">Error Word {index + 1}: </span>
								<div>Word: {word.word.word}</div>
								<div>Translation: {word.word.translation}</div>
								{word.word.info ? (
									<div>Word Info: {word.word.info[0]}</div>
								) : null}
							</div>
						))}
						<div>
							<span className="font-bold">References: </span>
						</div>
						{errorLog.references.map((reference, index) => (
							<div key={index}>
								<span>{reference}</span>
							</div>
						))}
					</div>
				)}
				<div className="flex space-x-4">
					{currentData.quizType === "parts" &&
						Number(currentData.sectionIndex + 1) <
							currentData.currentSections.length && (
							<MyButton
								isPrimary={false}
								onClick={handleNextSectionClick}
							>
								Next Section
							</MyButton>
						)}
					{(Number(currentData.sectionIndex + 1) ===
						currentData.currentSections.length ||
						currentData.quizType === "full") && (
						<MyButton
							isPrimary={false}
							onClick={handleNextSentenceClick}
						>
							Next Sentence
						</MyButton>
					)}
				</div>
			</div>
		</BigModal>
	)
}

export default FeedbackModal
