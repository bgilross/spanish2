import { useState } from "react"
import spanishData from "@/lib/spanishData"
import { useTranslation } from "@/lib/TranslationContext"
import ClickableText from "./ClickableText"

const WordBank = () => {
	const { lessonNumber, handleLessonChange } = useTranslation()
	const [currentLessonIndex, setCurrentLessonIndex] = useState(lessonNumber)

	const lessons = Object.keys(spanishData.lessons)
	const wordBank = spanishData.lessons[currentLessonIndex]?.wordBank

	// Handle navigation between lessons
	const handlePrevLesson = () => {
		if (currentLessonIndex > 3) {
			setCurrentLessonIndex(currentLessonIndex - 1)
		}
	}

	const handleNextLesson = () => {
		if (currentLessonIndex < lessons.length + 3) {
			setCurrentLessonIndex(currentLessonIndex + 1)
		}
	}

	return (
		<div className="flex flex-col items-center justify-center space-y-4">
			{/* Navigation Arrows */}
			<div className="flex justify-between w-full mb-4">
				<button
					onClick={handlePrevLesson}
					disabled={currentLessonIndex === 3}
					className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50`}
				>
					← Previous
				</button>
				<span className="text-xl font-bold text-accent">
					Lesson {currentLessonIndex}
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
			{wordBank ? (
				<div>
					{wordBank.map((word, index) => (
						<div
							key={index}
							className="whitespace-pre-wrap mb-6"
						>
							<span className="font-bold">
								<ClickableText>{word.word.toUpperCase()}</ClickableText>:
							</span>{" "}
							{word?.translations?.map((translation, index) => (
								<span
									key={index}
									className="text-gray-300"
								>
									{translation}
									{index !== word.translations.length - 1 && " / "}
								</span>
							))}
							<br />
							<span className="font-bold">
								<ClickableText>{word.pos.toUpperCase()}</ClickableText>:{" "}
								{word.gender}
							</span>
							<br />
							<span className="text-gray-300">
								<ClickableText>{word?.info?.[0]}</ClickableText>
							</span>
							<br />
						</div>
					))}
				</div>
			) : (
				<div>No word bank available for this lesson.</div>
			)}
		</div>
	)
}

export default WordBank
