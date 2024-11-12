"use client"

import { useTranslation } from "@/lib/TranslationContext"
import spanishData from "@/lib/spanishData"

const Sentence = ({}) => {
	const {
		currentIndex,
		translatedWords,
		lessonNumber,
		sentenceIndex,
		changeSentence,
	} = useTranslation()

	const sentenceData =
		spanishData?.lessons?.[lessonNumber]?.sentences?.[sentenceIndex]

	if (!sentenceData) return null
	return (
		<div className="text-6xl text-primary">
			<select
				value={sentenceIndex}
				onChange={(e) => changeSentence(e.target.value)}
			>
				{spanishData?.lessons[lessonNumber]?.sentences.map(
					(sentence, index) => {
						return (
							<option
								key={index}
								value={index}
							>
								{sentence.id}
							</option>
						)
					}
				)}
			</select>
			{spanishData?.lessons?.[lessonNumber]?.sentences?.[sentenceIndex]?.data &&
				Object.values(
					spanishData.lessons[lessonNumber].sentences[sentenceIndex].data
				).map((item, index) => (
					<span
						key={index}
						className={`mr-2 ${
							item.translation ? "text-accent font-bold" : ""
						} ${index === currentIndex ? "border-4 border-true_blue" : ""} ${
							translatedWords[index] ? "text-green-700" : ""
						}`}
					>
						{/* Display phrase if available, otherwise display word */}
						{item.phrase ? item.phrase : item.word}
					</span>
				))}
			<div className="text-5xl mt-6 text-center">
				{sentenceData?.data?.map((word, index) => (
					<span
						key={index}
						className={`mr-2 ${
							!word.translation
								? "text-secondary"
								: translatedWords[index]
								? "text-green-700"
								: "border-b-4 border-red-500"
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
