"use client"
import InputArea from "@/components/InputArea"
import Sentence from "@/components/Sentence"
import { useEffect, useState } from "react"
import spanishData from "@/lib/spanishData"
import { useTranslation } from "@/lib/TranslationContext"

export default function Main() {
	const {
		translatedWords,

		currentIndex,
	} = useTranslation()

	return (
		<div className="h-full w-full flex flex-col justify-center items-center">
			<button
				onClick={() => {
					console.log("currentIndex: ", currentIndex)
					console.log("translatedWords: ", translatedWords)
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
