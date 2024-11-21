"use client"

import { useQuiz } from "@/lib/QuizContext"
import spanishData from "@/lib/spanishData"

import { useEffect } from "react"

const Sentence = () => {
	const { currentData, setCurrentData } = useQuiz()

	const currentSentence =
		spanishData?.lessons[currentData.lessonNumber].sentences?.[
			currentData.sentenceIndex
		]
	const currentSection = currentSentence?.data?.[currentData.sectionIndex]

	const wordsInSection = (() => {
		// Handle cases where currentSection is undefined
		if (!currentSection) return 0

		// If the current section's translation is an array, count valid items
		if (Array.isArray(currentSection.translation)) {
			return currentSection.translation.filter(
				(translation) => translation.word
			).length
		}

		// If the current section's translation is a single object
		if (currentSection.translation && currentSection.translation.word) {
			return 1
		}

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
							index === currentData.sectionIndex
								? "border-4 border-true_blue"
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
			// For "full" quiz type, display a single blank line
			return (
				<div className="mb-4 border-b-4 border-accent inline-block w-full h-8">
					{"\u00A0".repeat(currentSentence?.sentence.length + 12 || 20)}
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
							? "text-secondary"
							: isTranslated(index)
							? "text-green-700 text-6xl"
							: "border-b-4 border-red-500 text-sm"
					}`}
				>
					{word.translation
						? translation || // Show translation if available
						  (index === currentData.sectionIndex
								? `${wordsInSection} Spanish Word(s)`
								: "__________________")
						: word.word}
				</span>
			)
		})
	})()

	// Function to handle correct translation
	const handleCorrectTranslation = () => {
		console.log("Correct translation! Moving to next section...")
		const nextSectionIndex = currentData.sectionIndex + 1
		if (nextSectionIndex < currentSentence.data.length) {
			setCurrentData((prev) => ({
				...prev,
				sectionIndex: nextSectionIndex,
			}))
		} else {
			console.log("End of sentence reached. Moving to next sentence...")
			// Move to the next sentence if current sentence is completed
			setCurrentData((prev) => ({
				...prev,
				sentenceIndex: sentenceIndex + 1,
				sectionIndex: 0,
				translatedWords: [],
			}))
		}
	}

	// Debugging translated words increment
	useEffect(() => {
		console.log("Current Data Updated:", currentData)
	}, [currentData])

	// JSX Return Statement
	if (!currentSentence) return null
	if (!currentData) return null
	return (
		<div className="text-6xl text-primary flex flex-col justify-center items-center space-y-6">
			<div>{untranslatedSentence}</div>
			<div>{translatedSentence}</div>
			{/* <button
				className="mt-4 p-2 bg-blue-500 text-white rounded"
				onClick={handleCorrectTranslation}
			>
				Next Word (Debug)
			</button> */}
		</div>
	)
}

export default Sentence
