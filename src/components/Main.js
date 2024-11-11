"use client"
import InputArea from "@/components/InputArea"
import Sentence from "@/components/Sentence"
import { useEffect, useState } from "react"
import spanishData from "@/lib/spanishData"
import { useTranslation } from "@/lib/TranslationContext"
import "../styles/flashOverlay.css"

export default function Main() {
	const {
		translatedWords,
		flashRedScreen,
		currentIndex,
		sentenceIndex,
		sentenceData,
	} = useTranslation()

	const RedFlashOverlay = () => {
		const { showRedFlash } = useTranslation()
		return showRedFlash ? <div className="red-flash-overlay"></div> : null
	}

	const GreenFlashOverlay = () => {
		const { showGreenFlash } = useTranslation()
		return showGreenFlash ? <div className="green-flash-overlay"></div> : null
	}

	return (
		<div className="h-full w-full flex flex-col justify-center items-center">
			<RedFlashOverlay />
			<GreenFlashOverlay />
			<button
				onClick={() => {
					console.log("currentIndex: ", currentIndex)
					console.log("translatedWords: ", translatedWords)
					console.log("sentenceIndex: ", sentenceIndex)
					console.log("sentenceData: ", sentenceData)
				}}
			>
				Check
			</button>
			<div className="w-full h-full flex flex-col justify-center items-center">
				<Sentence />
			</div>
			<InputArea />
		</div>
	)
}
