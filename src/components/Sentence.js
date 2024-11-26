"use client"

import { useQuiz } from "@/lib/QuizContext"
import spanishData from "@/lib/spanishData"

import { useEffect } from "react"

const Sentence = () => {
	const { currentData, setCurrentData, userInput } = useQuiz()

	console.log("Sentence running. CurrentData: ", currentData)

	const currentSentence = currentData.randomizedSentences
		? currentData.randomizedSentences?.[currentData.sentenceIndex]
		: null
	const currentSection = currentData.currentSections
		? currentData.currentSections?.[currentData.sectionIndex]
		: null

	const wordsInSection = (() => {
		console.log("wordsInSection running. currentSection: ", currentSection)
		// Handle cases where currentSection is undefined
		if (!currentSection) {
			console.log("currentSection is undefined, returning 0")
			return 0
		}

		// If the current section's translation is an array, count valid items
		if (Array.isArray(currentSection.section.translation)) {
			console.log(
				"currentSection.translation is array  ",
				currentSection.translation
			)

			return currentSection.section.translation.filter(
				(translation) => translation.word
			).length
		}

		// If the current section's translation is a single object
		if (
			currentSection.section.translation &&
			currentSection.section.translation.word
		) {
			console.log(
				"currentSection.translation is object returning 1",
				currentSection.section.translation
			)

			return 1
		}
		console.log(
			"currentSection.translation is null ",
			currentSection.section.translation
		)

		// If no translation is needed, return 0
		return 0
	})()

	const isTranslated = (index) => {
		// console.log("currentData: ", currentData)
		// console.log("Checking if translatedWords contains index:", index)
		// console.log("translatedWords: ", currentData.translatedWords)
		return currentData.translatedWords.some((entry) => entry.index === index)
	}

	const getTranslationForIndex = (index) => {
		const entry = currentData.translatedWords.find(
			(item) => item.index === index
		)
		return entry?.phraseTranslation || entry?.words.join(", ")
	}

	const untranslatedSentence = (() => {
		if (!currentSentence) return null

		if (currentData.quizType === "parts") {
			const sentenceParts = currentSentence.data

			// If sentence parts exist, map them to a JSX fragment
			if (sentenceParts) {
				return sentenceParts.map((item, index) => (
					<span
						key={index}
						className={`mr-2 ${
							item.translation ? "text-accent font-bold" : ""
						} ${
							index ===
							currentData.currentSections?.[currentData.sectionIndex].index
								? "border-4 border-accent"
								: ""
						} ${isTranslated(index) ? "text-green-700 text-6xl" : ""}`}
					>
						{item.phrase ? item.phrase : item.word}
					</span>
				))
			}
		}

		if (currentData.quizType === "full") {
			return currentSentence.sentence
		}

		return null
	})()

	const translatedSentence = (() => {
		if (currentData.quizType === "full") {
			return (
				<div className="mb-4 border-b-4 border-secondary w-full h-8 relative flex justify-center items-center">
					{/* User input text */}
					<span
						className="text-black text-5xl absolute inset-0 flex justify-center items-center"
						style={{
							whiteSpace: "pre-wrap",
							transform: "translateY(-10px)", // Move the text up by 10px
						}}
					>
						{userInput}
					</span>
					{/* Underline placeholder */}
					<span className="invisible">
						{"\u00A0".repeat(currentSentence?.sentence.length + 12 || 20)}
					</span>
				</div>
			)
		}

		// For "parts" quiz type, render each section dynamically
		return currentSentence?.data?.map((word, index) => {
			const translation = getTranslationForIndex(index)

			// console.log("Rendering word at index: ", index)
			// console.log("Current section index: ", currentData.sectionIndex)
			// console.log("Is translated: ", isTranslated(index))

			return (
				<span
					key={index}
					className={`mr-2 ${
						!word.translation
							? "text-green-800"
							: isTranslated(index)
							? "text-green-700 text-6xl"
							: "border-b-4 border-red-500 text-sm"
					}`}
				>
					{word.translation
						? translation || // Show translation if available
						  (index ===
						  currentData.currentSections[currentData.sectionIndex].index ? (
								<span className="text-primary">
									{`${wordsInSection} Spanish Word(s)`}
								</span>
						  ) : (
								"__________________"
						  ))
						: word.phrase
						? word.phrase
						: word.word}
				</span>
			)
		})
	})()

	// Debugging translated words increment
	useEffect(() => {
		console.log("Current Data Updated:", currentData)
	}, [currentData])

	if (!currentSentence) return null
	if (!currentData) return null
	return (
		<div className="text-6xl text-spanishBlue flex flex-col justify-center items-center space-y-12">
			<div>{untranslatedSentence}</div>
			<div>{translatedSentence}</div>
		</div>
	)
}

export default Sentence
