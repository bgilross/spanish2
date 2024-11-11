"use client"
import React, { createContext, useState, useContext, useEffect } from "react"
import spanishData from "@/lib/spanishData"

const TranslationContext = createContext()

export const TranslationProvider = ({ children }) => {
	// const [userInput, setUserInput] = useState("")
	const [translatedWords, setTranslatedWords] = useState({})
	const [sentenceData, setSentenceData] = useState({})
	const [currentIndex, setCurrentIndex] = useState(0)

	const findNextHighlightedIndex = () => {
		console.log("running find next highlight")
		console.log("translatedWords: ", translatedWords)
		if (!sentenceData || !sentenceData.data) return -1
		return sentenceData.data.findIndex(
			(word, index) => word.translation && !(index in translatedWords)
		)
	}

	useEffect(() => {
		const index = findNextHighlightedIndex()
		setCurrentIndex(index)
	}, [translatedWords])

	return (
		<TranslationContext.Provider
			value={{
				sentenceData,
				currentIndex,
				translatedWords,
				setTranslatedWords,
				setSentenceData,
				findNextHighlightedIndex,
				setCurrentIndex,
			}}
		>
			{children}
		</TranslationContext.Provider>
	)
}

// Custom hook for using the context
export const useTranslation = () => {
	return useContext(TranslationContext)
}

// Handler for submitting the translation
// const handleSubmit = (event) => {
// 	event.preventDefault()

// 	if (currentIndex === -1) return // No more words to translate

// 	const currentWord = sentenceData.data[currentIndex]

// 	// Check if the input matches the translation
// 	if (
// 		userInput.toLowerCase() ===
// 		currentWord.translation.translation.toLowerCase()
// 	) {
// 		// Save the correct translation
// 		setTranslatedWords({
// 			...translatedWords,
// 			[currentIndex]: currentWord.translation.translation,
// 		})
// 		setUserInput("") // Clear input
// 	}
// }
