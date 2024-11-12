"use client"
import React, { createContext, useState, useContext, useEffect } from "react"
import spanishData from "./spanishData"

const TranslationContext = createContext()

export const TranslationProvider = ({ children }) => {
	// const [userInput, setUserInput] = useState("")
	const [translatedWords, setTranslatedWords] = useState({})
	const [sentenceData, setSentenceData] = useState({})
	const [currentIndex, setCurrentIndex] = useState(0)
	const [sentenceIndex, setSentenceIndex] = useState(0)
	const [score, setScore] = useState({ errors: [] })
	const [showRedFlash, setShowRedFlash] = useState(false)
	const [showGreenFlash, setShowGreenFlash] = useState(false)
	const [ready, setReady] = useState(false)
	const [lessonIndex, setLessonIndex] = useState(0)

	const logData = () => {
		console.log("translatedWords: ", translatedWords)
		console.log("sentenceData: ", sentenceData)
		console.log("currentIndex: ", currentIndex)
		console.log("sentenceIndex: ", sentenceIndex)
		console.log("score: ", score)
	}
	//if sentence index changes, update sentence data with next sentence, maybe reset should happen here too?
	useEffect(() => {
		setTranslatedWords({})
		console.log(
			"sentence index use effect running, sentence index: ",
			sentenceIndex
		)
		setSentenceData(spanishData.lesson3.sentences[sentenceIndex])
	}, [sentenceIndex])

	//if sentence data changes, update index with next word to translates index
	//also set ready variable
	useEffect(() => {
		if (ready) {
			const index = findNextHighlightedIndex()
			console.log("index is: ", index)
			setCurrentIndex(index)
		}
		if (sentenceData) {
			setReady(true)
		} else {
			setReady(false)
		}
	}, [sentenceData])

	//if translated words changes, i.e. a word has been successfully translated get next word to translate
	//also check if word is completely translated, then increase the sentence index.
	useEffect(() => {
		console.log(
			"sentence index use effect running, sentence index: ",
			sentenceIndex
		)
		if (sentenceData && ready && findNextHighlightedIndex() === -1)
			setSentenceIndex(sentenceIndex + 1)

		const index = findNextHighlightedIndex()
		setCurrentIndex(index)
	}, [translatedWords])

	//find the next word to translate index
	const findNextHighlightedIndex = () => {
		console.log("running find next highlight")
		console.log("translatedWords: ", translatedWords)
		if (!sentenceData || !sentenceData.data) {
			console.log("no sentence data, returning -1")
			return -1
		}
		console.log("there was sentence data and it is: ", sentenceData)
		return sentenceData.data.findIndex(
			(word, index) => word.translation && !(index in translatedWords)
		)
	}

	//check user answer
	const handleSubmit = (userInput) => {
		console.log("submitting")
		console.log("user input is: ", userInput)

		if (!sentenceData || currentIndex === -1) return
		if (currentIndex === -1) return

		const currentWord = sentenceData.data[currentIndex]
		console.log("current word is: ", currentWord)
		console.log("current word translation is: ", currentWord.translation)
		if (
			userInput.toLowerCase() === currentWord.translation?.word.toLowerCase() ||
			userInput.toLowerCase() === currentWord.phraseTranslation?.toLowerCase()
		) {
			setTranslatedWords({
				...translatedWords,
				[currentIndex]: currentWord.translation.word,
			})
			console.log("about to find next highlight index")
			const index = findNextHighlightedIndex()
			console.log("index is: ", index)

			setCurrentIndex(index)
			flashGreenScreen()
			return
		} else {
			console.log("else")
			flashRedScreen()
			trackError(userInput, currentWord)
		}
	}

	const trackError = (userInput, currentWord) => {
		const errorEntry = {
			sentence: sentenceData,
			userInput: userInput,
			currentWord: currentWord,
			sentenceIndex: sentenceIndex,
		}
		setScore((prevScore) => ({
			...prevScore,
			errors: [...prevScore.errors, errorEntry],
		}))
	}

	const flashRedScreen = () => {
		console.log("flashing red")
		setShowRedFlash(true)
		setTimeout(() => setShowRedFlash(false), 300) // Flash duration in milliseconds
	}

	const flashGreenScreen = () => {
		console.log("flashing green")
		setShowGreenFlash(true)
		setTimeout(() => setShowGreenFlash(false), 300) // Flash duration in milliseconds
	}

	return (
		<TranslationContext.Provider
			value={{
				sentenceData,
				currentIndex,
				translatedWords,
				setTranslatedWords,
				setSentenceData,
				findNextHighlightedIndex,
				setCurrentIndex,
				handleSubmit,
				showRedFlash,
				showGreenFlash,
				sentenceIndex,
				score,
				logData,
				lessonIndex,
				setCurrentIndex,
			}}
		>
			{children}
		</TranslationContext.Provider>
	)
}

// Custom hook for using the context
export const useTranslation = () => {
	return useContext(TranslationContext)
}
