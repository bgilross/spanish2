import { current } from "tailwindcss/colors"
import InsetInput from "./InsetInput"
import TiltCard from "./TiltCard"
import { useState } from "react"

const InputArea = ({
	currentIndex,
	sentenceData,
	setTranslatedWords,
	translatedWords,
	setCurrentIndex,
	findNextHighlightedIndex,
}) => {
	const [userInput, setUserInput] = useState("")

	const handleClick = () => {
		console.log(userInput)

		if (!sentenceData || currentIndex === -1) return
		if (currentIndex === -1) return

		const currentWord = sentenceData.data[currentIndex]

		if (
			userInput.toLowerCase() ===
			currentWord.translation?.translation.toLowerCase()
		) {
			setTranslatedWords({
				...translatedWords,
				[currentIndex]: currentWord.translation.translation,
			})
			setUserInput("")
			const index = findNextHighlightedIndex()
			setCurrentIndex(index)
		}
	}

	return (
		<div className="bg-secondary rounded-t-2xl w-[95%] h-full flex flex-col items-center justify-center shadow-2xl shadow-primary">
			<div className="flex justify-around w-full h-1/3">
				<TiltCard className="bg-primary w-[12%] rounded-t-none">
					Button1
				</TiltCard>
				<TiltCard>Button2</TiltCard>
				<TiltCard>Button3</TiltCard>
			</div>
			{/* <div className="flex flex-col items-center justify-center p-4 rounded-2xl">
				<input
					type="text"
					placeholder="Enter text here..."
					className="inset-input w-96 p-4 text-primary placeholder-primary_light"
				/>
			</div> */}
			<div className="flex p-4 h-1/3 flex-col w-[80%] space-x-4 justify-center items-center">
				<InsetInput
					inputText={userInput}
					setInputText={setUserInput}
				/>
			</div>
			<div className="h-1/3 flex justify-end w-[80%]">
				<TiltCard
					className="w-[110px] h-[75px] bg-primary text-secondary font-bold rounded-2xl"
					onClick={handleClick}
				>
					Submit!
				</TiltCard>
			</div>
		</div>
	)
}
export default InputArea
