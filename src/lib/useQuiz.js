import spanishData from "./spanishData.js"
import { useTranslation } from "./TranslationContext.js"
import { useEffect } from "react"

export const useQuiz = () => {
	let tempSentenceIndex = 0
	let tempSectionIndex = 0
	let tempLessonIndex = 0
	let lessonOver = false
	let translatedWords = []

	const cleanString = (string) => {
		return string
			.replace(/[.,/#!$%^&*;:{}=\-_`~()?']/g, "")
			.trim()
			.toLowerCase()
	}

	const getCorrectAnswer = (currentSection, currentSentence) => {
		let correctAnswer
		quizType === "parts"
			? (correctAnswer = cleanString(
					currentSection.phraseTranslation
						? currentSection.phraseTranslation
						: currentSection.translation.word
			  ))
			: (correctAnswer = cleanString(currentSentence.translation))
		return correctAnswer
	}

	const getNextSection = (sentenceInd, sectionInd) => {
		//check if args provided, otherwise use state?
		const currentSentence = sentenceInd
		const currentSection = sectionInd
		const entries = Object.entries(currentSentence.data)

		const sectionIndex = entries.findIndex(([key, item]) => {
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

		if (sectionIndex === -1) {
			return null
		}

		return sectionIndex
	}
	const getNextSentence = () => {
		tempSentenceIndex = sentenceIndex + 1
		if (tempSentenceIndex > lesson.sentences.length) {
			console.log("No more sentences")
			lessonOver = true
		}

		translatedWords = []
	}

	const handleCorrectAnswer = (currentSentence, currentSection) => {
		if (quizType === "parts") {
			//if parts add the correct word to the translatedWords array
			translatedWords.push(currentSection.translation.word)
			//try to get the next section index to translate in the sentence
			nextSection = getNextSection(sentenceIndex, sectionIndex)
			if (nextSection === null) {
				//move to next sentence
				getNextSentence()
			} else {
				//move to next section
				setCurrentIndex(nextSection)
				tempSectionIndex = nextSection
			}
		}
		if (quizeType === "full") {
			//next Sentence
			getNextSentence()
		}
		if (lessonOver) {
			setShowScoreModal(true)
		}
	}

	const handleUserSubmit = (input, sentenceInd, sectionInd, lessonNumber) => {
		//get current sentence and section info, if sentence index or section index isn't provided default to state?
		currentLesson = spanishData.lessons[lessonNumber]
		currentSentence = sentenceInd
		currentSection = sectionInd
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

	return { handleUserSubmit }
}
