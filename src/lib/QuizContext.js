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
		wordCount: 0,
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
	let tempLessonIndex = 0
	let tempSentenceIndex = 0
	let tempSectionIndex = 0
	let tempTranslatedWords = {}
	let lessonOver = false

	const { user } = useAuth()

	const getData = () => {
		return {
			state: currentData,
			tempErrors: tempErrors,
			tempLessonIndex: tempLessonIndex,
			tempSentenceIndex: tempSentenceIndex,
			tempSectionIndex: tempSectionIndex,
			tempTranslatedWords: tempTranslatedWords,
		}
	}

	const resetStates = () => {
		setCurrentData((prev) => ({
			...prev,
			wordCount: 0,
			sentenceIndex: 0,
			sectionIndex: null,
			translatedWords: {},
			tempSentenceIndex: 0,
			tempTranslatedWords: {},
			tempSectionIndex: 0,
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
				currentSentence,
				currentSection,
			})
		} else {
			handleIncorrectAnswer(
				currentSection,
				currentSentence,
				input,
				cleanInput,
				correctAnswer
			)
		}
		return tempLessonIndex, tempSentenceIndex, tempSectionIndex
	}

	const handleCorrectAnswer = (currentSentence, currentSection) => {
		if (currentData.quizType === "parts") {
			//if parts add the correct word to the translatedWords array
			translatedWords.push(currentSection.translation.word)
			//try to get the next section index to translate in the sentence
			nextSection = getNextSection(sentenceIndex)
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
			assignNextSentence()
		}
		if (lessonOver) {
			setCurrentData((prev) => ({
				...prev,
				showScoreModal: true,
			}))
		}
	}

	const getNextSection = (sentenceInd) => {
		const currentSentence = sentenceInd ? sentenceInd : sentenceIndex
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
		const index = sentenceInd ? sentenceInd : currentData.sentenceIndex
		tempSentenceIndex = index + 1
		if (
			tempSentenceIndex >
			spanishData.lessons[currentData.lessonNumber].sentences.length
		) {
			console.log("No more sentences")
			lessonOver = true
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
		<QuizContext.Provider value={{ handleUserSubmit, currentData }}>
			{children}
		</QuizContext.Provider>
	)
}

export const useQuiz = () => {
	return useContext(QuizContext)
}
