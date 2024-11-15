"use client"

import { useTranslation } from "@/lib/TranslationContext"
import spanishData from "@/lib/spanishData"
import { useState } from "react"

const Sentence = ({}) => {
	const {
		currentIndex,
		translatedWords,
		lessonNumber,
		sentenceIndex,
		changeSentence,
		quizType,
		setQuizType,
		wordCount,
	} = useTranslation()

	const [numToTranslate, setNumToTranslate] = useState(0)

	const currentSentence =
		spanishData?.lessons[lessonNumber]?.sentences?.[sentenceIndex]
	const currentSection = currentSentence?.data?.[currentIndex]

	const wordsInSection = (() => {
		// Get the current section based on currentIndex
		if (!currentSection) return 0 // Handle cases where currentSection is undefined

		// If the current section's translation is an array, count the items that have a word
		if (Array.isArray(currentSection.translation)) {
			return currentSection.translation.filter(
				(translation) => translation.word
			).length
		}

		// If the current section's translation is a single object, check if it has a translation word
		if (currentSection.translation && currentSection.translation.word) {
			return 1
		}

		// If no translation is needed, return 0
		return 0
	})()

	const sentenceData =
		spanishData?.lessons?.[lessonNumber]?.sentences?.[sentenceIndex]

	const untranslatedSentence = (() => {
		// Return null if sentenceData is not available
		if (!sentenceData) return null

		if (quizType === "parts") {
			const sentenceParts =
				spanishData?.lessons?.[lessonNumber]?.sentences?.[sentenceIndex]?.data

			// If sentence parts exist, return a JSX fragment with mapped items
			if (sentenceParts) {
				return Object.values(sentenceParts).map((item, index) => (
					<span
						key={index}
						className={`mr-2 ${
							item.translation ? "text-accent font-bold" : ""
						} ${index === currentIndex ? "border-4 border-true_blue" : ""} ${
							translatedWords[index] ? "text-green-700" : ""
						}`}
					>
						{item.phrase ? item.phrase : item.word}
					</span>
				))
			}
		}

		// If quizType is "full", return the full sentence
		if (quizType === "full") {
			return sentenceData.sentence
		}

		return null
	})()

	const translatedSentence =
		quizType === "full" ? (
			// If quizType is "full", display a single blank line
			<div className="mb-4 border-b-4 border-accent inline-block w-full h-8">
				{"\u00A0".repeat(sentenceData?.sentence.length + 12 || 20)}
			</div>
		) : (
			// If quizType is not "full", proceed with the usual translation logic
			sentenceData?.data?.map((word, index) => (
				<span
					key={index}
					className={`mr-2 ${
						!word.translation
							? "text-secondary"
							: translatedWords[index]
							? "text-green-700"
							: "border-b-4 border-red-500 text-sm"
					}`}
				>
					{/* If this is the current index, show the wordsInSection count */}
					{word.translation
						? translatedWords[index] ||
						  (index === currentIndex
								? `${wordsInSection} Spanish Word(s)`
								: "__________________")
						: word.word}
				</span>
			))
		)

	// JSX Return Statement

	if (!sentenceData) return null
	return (
		<div className="text-6xl text-primary flex flex-col justify-center items-center space-y-6">
			<div>{untranslatedSentence}</div>
			<div>{translatedSentence}</div>
		</div>
	)
}
export default Sentence
