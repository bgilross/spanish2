"use client"

import { createContext, useState, useContext, useEffect } from "react"
import spanishData from "./spanishData"
import { useAuth } from "./useAuth"

const QuizContext = createContext()

export const QuizProvider = ({ children }) => {
	const [currentData, setCurrentData] = useState({
		lessonNumber: 12,
		quizType: "parts",
		sentenceIndex: 0,
		sectionIndex: null,
		sectionsAmt: 0,
		lessonIndex: 0,
		translatedWords: [],
		errors: [],
		showScoreModal: false,
		showLessonModal: false,
		showFeedbackModal: false,
		feedbackMode: true,
		randomizedSentences: [],
		currentSections: [],
		lessonLog: [],
	})
	const [displayStatus, setDisplayStatus] = useState({
		showRedFlash: false,
		showGreenFlash: false,
		showScoreModal: false,
		wordModalPosition: { top: 0, left: 0 },
		showWordModal: false,
	})
	const [userInput, setUserInput] = useState("")
	let tempErrors = []
	let tempLessonNumber = 0
	let tempSentenceIndex = 0
	let tempSectionIndex = 0
	let tempTranslatedWords = []

	const { user } = useAuth()

	useEffect(() => {
		console.log("useEffect start running:")
		const randomizedSentences = randomizeSentences(currentData.lessonNumber)
		console.log("first sentence:: ", randomizedSentences[0])
		const currentSections = getCurrentSections(0, randomizedSentences)

		setCurrentData((prev) => ({
			...prev,
			sectionIndex: 0,
			showLessonModal: true,
			randomizedSentences: randomizedSentences,
			currentSections: currentSections,
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
		console.log("userInput: ", userInput)
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
		console.log("handleUserSubmit running")
		console.log("input: ", input)
		console.log("sentenceInd: ", sentenceInd)
		console.log("sectionInd: ", sectionInd)
		console.log("lessonNum: ", lessonNum)
		console.log("currentData: ", currentData)
		const currentSentence = currentData.randomizedSentences[sentenceInd]
		const currentSection = currentData.currentSections[sectionInd].section
		// console.log("currentSentence: ", currentSentence)
		console.log("handle submit current section: ", currentSection)

		const cleanInput = cleanString(input)
		const correctAnswer = getCorrectAnswer(currentSection, currentSentence)

		console.log("correctAnswer: ", correctAnswer)
		console.log("clean input: ", cleanInput)
		console.log("correct answer: ", correctAnswer)

		const submissionLog = {
			lessonNumber: currentData.lessonNumber,
			sentenceIndex: sentenceInd,
			sectionIndex: sectionInd,
			quizType: currentData.quizType,
			feedbackMode: currentData.feedbackMode,
			sentence: currentData.randomizedSentences[sentenceInd],
			section: currentSection,
			isCorrect: cleanInput === correctAnswer,
			userInput: userInput,
		}

		setCurrentData((prev) => ({
			...prev,
			lessonLog: [...prev.lessonLog, submissionLog],
		}))

		if (cleanInput === correctAnswer) {
			console.log("calling handleCorrectAnswer")
			// console.log("currentSentence: ", currentSentence)
			// console.log("sentenceInd: ", sentenceInd)
			// console.log("currentSection: ", currentSection)
			// console.log("sectionInd: ", sectionInd)

			handleCorrectAnswer(sentenceInd, currentSection, sectionInd, input)
		} else {
			handleIncorrectAnswer(input, currentSentence, currentSection, sectionInd)
		}
	}

	const handleIncorrectAnswer = (
		input,
		currentSentence,
		currentSection,
		sectionInd
	) => {
		//create error log
		const errorData = logErrorData(
			input,
			currentSentence,
			currentSection,
			sectionInd
		)

		//add error to state
		setCurrentData((prev) => ({
			...prev,
			errors: [...prev.errors, errorData],
			showFeedbackModal: true,
		}))
		tempErrors.push(errorData)
		//ADD: add error to firestore
	}

	const logErrorData = (input, currentSentence, currentSection, sectionInd) => {
		console.log("logging error Data")
		// console.log("input: ", input)
		// console.log("currentSentence: ", currentSentence)
		// console.log("currentSection: ", currentSection)
		// console.log("sectionInd: ", sectionInd)

		const userWords = input.split(" ").map((word) => word.trim().toLowerCase())

		const errorWords = findErrors({
			currentSection,
			currentSentence,
			userWords,
			sectionInd,
		})
		const tempRefs = findErrorRefs({
			currentSection,
			currentSentence,
			errorWords,
			sectionInd,
		})

		// console.log("errorWords: ", errorWords)
		// console.log("currentSection: ", currentSection)

		const errorEntry = {
			userInput: input,
			currentSentence: currentSentence,
			currentSection: currentSection,
			lessonNumber: currentData.lessonNumber,
			errorWords: errorWords,
			references: tempRefs,
			mode: currentData.quizType,
		}

		console.log("errorEntry: ", errorEntry)
		return errorEntry
	}

	const findErrors = ({
		currentSection,
		currentSentence,
		userWords,
		sectionInd,
	}) => {
		console.log("finding errors. currentSentence: ", currentSentence)

		let errorWords = []
		if (currentData.quizType === "parts") {
			if (Array.isArray(currentSection.translation)) {
				currentSection.translation.forEach((translation) => {
					console.log("translation: ", translation)
					if (
						!userWords.includes(cleanString(translation.word.toLowerCase()))
					) {
						console.log("word not included in user Words: ", translation.word)
						errorWords.push({
							word: translation,
							sectionInd: sectionInd,
							phrase: currentSection.phraseTranslation,
						})
					}
				})
			} else if (currentSection.translation) {
				const translationWord = currentSection.translation.word.toLowerCase()
				if (!userWords.includes(translationWord)) {
					errorWords.push({
						word: currentSection.translation,
						sectionInd: sectionInd,
						phrase: currentSection.phraseTranslation,
					})
				}
			}
		}
		if (currentData.quizType === "full") {
			currentSentence.data.forEach((section, index) => {
				if (section.translation) {
					if (!Array.isArray(section.translation)) {
						const translationWord = section.translation.word.toLowerCase()
						if (!userWords.includes(translationWord)) {
							errorWords.push({
								word: section.translation,
								sectionInd: index,
								phrase: currentSection.phraseTranslation,
							})
						}
					} else if (Array.isArray(section.translation)) {
						section.translation.forEach((translation) => {
							if (!userWords.includes(translation.word.toLowerCase())) {
								errorWords.push({
									word: translation,
									sectionInd: index,
									phrase: currentSection.phraseTranslation,
									currentSection: currentSection,
								})
							}
						})
					}
				}
			})
		}
		return errorWords
	}
	//
	const findErrorRefs = ({
		currentSection,
		currentSentence,
		errorWords,
		sectionInd,
	}) => {
		console.log("findErrorRefs running")
		console.log("errorWords: ", errorWords)
		console.log("currentSection: ", currentSection)
		console.log("sectionInd: ", sectionInd)
		console.log("currentSentence: ", currentSentence)

		let tempRefs = []
		if (currentData.quizType === "parts") {
			console.log('checking for refs in "parts" mode')

			//check for references first in the currentSection:
			if (currentSection.reference) {
				console.log("currentSection.reference: ", currentSection.reference)
				errorWords.map((error) => {
					console.log("mapping errorwords, currentError: ", error)

					//check errorWord index matches currentSection index
					if (error.sectionInd === sectionInd) {
						console.log("errorWord index matches currentSection index")
						console.log("error.word: ", error.word)
						console.log("error.wordid: ", error.word.id)
						console.log(
							"currentSection.reference[error.word.id]: ",
							currentSection.reference[error.word.id]
						)

						//check if word.word is a key in the reference object:
						if (currentSection.reference[error.word.id]) {
							console.log(
								"error.word.id",
								error.word.id,
								" is a key in the reference object: ",
								currentSection.reference
							)
							currentSection.reference[error.word.id].map((index) => {
								console.log("Word Info Index: ", index)
								const ref = error.word.info[index]
								tempRefs.push(ref)
							})
						}
					}
				})
			}
		} else if (currentData.quizType === "full") {
			console.log("checking for refs in full mode")
			errorWords.map((error) => {
				console.log("mapping error words, current error: ", error)

				let refs = []

				// Iterate over each error word
				errorWords.forEach((error) => {
					console.log("Processing error word:", error.word)

					// Iterate over the sentence's data sections
					currentSentence.data.forEach((section) => {
						if (section.reference?.[error.word.id]) {
							console.log("Reference found for word:", error.word.word)
							console.log("Section reference:", section.reference)

							// Push corresponding info entries to tempRefs
							section.reference[error.word.id].forEach((index) => {
								const ref = error.word.info[index]
								if (ref && !refs.includes(ref)) {
									refs.push(ref)
								}
							})
						}
					})
				})

				refs.map((ref) => {
					console.log("mappings refs, current ref: ", ref)

					console.log("ref: ", ref)
					if (tempRefs.includes(ref)) {
						return
					}
					tempRefs.push(ref)
				})
			})
		}
		return tempRefs
	}

	const handleCorrectAnswer = (
		sentenceInd,
		currentSection,
		sectionInd,
		userInput
	) => {
		console.log("handlingCorrectAnswer")
		console.log("sentenceInd: ", sentenceInd)
		console.log("currentSection: ", currentSection)
		console.log("sectionInd: ", sectionInd)

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

		if (currentData.feedbackMode) {
			if (currentData.quizType === "full") {
				setCurrentData((prev) => ({
					...prev,
					showFeedbackModal: true,
				}))
			}
			if (currentData.quizType === "parts") {
				setCurrentData((prev) => ({
					...prev,
					showFeedbackModal: true,
				}))
			}
		} else if (!currentData.feedbackMode) {
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
				console.log(
					'nextSection is null, or quizType is "full", sentenceInd: ',
					sentenceInd
				)

				const nextIndex = sentenceInd + 1
				getNextSentence(nextIndex)
			}
		}
		//create log of user submission and details:
	}
	//

	const getNextSentence = (index = currentData.sentenceIndex) => {
		console.log("getNextSentence running")
		console.log("index: ", index)
		console.log(
			"length: ",
			spanishData.lessons[currentData.lessonNumber].sentences.length
		)

		if (
			Number(index) <
			spanishData.lessons[currentData.lessonNumber].sentences.length
		) {
			//if there are more sentences, move to next sentence
			console.log("There are more sentences, moving to next sentence")
			console.log("index + 1: ", Number(index) + 1)
			const currentSections = getCurrentSections(Number(index) + 1)

			setCurrentData((prev) => ({
				...prev,
				sentenceIndex: Number(index) + 1,
				// sectionIndex: getNextSection(Number(index) + 1, []),
				sectionIndex: 0,
				// translatedWords: [],
				currentSections: currentSections,
			}))
		} else if (
			index >= spanishData.lessons[currentData.lessonNumber].sentences.length
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

		if (currentData.feedbackMode) {
			if (currentData.sectionIndex + 1 > currentData.currentSections.length) {
				console.log(
					"Feedback Mode. Get Next Section. currentData.sectionIndex + 1 > currentData.currentSections.length. returning null"
				)
				return null
			} else {
				console.log(
					"Feedback Mode. Get Next Section. returning currentData.sectionIndex + 1",
					currentData.sectionIndex + 1
				)

				return currentData.sectionIndex + 1
			}
		}

		const currentSentence =
			spanishData.lessons[currentData.lessonNumber].sentences[sentenceIndex]

		// console.log("currentSentence: ", currentSentence)
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
		console.log(
			"handleLessonChange running, received newLessonNumber: ",
			newLessonNumber
		)
		if (newLessonNumber > Object.keys(spanishData.lessons).length + 1) {
			console.log(
				"newLessonNumber > lesson.length, length: ",
				Object.keys(spanishData.lessons).length
			)
			return
		}

		const lessonKey = parseInt(newLessonNumber, 10)
		if (lessonKey === currentData.lessonNumber) {
			console.log("same lesson, no need to change")
			return
		}

		const randomizedSentences = randomizeSentences(lessonKey)
		const firstSentenceSections = getCurrentSections(
			Number(0),
			randomizedSentences
		)

		tempLessonNumber = lessonKey
		setCurrentData((prev) => ({
			...prev,
			lessonNumber: tempLessonNumber,
			showLessonModal: true,
			randomizedSentences: randomizedSentences,
			currentSections: firstSentenceSections,
		}))
		resetStates()
	}

	const randomizeSentences = (
		lesson = spanishData.lessons[currentData.lessonNumber].lesson
	) => {
		console.log("randomizeSentences running, lesson: ,", lesson)

		const sentences = spanishData.lessons[lesson].sentences
		console.log("sentences: ", sentences)

		//Fisher-Yates shuffle algo
		const shuffledSentences = [...sentences] // Create a copy of the sentences array
		console.log("pre shuffledSentences: ", shuffledSentences)
		for (let i = shuffledSentences.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1)) // Get a random index
			;[shuffledSentences[i], shuffledSentences[j]] = [
				shuffledSentences[j],
				shuffledSentences[i],
			] // Swap elements
		}
		console.log(
			"finished shuffled sentences! shuffledSentences: ",
			shuffledSentences
		)
		console.log("sentence Ind: ")

		return shuffledSentences
	}

	const getCurrentSections = (
		sentenceInd = spanishData.lessons[currentData.lessonNumber].sentences[
			sentenceIndex
		],
		currentSentences = currentData.randomizedSentences
	) => {
		if (currentSentences.length === 0) return

		console.log("getting current sections. sentenceInd: ", sentenceInd)
		console.log("randomized Sentences: ", currentData.randomizedSentences)
		console.log("currentSentences: ", currentSentences)

		const currentSections = currentSentences[sentenceInd].data
			.map((section, index) => {
				console.log("mapping currentSentences.")

				if (section.translation) {
					return { section, index }
				}
				return null // Explicitly return null for non-matching sections
			})
			.filter(Boolean) // Filter out any null or undefined values

		return currentSections
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
				userInput,
				setUserInput,
			}}
		>
			{children}
		</QuizContext.Provider>
	)
}

export const useQuiz = () => {
	return useContext(QuizContext)
}
