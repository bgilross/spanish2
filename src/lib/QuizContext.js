"use client"

import { createContext, useState, useContext, useEffect } from "react"
import spanishData from "./spanishData"
import spanishWords from "./spanishWords"
import { useAuth } from "./useAuth"
import { addErrorReport } from "./firestore"
import { ShowChart } from "@mui/icons-material"
import { current } from "tailwindcss/colors"

const QuizContext = createContext()

export const QuizProvider = ({ children }) => {
	const [currentData, setCurrentData] = useState({
		lessonNumber: 3,
		quizType: "full",
		sentenceIndex: 0,
		sectionIndex: null,
		lessonIndex: 0,
		translatedWords: {},
		errors: [],
	})
	const [displayStatus, setDisplayStatus] = useState({
		showRedFlash: false,
		showGreenFlash: false,
		showScoreModal: false,
		wordModalPosition: { top: 0, left: 0 },
		showWordModal: false,
	})

	let tempErrors = []
	let tempLessonNumber = 0
	let tempSentenceIndex = 0
	let tempSectionIndex = 0
	let tempTranslatedWords = {}
	let lessonOver = false

	const { user } = useAuth()

	useEffect(() => {
		console.log("useEffect start running:")
		console.log(
			"first sentence:: ",
			spanishData.lessons[currentData.lessonNumber].sentences[
				currentData.sentenceIndex
			]
		)

		setCurrentData((prev) => ({
			...prev,
			sectionIndex: getNextSection(
				spanishData.lessons[prev.lessonNumber].sentences[prev.sentenceIndex],
				{}
			),
		}))
	}, [])

	const logData = () => {
		console.log("currentData: ", currentData)
		console.log("displayStatus: ", displayStatus)
		console.log("tempErrors: ", tempErrors)
		console.log("tempLessonNumber: ", tempLessonNumber)
		console.log("tempSentenceIndex: ", tempSentenceIndex)
		console.log("tempSectionIndex: ", tempSectionIndex)
		console.log("tempTranslatedWords: ", tempTranslatedWords)
	}

	const getData = () => {
		return {
			state: currentData,
			tempErrors: tempErrors,
			tempLessonNumber: tempLessonNumber,
			tempSentenceIndex: tempSentenceIndex,
			tempSectionIndex: tempSectionIndex,
			tempTranslatedWords: tempTranslatedWords,
		}
	}

	const resetStates = () => {
		setCurrentData((prev) => ({
			...prev,
			sentenceIndex: 0,
			sectionIndex: null,
			translatedWords: {},
			tempSentenceIndex: 0,
			tempTranslatedWords: {},
			tempSectionIndex: 0,
			errors: [],
		}))
	}

	const cleanString = (string) => {
		return string
			.replace(/[.,/#!$%^&*;:{}=\-_`~()?']/g, "")
			.trim()
			.toLowerCase()
	}

	const getCorrectAnswer = (currentSection, currentSentence) => {
		console.log("getting Correct Answer")
		console.log("Current Section: ", currentSection)

		let correctAnswer
		currentData.quizType === "parts"
			? (correctAnswer = cleanString(
					currentSection.phraseTranslation
						? currentSection.phraseTranslation
						: currentSection.translation.word
			  ))
			: (correctAnswer = cleanString(currentSentence.translation))
		return correctAnswer
	}

	const handleUserSubmit = (
		input,
		sentenceInd = currentData.sentenceIndex,
		sectionInd = currentData.sectionIndex,
		lessonNum = currentData.lessonNumber
	) => {
		console.log(
			"handling user submit: Input is",
			input,
			"Sentence Ind:",
			sentenceInd,
			"Section Ind:",
			sectionInd,
			"Lesson Num:",
			lessonNum
		)
		//get current sentence and section info, if sentence index or section index isn't provided default to state?
		const currentLesson = spanishData.lessons[lessonNum]
		const currentSentence = currentLesson.sentences[sentenceInd]
		const currentSection = currentSentence.data[sectionInd]

		//sanitize user input
		const cleanInput = cleanString(input)
		//check quiz type and set/clean correct answer based on sentence or section
		const correctAnswer = getCorrectAnswer(currentSection, currentSentence)
		if (cleanInput === correctAnswer) {
			console.log("going to handle correct answer. sentenceInd: ", sentenceInd)
			console.log("currentSentence: ", currentSentence)
			console.log("currentSection: ", currentSection)
			handleCorrectAnswer(sentenceInd, currentSentence, currentSection)
		} else {
			console.log("going to handle incorrect answer Input: ", input)
			handleIncorrectAnswer(input, currentSentence, currentSection)
		}
		return tempLessonNumber, tempSentenceIndex, tempSectionIndex
	}

	const handleIncorrectAnswer = (input, currentSentence, currentSection) => {
		//create error log
		const errorData = getErrorData(input, currentSentence, currentSection)

		//add error to state
		setCurrentData((prev) => ({
			...prev,
			errors: [...prev.errors, errorData],
		}))
		tempErrors.push(errorData)
		//ADD: add error to firestore
	}

	const getErrorData = (input, currentSentence, currentSection) => {
		console.log("input: ", input)
		const userWords = input.split(" ").map((word) => word.trim().toLowerCase())

		let errorWords = []
		let tempRefs = []

		if (currentData.quizType === "parts") {
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
		if (currentData.quizType === "full") {
			currentSentence.data.forEach((section) => {
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
		if (currentData.quizType === "parts") {
			errorWords.map((word) => {
				currentSection.reference?.[word].map((ref) => {
					tempRefs.push(ref)
				})
			})
		} else if (currentData.quizType === "full") {
			console.log("quizType is full")
			errorWords.map((word) => {
				currentSentence.data.map((section) => {
					section.reference?.[word.word]?.map((ref) => {
						console.log("ref: ", ref)
						if (tempRefs.includes(ref)) {
							return
						}
						tempRefs.push(ref)
					})
				})
			})
		}
		const errorEntry = {
			userInput: input,
			currentSentence: currentSentence,
			currentSection: currentSection,
			lessonNumber: currentData.lessonNumber,
			errorWords: errorWords,
			references: tempRefs,
			mode: currentData.quizType,
		}
		return errorEntry
	}

	const handleCorrectAnswer = (
		sentenceInd,
		currentSentence,
		currentSection
	) => {
		console.log("Handling correct answer. Current Section:", currentSection)
		console.log("Current Sentence:", currentSentence)
		console.log("Current SentenceInd:", sentenceInd)

		if (currentData.quizType === "parts") {
			// Add the correct word to the translatedWords object
			tempTranslatedWords[currentSection.translation.word] = true

			setCurrentData((prev) => ({
				...prev,
				translatedWords: {
					...prev.translatedWords,
					[currentSection.translation.word]: true,
				},
			}))

			// Try to get the next section index to translate in the sentence
			console.log("trying to get next section index")
			console.log("tempTranslatedWords: ", tempTranslatedWords)

			const nextSection = getNextSection(currentSentence, tempTranslatedWords)
			console.log("nextSection: ", nextSection)

			if (nextSection === null) {
				console.log(
					"nextSection is null running assign next sentence, sentenceInd: ",
					sentenceInd
				)
				assignNextSentence(sentenceInd)
			} else {
				setCurrentData((prev) => ({
					...prev,
					sectionIndex: nextSection,
				}))
				tempSectionIndex = nextSection
			}
		}

		if (currentData.quizType === "full") {
			// Move to the next sentence
			assignNextSentence({ sentenceInd })
		}

		if (lessonOver) {
			console.log("Lesson is over")
			setCurrentData((prev) => ({
				...prev,
				showScoreModal: true,
			}))
		}
	}

	const getNextSection = (currentSentence, translatedWords) => {
		console.log("Getting next section. Current Sentence:", currentSentence)
		const entries = Object.entries(currentSentence.data)
		console.log("entries:", entries)

		const index = entries.findIndex(([key, item]) => {
			// If the item has an array of translations
			if (Array.isArray(item.translation)) {
				console.log("item.translation is an array:", item.translation)

				const hasUntranslatedItem = item.translation.some(
					(translation) =>
						translation.word &&
						!translatedWords[translation.word] &&
						!currentData.translatedWords[translation.word]
				)
				console.log("hasUntranslatedItem:", hasUntranslatedItem)

				return hasUntranslatedItem
			}

			// If the item has a single translation
			const hasTranslation =
				item?.translation &&
				!translatedWords[item.translation.word] &&
				!currentData.translatedWords[item.translation.word] &&
				item.translation.word

			return hasTranslation
		})

		// Return null if no next section is found
		if (index === -1) {
			return null
		}

		return index
	}

	const assignNextSentence = (sentenceInd, newIndex) => {
		const lesson = spanishData.lessons[currentData.lessonNumber]
		console.log("Assigning next sentence, sentenceInd:", sentenceInd)

		// Determine the current index to use
		const index =
			typeof sentenceInd === "number" ? sentenceInd : currentData.sentenceIndex
		console.log("# of sentences:", lesson.sentences.length)
		console.log("Current index:", index)

		// Determine the next index to use
		const nextIndex = typeof newIndex === "number" ? newIndex : index + 1
		console.log("nextIndex:", nextIndex)

		// Check if we've reached the end of the sentences
		if (nextIndex >= lesson.sentences.length) {
			console.log("No more sentences")
			lessonOver = true
			return
		}

		// Update temporary variables
		tempSentenceIndex = nextIndex
		tempTranslatedWords = {} // Reset translated words for the new sentence
		tempSectionIndex = getNextSection(
			lesson.sentences[nextIndex],
			tempTranslatedWords
		)

		// Update the React state
		setCurrentData((prev) => ({
			...prev,
			sentenceIndex: nextIndex,
			sectionIndex: tempSectionIndex,
			translatedWords: {},
		}))
	}

	const handleLessonChange = (newLessonNumber) => {
		if (newLessonNumber > Object.keys(spanishData.lessons).length + 2) {
			console.log(
				"newLessonNumber > lesson length, length: ",
				Object.keys(spanishData.lessons).length
			)
			return
		}

		const lessonKey = parseInt(newLessonNumber, 10)
		if (lessonKey === currentData.lessonNumber) {
			console.log("same lesson, no need to change")
			return
		}

		tempLessonNumber = lessonKey
		setCurrentData((prev) => ({
			...prev,
			lessonNumber: tempLessonNumber,
		}))
		resetStates()
	}

	return (
		<QuizContext.Provider
			value={{
				handleUserSubmit,
				currentData,
				setCurrentData,
				displayStatus,
				setDisplayStatus,
				handleLessonChange,
				logData,
				getNextSection,
			}}
		>
			{children}
		</QuizContext.Provider>
	)
}

export const useQuiz = () => {
	return useContext(QuizContext)
}
