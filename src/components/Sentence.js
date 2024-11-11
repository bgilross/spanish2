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
	if (!sentenceData) return null
	return (
		<div className="text-6xl">
			{sentenceData?.data?.map((word, index) => (
				<span
					key={index}
					className={`mr-2 ${
						word.translation ? "text-blue-500 font-bold" : ""
					} ${index === currentIndex ? "border-b-4 border-red-500" : ""}`}
				>
					{word.word}
				</span>
			))}
			<div className="text-4xl mt-6 text-green-600">
				{sentenceData?.data?.map((word, index) => (
					<span
						key={index}
						className="mr-2"
					>
						{word.translation ? translatedWords[index] || "______" : word.word}
					</span>
				))}
			</div>
		</div>
	)
}
export default Sentence
