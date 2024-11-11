"use client"

import { useTranslation } from "@/lib/TranslationContext"

const Sentence = ({}) => {
	const { sentenceData, currentIndex, translatedWords } = useTranslation()

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
