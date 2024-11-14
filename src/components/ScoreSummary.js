"use client"
import { useTranslation } from "@/lib/TranslationContext"
import { useState } from "react"

const ScoreSummary = ({ isOpen, onClose }) => {
	const { score, lessonNumber, handleLessonChange } = useTranslation()

	// Only render the modal if it's open
	if (!isOpen) return null

	const moveToNextLesson = () => {
		handleLessonChange(lessonNumber + 1)
		onClose()
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-secondary w-3/4 md:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-xl relative">
				<h2 className="text-3xl font-bold text-primary mb-4">Lesson Summary</h2>

				{/* Error Breakdown */}
				<div className="mb-6 max-h-[400px] overflow-y-auto">
					<h3 className="text-xl font-semibold text-accent mb-2">Errors:</h3>
					{score.errors.length > 0 ? (
						<ul className="list-disc ml-6">
							{score.errors.map((error, index) => (
								<li
									key={index}
									className="mb-4"
								>
									<strong>Sentence:</strong> {error.sentenceData.sentence}
									<br />
									<strong>Translation:</strong> {error.sentenceData.translation}
									<br />
									<strong>Your Answer:</strong> {error.userInput}
									<br />
									<strong>Correct Word:</strong>{" "}
									{error.currentWord.translation?.word.toUpperCase() ||
										error.currentSection?.phraseTranslation?.toUpperCase()}
									<br />
									<strong>Notes:</strong> <br />
									{error.references.length > 0 ? (
										error.references.map((ref, i) => (
											<span
												key={i}
												className="block"
											>
												{ref}
											</span>
										))
									) : (
										<span>No additional notes</span>
									)}
								</li>
							))}
						</ul>
					) : (
						<p className="text-green-700">Perfect score! No errors made.</p>
					)}
				</div>

				{/* Button to move to the next lesson */}
				<div className="flex justify-end space-x-4">
					<button
						className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
						onClick={onClose}
					>
						Close
					</button>
					<button
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
						onClick={moveToNextLesson}
					>
						Next Lesson
					</button>
				</div>
			</div>
		</div>
	)
}

export default ScoreSummary
