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
			handleCorrectAnswer({
				currentSection,
				currentSentence,
				sentenceInd,
			})
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
		currentSection,
		currentSentence,
		sentenceInd
	) => {
		if (currentData.quizType === "parts") {
			//if parts add the correct word to the translatedWords array
			tempTranslatedWords.push(currentSection.translation.word)
			setCurrentData((prev) => ({
				...prev,
				translatedWords: tempTranslatedWords,
			}))
			//try to get the next section index to translate in the sentence
			nextSection = getNextSection(currentSentence, tempTranslatedWords)
			if (nextSection === null) {
				//move to next sentence
				assignNextSentence()
			} else {
				//move to next section
				setCurrentData((prev) => ({
					...prev,
					sectionIndex: nextSection,
				}))
				tempSectionIndex = nextSection
			}
		}
		if (currentData.quizType === "full") {
			//next Sentence
			assignNextSentence(sentenceInd)
		}
		if (lessonOver) {
			console.log("lessonOver: ", lessonOver)
			setCurrentData((prev) => ({
				...prev,
				showScoreModal: true,
			}))
		}
	}

	const getNextSection = (currentSentence, translatedWords) => {
		const entries = Object.entries(currentSentence.data)

		const index = entries.findIndex(([key, item]) => {
			if (Array.isArray(item.translation)) {
				const hasUntranslatedItem = item.translation.some(
					(translation) => translation.word && !(key in translatedWords)
				)
				return hasUntranslatedItem
			}

			const hasTranslation =
				item.translation && !(key in translatedWords) && item.translation.word
			return hasTranslation
		})
		if (index === -1) {
			return null
		}
		return index
	}

	const assignNextSentence = (sentenceInd) => {
		console.log("assigning next sentence, sentenceInd: ", sentenceInd)

		console.log(
			"# of sentences: ",
			spanishData.lessons[currentData.lessonNumber].sentences.length
		)
		const index = sentenceInd ? sentenceInd : currentData.sentenceIndex

		console.log("index: ", index)
		tempSentenceIndex = index + 1
		console.log("tempSentenceIndex: ", tempSentenceIndex)
		if (
			tempSentenceIndex >
			spanishData.lessons[currentData.lessonNumber].sentences.length
		) {
			console.log("No more sentences")
			lessonOver = true
			return
		}
		setCurrentData((prev) => ({
			...prev,
			sentenceIndex: tempSentenceIndex,
			sectionIndex: null,
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
			}}
		>
			{children}
		</QuizContext.Provider>
	)
}

export const useQuiz = () => {
	return useContext(QuizContext)
}
