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
		<div className="text-6xl text-primary">
			{sentenceData?.data?.map((word, index) => (
				<span
					key={index}
					className={`mr-2 ${word.translation ? "text-accent font-bold" : ""} ${
						index === currentIndex ? "border-4 border-true_blue" : ""
					} ${translatedWords[index] ? "text-green-700" : ""}`}
				>
					{word.word}
				</span>
			))}
			<div className="text-5xl mt-6 text-secondary text-center">
				{sentenceData?.data?.map((word, index) => (
					<span
						key={index}
						className={`mr-2 ${
							!word.translation ? translatedWords[index] : "text-green-700"
						}`}
					>
						{word.translation ? translatedWords[index] || "_____" : word.word}
					</span>
				))}
			</div>
		</div>
	)
}
export default Sentence
