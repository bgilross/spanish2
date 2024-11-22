import { useEffect, useState } from "react"
import spanishData from "@/lib/spanishData"
import { useTranslation } from "@/lib/TranslationContext"
import ClickableText from "./ClickableText"
import spanishWords from "@/lib/spanishWords"
import { useQuiz } from "@/lib/QuizContext"
import LessonButtons from "./LessonButtons"

const WordBank = () => {
	const { currentData } = useQuiz()
	const [wordBank, setWordBank] = useState(
		spanishData.lessons[currentData.lessonNumber].wordBank
	)

	return (
		<div className="flex flex-col items-center justify-center space-y-4">
			{spanishData.lessons[currentData.lessonNumber].name && (
				<h2 className="text-2xl font-bold text-primary mb-4">
					{spanishData.lessons[currentData.lessonNumber].name}
				</h2>
			)}
			{/* Navigation Arrows */}
			<div className="flex justify-between w-full mb-4">
				<LessonButtons />
			</div>

			{/* Word Bank Display */}

			{wordBank && wordBank.length > 0 ? (
				<div>
					{wordBank.map((word, index) => {
						// Get the key (like "conj" or "pron") and the array of words

						return (
							<div key={index}>
								<h3 className="font-bold text-lg text-primary">
									{word.pos.toUpperCase()}
								</h3>
								<div className="whitespace-pre-wrap mb-6">
									{/* Display the word */}
									<span className="font-bold">
										<ClickableText>{word.word.toUpperCase()}</ClickableText>:
									</span>{" "}
									{/* Display translations */}
									{word?.translations?.map((translation, transIndex) => (
										<span
											key={transIndex}
											className="text-gray-300"
										>
											{translation}
											{transIndex !== word.translations.length - 1 && " / "}
										</span>
									))}
									<br />
									{/* Display part of speech */}
									<span className="font-bold">
										<ClickableText>{word.pos.toUpperCase()}</ClickableText>
										{word.gender && `: ${word.gender}`}
									</span>
									<br />
									{/* Display info if available */}
									{word.info && (
										<span className="text-gray-300">
											<ClickableText>{word.info[0]}</ClickableText>
										</span>
									)}
								</div>
							</div>
						)
					})}
				</div>
			) : (
				<div>No word bank available for this lesson.</div>
			)}
		</div>
	)
}

export default WordBank
