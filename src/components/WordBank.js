import { useEffect, useState } from "react"
import spanishData from "@/lib/spanishData"
import { useTranslation } from "@/lib/TranslationContext"
import ClickableText from "./ClickableText"
import spanishWords from "@/lib/spanishWords"

const WordBank = () => {
	const { lessonNumber, handleLessonChange } = useTranslation()
	const [currentLessonIndex, setCurrentLessonIndex] = useState(lessonNumber)
	const [wordBank, setWordBank] = useState([])

	const lessons = Object.keys(spanishData.lessons)
	useEffect(() => {
		const temp = spanishData.lessons[lessonNumber]?.wordBank
		setWordBank(temp)
	}, [lessonNumber])

	// Handle navigation between lessons
	const handlePrevLesson = () => {
		if (lessonNumber > 3) {
			handleLessonChange(lessonNumber - 1)
		}
	}

	const handleNextLesson = () => {
		if (lessonNumber < lessons.length + 3) {
			handleLessonChange(lessonNumber + 1)
		}
	}

	console.log("wordBank: ", wordBank)

	return (
		<div className="flex flex-col items-center justify-center space-y-4">
			{/* Navigation Arrows */}
			<div className="flex justify-between w-full mb-4">
				<button
					onClick={handlePrevLesson}
					disabled={lessonNumber === 3}
					className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50`}
				>
					← Previous
				</button>
				<span className="text-xl font-bold text-accent">
					Lesson {lessonNumber}
				</span>
				<button
					onClick={handleNextLesson}
					disabled={currentLessonIndex === lessons.length + 2}
					className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50`}
				>
					Next →
				</button>
			</div>

			{/* Word Bank Display */}

			{wordBank && wordBank.length > 0 ? (
				<div>
					{wordBank.map((word, index) => {
						// Get the key (like "conj" or "pron") and the array of words

						return (
							<div key={index}>
								<h3 className="font-bold text-lg text-primary">
									{word.pos.toUpperCase()}
								</h3>
								<div className="whitespace-pre-wrap mb-6">
									{/* Display the word */}
									<span className="font-bold">
										<ClickableText>{word.word.toUpperCase()}</ClickableText>:
									</span>{" "}
									{/* Display translations */}
									{word?.translations?.map((translation, transIndex) => (
										<span
											key={transIndex}
											className="text-gray-300"
										>
											{translation}
											{transIndex !== word.translations.length - 1 && " / "}
										</span>
									))}
									<br />
									{/* Display part of speech */}
									<span className="font-bold">
										<ClickableText>{word.pos.toUpperCase()}</ClickableText>
										{word.gender && `: ${word.gender}`}
									</span>
									<br />
									{/* Display info if available */}
									{word.info && (
										<span className="text-gray-300">
											<ClickableText>{word.info[0]}</ClickableText>
										</span>
									)}
								</div>
							</div>
						)
					})}
				</div>
			) : (
				<div>No word bank available for this lesson.</div>
			)}
		</div>
	)
}

export default WordBank
