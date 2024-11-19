"use client"
import React, { createContext, useState, useContext, useEffect } from "react"
import spanishData from "./spanishData"
import spanishWords from "./spanishWords"
import { useAuth } from "./useAuth"
import { addErrorReport } from "./firestore"
import { current } from "tailwindcss/colors"

const TranslationContext = createContext()

export const TranslationProvider = ({ children }) => {
	const [translatedWords, setTranslatedWords] = useState({})
	const [currentIndex, setCurrentIndex] = useState(0)
	const [sentenceIndex, setSentenceIndex] = useState(0)
	const [score, setScore] = useState({ numCorrect: 0 })
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

	let tempSentenceIndex = 0
	let tempSectionIndex = 0
	let tempLessonIndex = 0
	let tempTranslatedWords = {}

	const { user } = useAuth()

	const reportLessonError = async (errorDetails) => {
		if (user) {
			await addErrorReport(user.uid, errorDetails)
			// console.log("Error report added successfully")
		}
	}

	useEffect(() => {
		// console.log("Current Index useEFfect running: ", currentIndex)
	}, [currentIndex])

	const openScoreModal = () => {
		console.log("Opening score modal")
		setIsScoreModalOpen(true)
	}
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
		// console.log("sentenceIndex use effect runnin: index:", sentenceIndex)
	}, [sentenceIndex])

	const assignNextHighlightedIndex = () => {
		// console.log(
		// 	"Running assign next highlighted indext, currentIndex: ",
		// 	currentIndex
		// )
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
		console.log("Next sentence running sentenceIndex: ", sentenceIndex)
		const newIndex = sentenceIndex + 1
		console.log(
			"Attempting to move to the next sentence. Current index:",
			sentenceIndex
		)
		setCurrentIndex(-1)

		if (newIndex < spanishData.lessons[lessonNumber]?.sentences.length) {
			setSentenceIndex((prevIndex) => prevIndex + 1)
			setTranslatedWords({})
			console.log(
				"newIndex < sentences length, should have set Sentence Index to : ",
				newIndex
			)
		} else {
			console.log("All sentences completed for this lesson")
			reportLessonError(errors)
			setIsScoreModalOpen(true) // Show the score modal if all sentences are completed
		}
	}

	const changeSentence = (newIndex) => {
		console.log("Attempting to change to sentence index:", newIndex)
		setSentenceIndex(newIndex)
		setTranslatedWords({})
	}

	const logData = () => {
		console.log("wordModalPosition: ", wordModalPosition)
		console.log("isScoreModalOpen: ", isScoreModalOpen)
		console.log("sentenceIndex: ", sentenceIndex)
	}

	const removePunctuation = (str) => {
		return str.replace(/[.,/#!$%^&*;:{}=\-_`~()?']/g, "").trim()
	}

	const handleSubmit = (userInput) => {
		// handleUserSubmit(userInput)
	}

	const handleSubmit2 = (userInput, sentenceIndex) => {
		console.log("Handling Submit. userInput:", userInput)
		console.log("quizType: ", quizType)
		console.log("sentenceIndex: ", sentenceIndex)
		console.log("currentIndex: ", currentIndex)
		const sentenceData = sentenceIndex
			? spanishData.lessons[lessonNumber].sentences[sentenceIndex]
			: spanishData.lessons[lessonNumber].sentences[sentenceIndex]

		if (!sentenceData || currentIndex === -1) return

		const currentWord = sentenceData.data[currentIndex]

		// Sanitize user input
		const sanitizedUserInput = removePunctuation(userInput).toLowerCase()

		if (quizType === "full") {
			console.log("Quiz Type: Full")
			const sanitizedSentence = removePunctuation(
				sentenceData.translation || ""
			).toLowerCase()

			if (sanitizedUserInput === sanitizedSentence) {
				console.log("Correct")
				flashGreenScreen()
				setScore((prevScore) => ({
					...prevScore,
					numCorrect: prevScore.numCorrect + 1,
				}))
				nextSentence()
			} else {
				flashRedScreen()
				trackError(userInput, currentWord, sentenceData)
			}
		} else {
			const hasPhraseTranslation = Boolean(currentWord.phraseTranslation)
			let isCorrect = false

			if (hasPhraseTranslation) {
				const sanitizedPhraseTranslation = removePunctuation(
					currentWord.phraseTranslation || ""
				).toLowerCase()
				if (sanitizedUserInput === sanitizedPhraseTranslation) {
					isCorrect = true
				}
			} else {
				const sanitizedTranslation = removePunctuation(
					currentWord.translation?.word || ""
				).toLowerCase()
				if (sanitizedUserInput === sanitizedTranslation) {
					isCorrect = true
				}
			}

			if (isCorrect) {
				const updatedTranslatedWords = {
					...translatedWords,
					[currentIndex]: hasPhraseTranslation
						? currentWord.phraseTranslation
						: currentWord.translation.word,
				}

				setTranslatedWords(updatedTranslatedWords)

				// Use a timeout to allow state updates to propagate before moving to the next sentence
				setTimeout(() => {
					console.log("assign next highlighted index, timeout thing")
					assignNextHighlightedIndex()
					if (currentIndex === -1) {
						nextSentence()
					}
				}, 100)

				flashGreenScreen()
			} else {
				flashRedScreen()
				trackError(userInput, currentWord, sentenceData)
			}
		}
	}

	const trackError = (userInput, currentWord, sentenceData) => {
		console.log("tracking error: current word: ", currentWord)
		console.log("user Input: ", userInput)
		console.log("sentenceData: ", sentenceData)
		console.log("sentenceData.data: ", sentenceData.data)

		const currentSection = sentenceData.data[currentIndex]

		const userWords = userInput
			.split(" ")
			.map((word) => word.trim().toLowerCase())

		let errorWords = []
		let tempRefs = []

		console.log("current Section: ", currentSection)
		console.log("user words:	", userWords)

		console.log("currentSection.translation: ", currentSection.translation)

		if (quizType === "parts") {
			if (Array.isArray(currentSection.translation)) {
				currentSection.translation.forEach((translation) => {
					console.log("translation: ", translation)
					if (!userWords.includes(translation.word.toLowerCase())) {
						console.log(
							"word not included in user Words: ",
							translation.word.toLowerCase()
						)

						errorWords.push(translation)
					}
				})
			} else if (currentSection.translation) {
				const translationWord = currentSection.translation.word.toLowerCase()
				if (!userWords.includes(translationWord)) {
					errorWords.push(currentSection.translation)
				}
			}
		}
		if (quizType === "full") {
			sentenceData.data.forEach((section) => {
				if (section.translation) {
					if (!Array.isArray(section.translation)) {
						const translationWord = section.translation.word.toLowerCase()
						if (!userWords.includes(translationWord)) {
							errorWords.push(section.translation)
						}
					} else if (Array.isArray(section.translation)) {
						section.translation.forEach((translation) => {
							if (!userWords.includes(translation.word.toLowerCase())) {
								errorWords.push(section.translation)
							}
						})
					}
				}
			})
		}
		console.log("errorWords: ", errorWords)
		if (quizType === "parts") {
			errorWords.map((word) => {
				currentSection.reference?.[word].map((ref) => {
					tempRefs.push(ref)
				})
			})
		} else if (quizType === "full") {
			console.log("quizType is full")
			errorWords.map((word) => {
				sentenceData.data.map((section) => {
					section.reference?.[word.word]?.map((ref) => {
						console.log("ref: ", ref)
						if (tempRefs.includes(ref)) {
							return
						}
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
			errorWords: errorWords,
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
				score,
			}}
		>
			{children}
		</TranslationContext.Provider>
	)
}

export const useTranslation = () => {
	return useContext(TranslationContext)
}
