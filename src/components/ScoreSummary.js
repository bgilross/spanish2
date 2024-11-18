import { useTranslation } from "@/lib/TranslationContext"
import { useQuiz } from "@/lib/QuizContext"

const ScoreSummary = ({ isOpen, onClose }) => {
	// const { score, lessonNumber, handleLessonChange, errors } = useTranslation()
	const { currentData, handleLessonChange } = useQuiz()
	const { errors, lessonNumber } = currentData

	const analyzeErrors = (errors) => {
		console.log("Analyzing errors: ", errors)
		const wordFrequency = {}
		const posFrequency = {}
		const genderFrequency = {}

		errors.forEach((error) => {
			// Count words
			error.errorWords.forEach((translation) => {
				wordFrequency[translation.word] =
					(wordFrequency[translation.word] || 0) + 1
				posFrequency[translation.pos] = (posFrequency[translation.pos] || 0) + 1
			})

			// Count parts of speech
			// const pos = error.partOfSpeech
			// if (pos) {
			// 	posFrequency[pos] = (posFrequency[pos] || 0) + 1
			// }

			// // Count gender
			// const gender = error.gender
			// if (gender) {
			// 	genderFrequency[gender] = (genderFrequency[gender] || 0) + 1
			// }
		})

		// Sort by frequency
		const sortedWords = Object.entries(wordFrequency).sort(
			(a, b) => b[1] - a[1]
		)
		const sortedPos = Object.entries(posFrequency).sort((a, b) => b[1] - a[1])
		const sortedGender = Object.entries(genderFrequency).sort(
			(a, b) => b[1] - a[1]
		)

		return { sortedWords, sortedPos, sortedGender }
	}

	if (!isOpen) return null

	const { sortedWords, sortedPos, sortedGender } = analyzeErrors(errors)

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
					<h3 className="text-xl font-semibold text-accent mb-4">
						Error Breakdown:
					</h3>
					<div>
						<strong>Most Frequent Errors:</strong>
						{sortedWords.slice(0, 5).map(([word, count], index) => (
							<p key={index}>
								{word}: {count} times
							</p>
						))}
					</div>
					<div>
						<strong>Parts of Speech:</strong>
						{sortedPos.slice(0, 5).map(([pos, count], index) => (
							<p key={index}>
								{pos}: {count} times
							</p>
						))}
					</div>
					<div>
						<strong>Gender Errors:</strong>
						{sortedGender.slice(0, 5).map(([gender, count], index) => (
							<p key={index}>
								{gender}: {count} times
							</p>
						))}
					</div>
					{errors.length > 0 ? (
						<ul className="list-disc ml-6">
							{errors.map((error, index) => (
								<li
									key={index}
									className="mb-4"
								>
									<strong>Sentence:</strong> {error.currentSentence.sentence}
									<br />
									<strong>Translation:</strong>{" "}
									{error.currentSentence.translation}
									<br />
									<strong>Your Answer:</strong> {error.userInput}
									<br />
									<strong>Correct Words:</strong>{" "}
									{error.errorWords.map((translation, i) => (
										<span key={i}>{translation.word}</span>
									))}
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

				{/* Navigation Buttons */}
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
