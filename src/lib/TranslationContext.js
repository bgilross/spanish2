"use client"
import React, { createContext, useState, useContext, useEffect } from "react"
import spanishData from "./spanishData"
import { current } from "tailwindcss/colors"

const TranslationContext = createContext()

export const TranslationProvider = ({ children }) => {
	// const [userInput, setUserInput] = useState("")
	const [translatedWords, setTranslatedWords] = useState({})
	const [sentenceData, setSentenceData] = useState({})
	const [currentIndex, setCurrentIndex] = useState(0)
	const [sentenceIndex, setSentenceIndex] = useState(0)
	const [score, setScore] = useState({ errors: [] })
	const [showRedFlash, setShowRedFlash] = useState(false)
	const [showGreenFlash, setShowGreenFlash] = useState(false)
	const [ready, setReady] = useState(false)
	const [lessonNumber, setLessonNumber] = useState(3)

	const findNextHighlightedIndex = (sentenceData, translatedWords) => {
		if (!sentenceData || !sentenceData.data) {
			console.log("No sentence data found, returning -1")
			return -1
		}
		// Find the next word to translate that has not been translated yet
		return sentenceData.data.findIndex(
			(word, index) => word.translation && !(index in translatedWords)
		)
	}

	useEffect(() => {
		console.log("Initializing lesson...")
		const lesson = 3
		const initializeLesson = (lessonNumber) => {
			const initialSentenceData =
				spanishData.lessons[lessonNumber]?.sentences[0] || {}
			setSentenceData(initialSentenceData)
			setSentenceIndex(0)
			setTranslatedWords({})

			// Set the first highlighted word
			const initialIndex = findNextHighlightedIndex(initialSentenceData, {})
			setCurrentIndex(initialIndex)
			console.log("Initialized lesson:", lessonNumber)
		}

		// Initialize the lesson on first render
		initializeLesson(lesson)
	}, []) // Empty dependency array ensures this runs only once

	const handleLessonChange = (newLessonNumber) => {
		const lessonKey = parseInt(newLessonNumber, 10)
		if (lessonKey === lessonNumber) return // Prevent re-initialization if the lesson is the same

		setLessonNumber(lessonKey)
		const newSentenceData = spanishData.lessons[lessonKey]?.sentences[0] || {}
		setSentenceData(newSentenceData)
		setSentenceIndex(0)
		setTranslatedWords({})

		// Set the first word to be translated
		const nextIndex = findNextHighlightedIndex(newSentenceData, {})
		setCurrentIndex(nextIndex)
		console.log("Lesson changed to:", lessonKey)
	}
	const nextSentence = () => {
		const newIndex = sentenceIndex + 1
		if (newIndex < spanishData.lessons[lessonNumber]?.sentences.length) {
			const newSentenceData =
				spanishData.lessons[lessonNumber]?.sentences[newIndex]
			setSentenceIndex(newIndex)
			setSentenceData(newSentenceData)
			setTranslatedWords({})

			// Set the next word to be translated
			const nextIndex = findNextHighlightedIndex(newSentenceData, {})
			setCurrentIndex(nextIndex)
		}
	}

	const changeSentence = (newIndex) => {
		setSentenceIndex(newIndex)
		setTranslatedWords({})
		const nextIndex = findNextHighlightedIndex(
			spanishData.lessons[lessonNumber].sentences[newIndex],
			{}
		)
		setCurrentIndex(nextIndex)
	}

	const logData = () => {
		console.log("translatedWords: ", translatedWords)
		console.log("sentenceData: ", sentenceData)
		console.log("currentIndex: ", currentIndex)
		console.log("sentenceIndex: ", sentenceIndex)
		console.log("score: ", score)
		console.log("lessonNumber: ", lessonNumber)
	}

	// Utility function to remove punctuation
	const removePunctuation = (str) => {
		return str.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").trim()
	}

	const handleSubmit = (userInput) => {
		console.log("User input:", userInput)

		if (!sentenceData || currentIndex === -1) return

		const currentWord = sentenceData.data[currentIndex]

		// Remove punctuation from user input and translations
		const sanitizedUserInput = removePunctuation(userInput).toLowerCase()
		const sanitizedTranslation = removePunctuation(
			currentWord.translation?.word || ""
		).toLowerCase()
		const sanitizedPhraseTranslation = removePunctuation(
			currentWord.phraseTranslation || ""
		).toLowerCase()

		// Check if the sanitized input matches either the word or phrase translation
		if (
			sanitizedUserInput === sanitizedTranslation ||
			sanitizedUserInput === sanitizedPhraseTranslation
		) {
			let updatedTranslatedWords
			if (currentWord.phraseTranslation) {
				updatedTranslatedWords = {
					...translatedWords,
					[currentIndex]: currentWord.phraseTranslation,
				}
				setTranslatedWords(updatedTranslatedWords)
			} else {
				updatedTranslatedWords = {
					...translatedWords,
					[currentIndex]: currentWord.translation.word,
				}
				setTranslatedWords(updatedTranslatedWords)
			}

			// Find and set the next word to be translated
			const nextIndex = findNextHighlightedIndex(
				sentenceData,
				updatedTranslatedWords
			)
			setCurrentIndex(nextIndex)

			if (nextIndex === -1) {
				nextSentence()
			}

			flashGreenScreen()
		} else {
			flashRedScreen()
			trackError(userInput, currentWord)
		}
	}

	const trackError = (userInput, currentWord) => {
		const errorEntry = {
			sentence: sentenceData,
			userInput: userInput,
			currentWord: currentWord,
			sentenceIndex: sentenceIndex,
		}
		setScore((prevScore) => ({
			...prevScore,
			errors: [...prevScore.errors, errorEntry],
		}))
	}

	const flashRedScreen = () => {
		console.log("flashing red")
		setShowRedFlash(true)
		setTimeout(() => setShowRedFlash(false), 300) // Flash duration in milliseconds
	}

	const flashGreenScreen = () => {
		console.log("flashing green")
		setShowGreenFlash(true)
		setTimeout(() => setShowGreenFlash(false), 300) // Flash duration in milliseconds
	}

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
				handleSubmit,
				showRedFlash,
				showGreenFlash,
				sentenceIndex,
				score,
				logData,
				lessonNumber,
				setCurrentIndex,
				handleLessonChange,
				nextSentence,
				setSentenceIndex,
				changeSentence,
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
