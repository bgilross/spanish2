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
	const [isScoreModalOpen, setIsScoreModalOpen] = useState(false)
	const [masterScore, setMasterScore] = useState({})

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
		if (newLessonNumber > Object.keys(spanishData.lessons).length + 2) {
			console.log("Invalid lesson number")
			console.log("New lesson number:", newLessonNumber)
			console.log("Current lesson number:", lessonNumber)
			console.log("lessons length: ", Object.keys(spanishData.lessons).length)
			return
		}

		const lessonKey = parseInt(newLessonNumber, 10)
		if (lessonKey === lessonNumber) return

		setLessonNumber(lessonKey)
		setSentenceIndex(0)
		setTranslatedWords({})
		saveScoreToMaster()
		setScore({})
	}

	const nextSentence = () => {
		console.log("Moving to the next sentence")
		console.log("Current sentence index:", sentenceIndex)
		const newIndex = sentenceIndex + 1
		console.log("New sentence index:", newIndex)
		console.log(
			"lesson length: ",
			spanishData.lessons[lessonNumber]?.sentences.length
		)
		if (newIndex < spanishData.lessons[lessonNumber]?.sentences.length) {
			console.log("Setting New Index", newIndex)
			setSentenceIndex(newIndex)
			setTranslatedWords({})
		} else {
			// Show the score modal when all sentences are completed
			console.log("showing score")
			setIsScoreModalOpen(true)
		}
	}

	const changeSentence = (newIndex) => {
		setSentenceIndex(newIndex)
		setTranslatedWords({})
	}

	const logData = () => {
		console.log("Current index:", currentIndex)
		console.log("Translated words:", translatedWords)
		console.log(
			"current sentence",
			spanishData.lessons[lessonNumber].sentences[sentenceIndex]
		)
		console.log("Current score:", score)
	}

	const removePunctuation = (str) => {
		return str.replace(/[.,/#!$%^&*;:{}=\-_`~()?']/g, "").trim()
	}

	const handleSubmit = (userInput) => {
		const sentenceData =
			spanishData.lessons[lessonNumber].sentences[sentenceIndex]

		if (!sentenceData || currentIndex === -1) return

		const currentWord = sentenceData.data[currentIndex]

		// Sanitize user input
		const sanitizedUserInput = removePunctuation(userInput).toLowerCase()

		if (quizType === "full") {
			// Handle "full" quiz type where user needs to input the entire sentence
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
				console.log("Updated translated words:", updatedTranslatedWords)

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
		console.log("Tracking error")
		console.log("Current word:", currentWord)
		console.log("User input:", userInput)
		const sentenceData =
			spanishData.lessons[lessonNumber].sentences[sentenceIndex]
		const currentSection = sentenceData.data[currentIndex]
		console.log("currentsentence", sentenceData)
		console.log("Current section:", currentSection)

		const userWords = userInput
			.split(" ")
			.map((word) => word.trim().toLowerCase())
		console.log("user words:", userWords)

		let errorWords = []
		let tempRefs = []

		if (Array.isArray(currentSection.translation)) {
			console.log(
				"currentSection.translationis an array ,",
				currentSection.translation
			)
			const translationWords = currentSection.translation.map((translation) =>
				translation.word.toLowerCase()
			)
			console.log("translation words:", translationWords)

			translationWords.forEach((word) => {
				console.log("word:", word)
				if (!userWords.includes(word)) {
					console.log("word not in user words", word)
					errorWords.push(word)
				}
			})
		} else {
			console.log("currentSection.translation is not an array")
			const translationWord = currentSection.translation.word.toLowerCase()
			console.log("translation word:", translationWord)
			if (!userWords.includes(translationWord)) {
				console.log("translation word not in user words", translationWord)
				errorWords.push(translationWord)
			}
		}

		if (quizType === "parts") {
			errorWords.map((word) => {
				console.log("errorWords mapping, word: ", word)
				console.log(
					"currentSection.reference[word]: ",
					currentSection.reference?.[word]
				)
				currentSection.reference?.[word].map((ref) => {
					console.log("currentSection.ref[word] mapping::", ref)
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

			// Update the score state with the new error entry
			setScore((prevScore) => ({
				...prevScore,
				errors: [...prevScore.errors, errorEntry],
			}))

			console.log("Error tracked:", errorEntry)
		}
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
			console.log("Score saved to masterScore:", masterScore)
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
			}}
		>
			{children}
		</TranslationContext.Provider>
	)
}

export const useTranslation = () => {
	return useContext(TranslationContext)
}
