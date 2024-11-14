import spanishData from "@/lib/spanishData"
import { useTranslation } from "@/lib/TranslationContext"
const WordBank = () => {
	const { lessonNumber } = useTranslation()

	const wordBank = spanishData.lessons[lessonNumber].wordBank
	if (!wordBank) return null
	return (
		<div>
			{wordBank.map((word, index) => (
				<div
					key={index}
					className="whitespace-pre-wrap"
				>
					<span className="font-bold">{word.word.toUpperCase()}:</span>{" "}
					{word.translations.map((translation, index) => (
						<span
							key={index}
							className="text-gray-300"
						>
							{translation}
							{" / "}
						</span>
					))}
					<br />
					<span className="font-bold">{word.pos.toUpperCase()}</span>
					<br />
					<span className="text-gray-300">{word?.info?.[0]}</span>
					<br />
				</div>
			))}
		</div>
	)
}
export default WordBank
