"use client"
import InputArea from "@/components/InputArea"
import Sentence from "@/components/Sentence"
import { useEffect, useState } from "react"
import spanishData from "@/lib/spanishData"
import { useTranslation } from "@/lib/TranslationContext"

export default function Main() {
	const {
		setSentenceData,
		sentenceData,
		translatedWords,
		setTranslatedWords,
		setCurrentIndex,
		findNextHighlightedIndex,
		currentIndex,
	} = useTranslation()

	useEffect(() => {
		setSentenceData(spanishData.lesson1.sentences[0])
	}, [])

	useEffect(() => {
		const index = findNextHighlightedIndex()
		console.log("index is: ", index)
		setCurrentIndex(index)
	}, [sentenceData])

	return (
		<div className="h-full w-full flex flex-col justify-center items-center">
			<div className="w-full h-full flex flex-col justify-center items-center">
				<Sentence
					sentenceData={sentenceData}
					translatedWords={translatedWords}
					setTranslatedWords={setTranslatedWords}
					currentIndex={currentIndex}
					setCurrentIndex={setCurrentIndex}
				/>
			</div>
			<InputArea
				translatedWords={translatedWords}
				currentIndex={currentIndex}
				setTranslatedWords={setTranslatedWords}
				sentenceData={sentenceData}
			/>
		</div>
	)
}
