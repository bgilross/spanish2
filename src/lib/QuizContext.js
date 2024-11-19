"use client"

import { createContext, useState, useContext, useEffect } from "react"
import spanishData from "./spanishData"
import { useAuth } from "./useAuth"

const QuizContext = createContext()

export const QuizProvider = ({ children }) => {
	const [currentData, setCurrentData] = useState({
		lessonNumber: 3,
		quizType: "full",
		sentenceIndex: 0,
		sectionIndex: null,
		lessonIndex: 0,
		translatedWords: [],
		errors: [],
		showScoreModal: false,
		showLessonModal: false,
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
	let tempTranslatedWords = []
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
			sectionIndex: getNextSection(0, []),
			showLessonModal: true,
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
			translatedWords: [],
			tempSentenceIndex: 0,
			tempTranslatedWords: [],
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
		// console.log("handleUserSubmit running")
		// console.log("input: ", input)
		// console.log("sentenceInd: ", sentenceInd)
		// console.log("sectionInd: ", sectionInd)
		// console.log("lessonNum: ", lessonNum)
		// console.log("currentData: ", currentData)
		const currentSentence =
			spanishData.lessons[currentData.lessonNumber].sentences[sentenceInd]
		const currentSection = currentSentence.data[sectionInd]

		const cleanInput = cleanString(input)
		const correctAnswer = getCorrectAnswer(currentSection, currentSentence)

		if (cleanInput === correctAnswer) {
			handleCorrectAnswer(
				currentSentence,
				sentenceInd,
				currentSection,
				sectionInd
			)
		} else {
			handleIncorrectAnswer(input, currentSentence, currentSection)
		}
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
		console.log("currentSection: ", currentSection)
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
		currentSentence,
		sentenceInd,
		currentSection,
		sectionInd
	) => {
		const translationEntry =
			currentData.quizType === "full"
				? null
				: {
						index: sectionInd,
						words: Array.isArray(currentSection.translation)
							? currentSection.translation.map((item) => item.word)
							: [currentSection.translation?.word],
						phraseTranslation: currentSection.phraseTranslation || null,
				  }

		const updatedTranslatedWords =
			currentData.quizType === "full"
				? []
				: [...currentData.translatedWords, translationEntry]
		const nextSection = getNextSection(sentenceInd, updatedTranslatedWords)

		if (nextSection && currentData.quizType === "parts") {
			console.log("nextSection: ", nextSection)
			setCurrentData((prev) => ({
				...prev,
				sectionIndex: nextSection,
				translatedWords: updatedTranslatedWords,
			}))
		}
		//if next section null move to next sentence
		if (nextSection === null || currentData.quizType === "full") {
			//check if there are more sentences
			getNextSentence(sentenceInd + 1)
		}
	}

	const getNextSentence = (index = currentData.sentenceIndex) => {
		console.log("getNextSentence running")
		console.log("index: ", index)
		console.log(
			"length: ",
			spanishData.lessons[currentData.lessonNumber].sentences.length
		)

		if (
			index < spanishData.lessons[currentData.lessonNumber].sentences.length
		) {
			//if there are more sentences, move to next sentence
			console.log("There are more sentences, moving to next sentence")

			setCurrentData((prev) => ({
				...prev,
				sentenceIndex: prev.sentenceIndex + 1,
				sectionIndex: getNextSection(prev.sentenceIndex + 1, []),
				translatedWords: [],
			}))
		} else if (
			index === spanishData.lessons[currentData.lessonNumber].sentences.length
		) {
			//no more sentences, show score modal
			console.log("There are no more sentences, showing score modal")
			setCurrentData((prev) => ({ ...prev, showScoreModal: true }))
		}
	}
	const getNextSection = (
		sentenceIndex = currentData.sentenceIndex,
		translatedWords = currentData.translatedWords
	) => {
		console.log("getNextSection running")
		console.log("sentenceIndex:", sentenceIndex)
		console.log("translatedWords:", translatedWords)

		const currentSentence =
			spanishData.lessons[currentData.lessonNumber].sentences[sentenceIndex]

		console.log("currentSentence: ", currentSentence)
		if (!currentSentence) return

		// Finding the next section index that has a translation but hasn't been translated yet
		const nextIndex = currentSentence.data.findIndex((section, index) => {
			const hasTranslation = section.translation !== undefined
			const isNotYetTranslated = !translatedWords.some(
				(entry) => entry.index === index
			)

			return hasTranslation && isNotYetTranslated
		})

		return nextIndex === -1 ? null : nextIndex
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
				getNextSentence,
			}}
		>
			{children}
		</QuizContext.Provider>
	)
}

export const useQuiz = () => {
	return useContext(QuizContext)
}
