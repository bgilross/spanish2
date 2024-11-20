"use client"

import { useQuiz } from "@/lib/QuizContext"
import spanishData from "@/lib/spanishData"

const Testing = () => {
	// console.log("Testin2")
	const {
		currentData,
		handleUserSubmit,
		setCurrentData,
		getNextSection,
		getNextSentence,
	} = useQuiz()

	const { lessonNumber, sentenceIndex } = currentData

	const runTestsForLessonParts = () => {
		const lesson = spanishData.lessons[lessonNumber]
		const testResults = []
		let tempTranslatedWords = []

		console.log(`Running tests for Lesson ${lessonNumber}: ${lesson.name}`)

		for (const [sentenceIndex, sentence] of lesson.sentences.entries()) {
			console.log("lessons semtemces entries: ", lesson.sentences.entries())

			console.log("Testing sentenceIndex: ", sentenceIndex)
			console.log("Testingsentence: ", sentence)
			const { translation } = sentence
			console.log("Testing: translation: ", translation)
			// let tempSectionIndex = getNextSection(sentenceIndex, [])

			const sections = sentence.data
				.map((section, index) => {
					if (section.translation) {
						return { section, index }
					}
					return null // Explicitly return null for non-matching sections
				})
				.filter(Boolean) // Filter out any null or undefined values

			sections.forEach((section, index) => {
				console.log("sections: ", sections)
				//simulate incorrect input
				console.log("Testing section: ", section, "@ index: ", index)
				console.log("testing section index: ", section.index)

				const incorrectInput = "incorrect text"
				const incorrectResult = handleUserSubmit(
					incorrectInput,
					sentenceIndex,
					section.index
				)
				testResults.push({
					input: incorrectInput,
					result: incorrectResult,
					expected: false,
				})

				// Simulate correct input
				let correctInput
				if (section.phraseTranslation) {
					correctInput = section.section.phraseTranslation
				} else {
					correctInput = section.section.translation.word
				}

				const correctResult = handleUserSubmit(
					correctInput,
					sentenceIndex,
					section.index
				)
				testResults.push({
					input: correctInput,
					result: correctResult,
					expected: true,
				})

				// tempTranslatedWords.push({
				// 	index: section.index,
				// 	words: Array.isArray(section.section.translation)
				// 		? section.section.translation.map((item) => item.word)
				// 		: section.section.translation.word,
				// 	phraseTranslation: section.section.phraseTranslation || null,
				// })

				//increment tempSectionIndex
				// console.log("calling get next secttion: ")
				// console.log("sentenceIndex: ", sentenceIndex)
				// console.log("tempTranslatedWords: ", tempTranslatedWords)

				// tempSectionIndex = getNextSection(sentenceIndex, tempTranslatedWords)
				// console.log("updated temp Section index = ", tempSectionIndex)
			})
		}
		console.log("Test Results:", testResults)
		return testResults
	}

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

			console.log("Test Results:", testResults)
			return testResults
		}
	}

	const runAllTests = () => {
		if (currentData.quizType === "full") {
			runTestsForLesson()
		}
		if (currentData.quizType === "parts") {
			runTestsForLessonParts()
		}

		const index = spanishData.lessons[lessonNumber].sentences.length + 1
		getNextSentence(index)
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
