import React from "react"
import BigModal from "./BigModal"
import { useQuiz } from "@/lib/QuizContext"
import MyButton from "./MyButton"

const FeedbackModal = ({ isOpen, onClose }) => {
	const { currentData, getNextSentence } = useQuiz()

	console.log(
		"Feedback modal: currentData.randomizedSentence[currentData.sentenceIndex] = ",
		currentData.randomizedSentences[currentData.sentenceIndex]
	)

	const currentLog = currentData.lessonLog[currentData.lessonLog.length - 1]
	if (!currentLog) {
		return null
	}

	const errorLog = currentData.errors[currentData.errors.length - 1]

	const handleNextSentenceClick = () => {
		getNextSentence()
		onClose()
	}
	return (
		<BigModal
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className="p-2 flex flex-col space-y-5 justify-center items-center">
				<div
					className={`text-4xl text-center ${
						currentLog.isCorrect ? "text-green-500" : "text-red-500"
					} font-bold`}
				>
					{" "}
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
					{currentLog.isCorrect ? null : (
						<>
							<MyButton
								isPrimary={false}
								onClick={() =>
									console.log("Marks this as correct in case of system error?")
								}
							>
								Mark Correct
							</MyButton>
							<MyButton
								isPrimary={false}
								onClick={onClose}
							>
								Try <br />
								Again
							</MyButton>
							<MyButton
								isPrimary={false}
								onClick={() => console.log("add sentence back to queue")}
							>
								Try <br />
								Later
							</MyButton>
						</>
					)}
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
			</div>
		</BigModal>
	)
}

export default FeedbackModal
