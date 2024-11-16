"use client"
import React, { createContext, useState, useContext, useEffect } from "react"
import spanishData from "./spanishData"
import { current } from "tailwindcss/colors"

const TranslationContext = createContext()

export const TranslationProvider = ({ children }) => {
	const [translatedWords, setTranslatedWords] = useState({})
	const [currentIndex, setCurrentIndex] = useState(0)
	const [sentenceIndex, setSentenceIndex] = useState(0)
	const [score, setScore] = useState({})
	const [showRedFlash, setShowRedFlash] = useState(false)
	const [showGreenFlash, setShowGreenFlash] = useState(false)
	const [lessonNumber, setLessonNumber] = useState(3)
	const [quizType, setQuizType] = useState("parts")
	const [wordCount, setWordCount] = useState(0)
	const [isScoreModalOpen, setIsScoreModalOpen] = useState(false)
	const [masterScore, setMasterScore] = useState({})
	const [wordModalPosition, setWordModalPosition] = useState({
		top: 0,
		left: 0,
	})
	const [isWordModalOpen, setIsWordModalOpen] = useState(false)
	const [selectedWord, setSelectedWord] = useState(null)
	const [errors, setErrors] = useState([])

	const openScoreModal = () => {
		console.log("Opening score modal")
		setIsScoreModalOpen(true)
	}
	useEffect(() => {
		console.log(
			"Is score modal open use EFfect running: status",
			isScoreModalOpen
		)
	}, [isScoreModalOpen])

	const updateWordCount = () => {
		const sentenceData =
			spanishData.lessons[lessonNumber]?.sentences[sentenceIndex]?.data

		if (!sentenceData) {
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
		// Check if the current sentence exists
		const sentenceData =
			spanishData.lessons[lessonNumber]?.sentences[sentenceIndex]?.data

		if (!sentenceData) {
			setCurrentIndex(-1)
			return
		}

		// Iterate over the entries in the sentence data to find the next word/phrase that needs translation
		const entries = Object.entries(sentenceData)

		const index = entries.findIndex(([key, item]) => {
			// Handle the case where the translation is an array
			if (Array.isArray(item.translation)) {
				// Check if any item in the array has not been translated
				const hasUntranslatedItem = item.translation.some(
					(translation) => translation.word && !(key in translatedWords)
				)
				return hasUntranslatedItem
			}

			// Handle the case where the translation is a single object
			const hasTranslation =
				item.translation && !(key in translatedWords) && item.translation.word
			return hasTranslation
		})

		setCurrentIndex(index)

		// If no more words to translate, move to the next sentence
		if (index === -1) {
			nextSentence()
		}
	}

	// useEffect to automatically assign the next index when translatedWords changes
	useEffect(() => {
		assignNextHighlightedIndex()
	}, [translatedWords])

	const handleLessonChange = (newLessonNumber) => {
		if (newLessonNumber > Object.keys(spanishData.lessons).length + 2) {
			return
		}

		const lessonKey = parseInt(newLessonNumber, 10)
		if (lessonKey === lessonNumber) return

		setLessonNumber(lessonKey)
		setSentenceIndex(0)
		setTranslatedWords({})
		// saveScoreToMaster()
		setErrors([])
	}

	const nextSentence = () => {
		const newIndex = sentenceIndex + 1

		if (newIndex < spanishData.lessons[lessonNumber]?.sentences.length) {
			setSentenceIndex(newIndex)
			setTranslatedWords({})
		} else {
			// Show the score modal when all sentences are completed

			setIsScoreModalOpen(true)
		}
	}

	const changeSentence = (newIndex) => {
		setSentenceIndex(newIndex)
		setTranslatedWords({})
	}

	const logData = () => {
		console.log("wordModalPosition: ", wordModalPosition)
		console.log("isScoreModalOpen: ", isScoreModalOpen)
	}

	const removePunctuation = (str) => {
		return str.replace(/[.,/#!$%^&*;:{}=\-_`~()?']/g, "").trim()
	}

	const handleSubmit = (userInput) => {
		console.log("Handling Submig. userInput: ", userInput)
		console.log("QuizType: ", quizType)
		const sentenceData =
			spanishData.lessons[lessonNumber].sentences[sentenceIndex]

		if (!sentenceData || currentIndex === -1) return

		const currentWord = sentenceData.data[currentIndex]

		// Sanitize user input
		const sanitizedUserInput = removePunctuation(userInput).toLowerCase()

		console.log("sanitizedUserInput: ", sanitizedUserInput)

		if (quizType === "full") {
			// Handle "full" quiz type where user needs to input the entire sentence
			console.log("handling full")
			const sanitizedSentence = removePunctuation(
				sentenceData.translation || ""
			).toLowerCase()
			console.log("sanitizedSentence: ", sanitizedSentence)
			if (sanitizedUserInput === sanitizedSentence) {
				console.log("correct")
				flashGreenScreen()
				nextSentence()
			} else {
				flashRedScreen()
				trackError(userInput, currentWord)
			}
		} else {
			// Handle "parts" quiz type for individual word/phrase translations
			const hasPhraseTranslation = Boolean(currentWord.phraseTranslation)
			let isCorrect = false

			if (hasPhraseTranslation) {
				// Check if the input matches the phrase translation
				const sanitizedPhraseTranslation = removePunctuation(
					currentWord.phraseTranslation || ""
				).toLowerCase()

				if (sanitizedUserInput === sanitizedPhraseTranslation) {
					isCorrect = true
				}
			} else {
				// Check if the input matches the single word translation
				const sanitizedTranslation = removePunctuation(
					currentWord.translation?.word || ""
				).toLowerCase()

				if (sanitizedUserInput === sanitizedTranslation) {
					isCorrect = true
				}
			}

			// Handle correct answer
			if (isCorrect) {
				let updatedTranslatedWords
				if (currentWord.phraseTranslation) {
					updatedTranslatedWords = {
						...translatedWords,
						[currentIndex]: currentWord.phraseTranslation,
					}
				} else {
					updatedTranslatedWords = {
						...translatedWords,
						[currentIndex]: currentWord.translation.word,
					}
				}
				setTranslatedWords(updatedTranslatedWords)

				assignNextHighlightedIndex()
				flashGreenScreen()
			} else {
				// Handle incorrect answer
				flashRedScreen()
				trackError(userInput, currentWord)
			}
		}
	}

	const trackError = (userInput, currentWord) => {
		// console.log(
		// 	"tracking error: current word: ",
		// 	currentWord,
		// 	"user Input: ",
		// 	userInput
		// )
		const sentenceData =
			spanishData.lessons[lessonNumber].sentences[sentenceIndex]
		const currentSection = sentenceData.data[currentIndex]

		const userWords = userInput
			.split(" ")
			.map((word) => word.trim().toLowerCase())

		let errorWords = []
		let tempRefs = []

		if (Array.isArray(currentSection.translation)) {
			const translationWords = currentSection.translation.map((translation) =>
				translation.word.toLowerCase()
			)

			translationWords.forEach((word) => {
				if (!userWords.includes(word)) {
					errorWords.push(word)
				}
			})
		} else {
			const translationWord = currentSection.translation.word.toLowerCase()
			if (!userWords.includes(translationWord)) {
				errorWords.push(translationWord)
			}
		}

		if (quizType === "parts") {
			errorWords.map((word) => {
				currentSection.reference?.[word].map((ref) => {
					tempRefs.push(ref)
				})
			})
		} else if (quizType === "full") {
			errorWords.map((word) => {
				sentenceData.data.map((section) => {
					section.reference?.[word].map((ref) => {
						tempRefs.push(ref)
					})
				})
			})

			// Construct the error entry
		}
		const errorEntry = {
			sentenceData: sentenceData,
			userInput: userInput,
			currentWord: currentWord,
			sentenceIndex: sentenceIndex,
			lessonNumber: lessonNumber,
			currentSection: currentSection,
			mode: quizType,
			references: tempRefs,
		}
		// console.log("errorEntry created: ", errorEntry)
		// Update the score state with the new error entry
		setErrors((prevErrors) => [...prevErrors, errorEntry])
	}

	const saveScoreToMaster = () => {
		if (score.errors.length > 0) {
			const timestamp = new Date().toISOString() // Get current timestamp
			const lessonKey = `lesson${lessonNumber}`

			// Create a new entry with timestamp
			const scoreEntry = {
				...score,
				timestamp,
			}

			// Update the masterScore with the new score entry
			setMasterScore((prevMasterScore) => ({
				...prevMasterScore,
				[lessonKey]: [...(prevMasterScore[lessonKey] || []), scoreEntry],
			}))

			// Reset the current score
			setScore({ errors: [] })
		}
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
				isScoreModalOpen,
				setIsScoreModalOpen,
				selectedWord,
				setSelectedWord,
				isWordModalOpen,
				setIsWordModalOpen,
				wordModalPosition,
				setWordModalPosition,
				setScore,
				errors,
				openScoreModal,
				setErrors,
			}}
		>
			{children}
		</TranslationContext.Provider>
	)
}

export const useTranslation = () => {
	return useContext(TranslationContext)
}
