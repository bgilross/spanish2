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
	const [wordCount, setWordCount] = useState(0)

	const updateWordCount = () => {
		const sentenceData =
			spanishData.lessons[lessonNumber]?.sentences[sentenceIndex]?.data

		if (!sentenceData) {
			console.log("No sentence data found, returning -1")
			setWordCount(0)
		}

		setWordCount(
			sentenceData?.reduce((count, item) => {
				return item.translation ? count + 1 : count
			}, 0)
		)
	}

	useEffect(() => {
		updateWordCount()
	}, [sentenceIndex])
	const assignNextHighlightedIndex = () => {
		console.log(
			"Assigning next highlighted index. Translated words:",
			translatedWords
		)

		// Check if the current sentence exists
		const sentenceData =
			spanishData.lessons[lessonNumber]?.sentences[sentenceIndex]?.data
		console.log("Current sentence data:", sentenceData)

		if (!sentenceData) {
			console.log("No sentence data found, returning -1")
			setCurrentIndex(-1)
			return
		}

		// Iterate over the entries in the sentence data to find the next word/phrase that needs translation
		const entries = Object.entries(sentenceData)
		console.log("Entries in the sentence data:", entries)

		const index = entries.findIndex(([key, item]) => {
			console.log("Key:", key, "Item:", item)
			console.log("Item translation:", item.translation)
			console.log("Translated words:", translatedWords)
			console.log("Key in translated words:", key in translatedWords)

			// Handle the case where the translation is an array
			if (Array.isArray(item.translation)) {
				// Check if any item in the array has not been translated
				const hasUntranslatedItem = item.translation.some(
					(translation) => translation.word && !(key in translatedWords)
				)
				console.log("Has untranslated array item:", hasUntranslatedItem)
				return hasUntranslatedItem
			}

			// Handle the case where the translation is a single object
			const hasTranslation =
				item.translation && !(key in translatedWords) && item.translation.word
			console.log("Has translation:", hasTranslation)
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
		console.log(
			"current sentence",
			spanishData.lessons[lessonNumber].sentences[sentenceIndex]
		)
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
		if (quizType === "full") {
			const sanitizedSentence = removePunctuation(
				sentenceData.translation || ""
			).toLowerCase()
			if (sanitizedUserInput === sanitizedSentence) {
				flashGreenScreen()
				nextSentence()
			} else {
				flashRedScreen()
				trackError(userInput, currentWord)
			}
		} else {
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
				wordCount,
			}}
		>
			{children}
		</TranslationContext.Provider>
	)
}

export const useTranslation = () => {
	return useContext(TranslationContext)
}
