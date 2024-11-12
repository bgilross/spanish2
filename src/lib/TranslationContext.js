"use client"
import React, { createContext, useState, useContext, useEffect } from "react"
import spanishData from "./spanishData"
import { current } from "tailwindcss/colors"

const TranslationContext = createContext()

export const TranslationProvider = ({ children }) => {
	const [translatedWords, setTranslatedWords] = useState({})
	const [currentIndex, setCurrentIndex] = useState(0)
	const [sentenceIndex, setSentenceIndex] = useState(0)
	const [score, setScore] = useState({ errors: [] })
	const [showRedFlash, setShowRedFlash] = useState(false)
	const [showGreenFlash, setShowGreenFlash] = useState(false)
	const [lessonNumber, setLessonNumber] = useState(3)
	const [quizType, setQuizType] = useState("parts")

	const assignNextHighlightedIndex = () => {
		console.log(
			"Assigning next highlighted index. Translated words:",
			translatedWords
		)

		// Check if the current sentence exists
		const sentenceData =
			spanishData.lessons[lessonNumber]?.sentences[sentenceIndex]?.data

		if (!sentenceData) {
			console.log("No sentence data found, returning -1")
			setCurrentIndex(-1)
			return
		}

		// Iterate over the entries in the sentence data to find the next word/phrase that needs translation
		const entries = Object.entries(sentenceData)
		const index = entries.findIndex(([key, item]) => {
			const hasTranslation =
				item.translation && !(key in translatedWords) && item.translation.word
			return hasTranslation
		})

		console.log("Next highlighted index:", index)
		setCurrentIndex(index)

		// If no more words to translate, move to the next sentence
		if (index === -1) {
			console.log("No more words to translate in this sentence")
			nextSentence()
		}
	}

	// useEffect to automatically assign the next index when translatedWords changes
	useEffect(() => {
		assignNextHighlightedIndex()
	}, [translatedWords])

	const handleLessonChange = (newLessonNumber) => {
		const lessonKey = parseInt(newLessonNumber, 10)
		if (lessonKey === lessonNumber) return

		setLessonNumber(lessonKey)
		setSentenceIndex(0)
		setTranslatedWords({})

		assignNextHighlightedIndex()
	}

	const nextSentence = () => {
		const newIndex = sentenceIndex + 1
		if (newIndex < spanishData.lessons[lessonNumber]?.sentences.length) {
			setSentenceIndex(newIndex)
			setTranslatedWords({})
		}
	}

	const changeSentence = (newIndex) => {
		setSentenceIndex(newIndex)
		setTranslatedWords({})
		assignNextHighlightedIndex()
	}

	const logData = () => {
		console.log("Current index:", currentIndex)
		console.log("Translated words:", translatedWords)
	}

	const removePunctuation = (str) => {
		return str.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").trim()
	}

	const handleSubmit = (userInput) => {
		const sentenceData =
			spanishData.lessons[lessonNumber].sentences[sentenceIndex]

		if (!sentenceData || currentIndex === -1) return

		const currentWord = sentenceData.data[currentIndex]

		const sanitizedUserInput = removePunctuation(userInput).toLowerCase()
		const sanitizedTranslation = removePunctuation(
			currentWord.translation?.word || ""
		).toLowerCase()
		const sanitizedPhraseTranslation = removePunctuation(
			currentWord.phraseTranslation || ""
		).toLowerCase()

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
				console.log("Updated translated words:", updatedTranslatedWords)
			} else {
				updatedTranslatedWords = {
					...translatedWords,
					[currentIndex]: currentWord.translation.word,
				}
				setTranslatedWords(updatedTranslatedWords)
				console.log("Updated translated words:", updatedTranslatedWords)
			}

			assignNextHighlightedIndex()
			flashGreenScreen()
		} else {
			flashRedScreen()
			trackError(userInput, currentWord)
		}
	}

	const trackError = (userInput, currentWord) => {
		const errorEntry = {
			sentenceData: spanishData.lessons[lessonNumber].sentences[sentenceIndex],
			userInput: userInput,
			currentWord: currentWord,
			sentenceIndex: sentenceIndex,
			lessonNumber: lessonNumber,
		}
		setScore((prevScore) => ({
			...prevScore,
			errors: [...prevScore.errors, errorEntry],
		}))
	}

	const flashRedScreen = () => {
		setShowRedFlash(true)
		setTimeout(() => setShowRedFlash(false), 300)
	}

	const flashGreenScreen = () => {
		setShowGreenFlash(true)
		setTimeout(() => setShowGreenFlash(false), 300)
	}

	return (
		<TranslationContext.Provider
			value={{
				currentIndex,
				translatedWords,
				setTranslatedWords,
				assignNextHighlightedIndex,
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
				quizType,
				setQuizType,
			}}
		>
			{children}
		</TranslationContext.Provider>
	)
}

export const useTranslation = () => {
	return useContext(TranslationContext)
}
