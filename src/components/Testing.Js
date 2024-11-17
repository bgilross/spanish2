"use client"
import { useTranslation } from "@/lib/TranslationContext"
import spanishData from "@/lib/spanishData"
import { CatchingPokemonSharp } from "@mui/icons-material"

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
		sentenceIndex,
	} = useTranslation()

	const waitForStateUpdate = (checkCondition, timeout = 1000) => {
		console.log("waitForStateUpdate")
		console.log("checkCondition: ", checkCondition)
		return new Promise((resolve) => {
			const interval = setInterval(() => {
				if (checkCondition()) {
					clearInterval(interval)
					resolve()
				}
			}, 50) // Check every 50ms
			console.log("interval: ", interval)

			// Set a maximum timeout to prevent infinite loops
			setTimeout(() => {
				clearInterval(interval)
				resolve()
			}, timeout)
		})
	}
	// Run tests for a specific lesson
	const runTestsForLesson = async () => {
		setQuizType("full")
		const lesson = spanishData.lessons[lessonNumber]
		console.log("lesson: ", lesson)
		const testResults = []

		console.log(`Running tests for Lesson ${lessonNumber}: ${lesson.name}`)

		// Use a for...of loop instead of forEach to handle async correctly
		for (const [sentenceIndex, sentence] of lesson.sentences.entries()) {
			console.log("sentenceIndex: ", sentenceIndex)
			console.log("sentence: ", sentence)
			const { translation } = sentence

			// Simulate incorrect input
			const incorrectInput = "incorrect text"
			const incorrectResult = await simulateInput(incorrectInput)
			testResults.push({
				input: incorrectInput,
				result: incorrectResult,
				expected: false,
			})

			// Simulate correct input
			const correctInput = translation
			const correctResult = await simulateInput(correctInput)
			testResults.push({
				input: correctInput,
				result: correctResult,
				expected: true,
			})
		}

		console.log("Test Results:", testResults)
		setIsScoreModalOpen(true)
		openScoreModal()
		return testResults
	}

	// Simulate input and test the response
	const simulateInput = async (input) => {
		handleSubmit(input)
		const initialIndex = sentenceIndex

		// Wait for the state update before proceeding
		console.log("initialIndex: ", initialIndex)
		console.log("sentenceIndex: ", sentenceIndex)
		await waitForStateUpdate(() => sentenceIndex !== initialIndex)

		return sentenceIndex === initialIndex ? "Fail" : "Pass"
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
