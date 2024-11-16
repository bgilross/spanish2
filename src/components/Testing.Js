"use client"
import { useTranslation } from "@/lib/TranslationContext"
import spanishData from "@/lib/spanishData"

const Testing = () => {
	const {
		handleSubmit,
		lessonNumber,
		setQuizType,
		setScore,
		setIsScoreModalOpen,
		openScoreModal,
		setErrors,
		changeSentence,
	} = useTranslation()

	// Run tests for a specific lesson
	const runTestsForLesson = () => {
		setQuizType("full")
		const lesson = spanishData.lessons[lessonNumber]
		const testResults = []

		console.log(`Running tests for Lesson ${lessonNumber}: ${lesson.name}`)

		lesson.sentences.forEach((sentence, sentenceIndex) => {
			const { translation, sentence: originalSentence } = sentence

			// Simulate incorrect input by modifying the translation
			const incorrectInput = "incorrect text"
			const incorrectResult = simulateInput(incorrectInput, sentenceIndex)
			testResults.push({
				input: incorrectInput,
				result: incorrectResult,
				expected: false,
			})

			// Simulate correct input
			const correctInput = translation
			const correctResult = simulateInput(correctInput, sentenceIndex)
			testResults.push({
				input: correctInput,
				result: correctResult,
				expected: true,
			})

			// changeSentence(sentenceIndex + 1)
		})

		console.log("Test Results:", testResults)
		console.log("Setting Score modal? ")
		setIsScoreModalOpen(true)
		console.log("opening score modal?")
		openScoreModal()
		console.log("returning test results")
		return testResults
	}

	// Simulate input and test the response
	const simulateInput = (input, sentenceIndex) => {
		const isCorrect = handleSubmit(input, sentenceIndex)
		return isCorrect ? "Pass" : "Fail"
	}

	const runAllTests = () => {
		setErrors([])
		const testResults = runTestsForLesson()
		// generateReport(testResults)
		setIsScoreModalOpen(true)
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
