"use client"

import { useQuiz } from "@/lib/QuizContext"
import spanishData from "@/lib/spanishData"

const Testing = () => {
	const { currentData, handleUserSubmit, setCurrentData, getNextSection } =
		useQuiz()

	const { lessonNumber, sentenceIndex } = currentData

	const runTestsForLesson = () => {
		const lesson = spanishData.lessons[lessonNumber]
		const testResults = []

		console.log(`Running tests for Lesson ${lessonNumber}: ${lesson.name}`)

		// Use a for...of loop instead of forEach to handle async correctly
		for (const [sentenceIndex, sentence] of lesson.sentences.entries()) {
			console.log("sentenceIndex: ", sentenceIndex)
			console.log("sentence: ", sentence)
			const { translation } = sentence
			console.log("translation: ", translation)

			// Simulate incorrect input
			const incorrectInput = "incorrect text"
			const tempSectionIndex = getNextSection(sentence, {})
			console.log("Temp Section Index: ", tempSectionIndex)
			const incorrectResult = handleUserSubmit(
				incorrectInput,
				sentenceIndex,
				tempSectionIndex
			)
			testResults.push({
				input: incorrectInput,
				result: incorrectResult,
				expected: false,
			})

			// Simulate correct input
			const correctInput = translation
			const correctResult = handleUserSubmit(
				correctInput,
				sentenceIndex,
				tempSectionIndex
			)
			testResults.push({
				input: correctInput,
				result: correctResult,
				expected: true,
			})
		}

		console.log("Test Results:", testResults)
		return testResults
	}

	const runAllTests = () => {
		const testResults = runTestsForLesson()
		// generateReport(testResults)
		// setIsScoreModalOpen(true)
		// setCurrentData((prev) => ({ ...prev, showScoreModal: true }))
	}

	const generateReport = (testResults) => {
		console.log("=== TEST REPORT ===")
		testResults.forEach((result, index) => {
			console.log(
				`Test #${index + 1}: Input="${result.input}" Expected=${
					result.expected
				} Result=${result.result}`
			)
		})
	}

	return (
		<div className="p-4">
			<button
				onClick={runAllTests}
				className="bg-blue-500 text-white p-4 rounded"
			>
				Run Automated Tests
			</button>
		</div>
	)
}

export default Testing
