"use client"
import spanishData from "@/lib/spanishData"
import { useState } from "react"

const Sentence = ({
	sentenceData,
	markedWords,
	setMarkedWords,
	currentIndex,
	translatedWords,
}) => {
	return (
		<div className="text-6xl">
			{sentenceData?.data?.map((word, index) => (
				<span
					key={index}
					className={`mr-2 ${
						word.translation ? "text-blue-500 font-bold" : ""
					} ${index === currentIndex ? "border-b-4 border-red-500" : ""}`}
				>
					{translatedWords[index] ? translatedWords[index] : word.word}
				</span>
			))}
		</div>
	)
}
export default Sentence
