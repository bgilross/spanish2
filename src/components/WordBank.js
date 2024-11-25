import { useEffect, useState } from "react"
import spanishData from "@/lib/spanishData"
import ClickableText from "./ClickableText"
import { useQuiz } from "@/lib/QuizContext"
import MyButton from "./MyButton"

const WordBank = () => {
	const { currentData } = useQuiz()
	const [wordBank, setWordBank] = useState(
		spanishData.lessons[currentData.lessonNumber].wordBank
	)
	const [displayedLesson, setDisplayedLesson] = useState(
		spanishData.lessons[currentData.lessonNumber]
	)

	useEffect(() => {
		setDisplayedLesson(spanishData.lessons[currentData.lessonNumber])
		setWordBank(spanishData.lessons[currentData.lessonNumber].wordBank)
	}, [currentData.lessonNumber])

	if (!displayedLesson.lesson) return null

	console.log(
		"WordBank. CurrentData: ",
		currentData,
		"displayedLesson: ",
		displayedLesson,
		"wordBank: ",
		wordBank
	)

	return (
		<div className="flex flex-col items-center w-full h-full">
			{/* Title Section */}
			<div className="text-center text-lg font-bold mb-4">
				{spanishData?.lessons?.[displayedLesson.lesson]?.name}:{" "}
				<span className="text-sm">
					{spanishData.lessons[displayedLesson.lesson].details}
				</span>
			</div>

			{/* Scrollable Word Bank Section */}
			<div className="flex-1 overflow-y-auto w-full px-4 border border-gray-300 rounded-md">
				{wordBank && wordBank.length > 0 ? (
					wordBank.map((word, index) => (
						<div
							key={index}
							className="mb-2"
						>
							{/* <h3 className="font-bold text-lg text-primary">
								{word.pos.toUpperCase()} ?
							</h3> */}
							<div className="whitespace-pre-wrap">
								<span className="font-bold">
									<ClickableText>{word.word.toUpperCase()}</ClickableText>:
								</span>{" "}
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
								<span className="font-bold">
									<ClickableText>{word.pos.toUpperCase()}</ClickableText>
									{word.gender && `: ${word.gender}`}
								</span>
								<br />
								{word.info && (
									<span className="text-gray-300">
										<ClickableText>{word.info[0]}</ClickableText>
									</span>
								)}
							</div>
						</div>
					))
				) : (
					<div>No word bank available for this lesson.</div>
				)}
			</div>

			{/* Fixed Buttons Section */}
			<div className="flex justify-around w-full mt-4">
				<MyButton
					onClick={() => {
						setDisplayedLesson(displayedLesson.lesson - 1)
						setWordBank(
							spanishData.lessons[displayedLesson.lesson - 1].wordBank
						)
					}}
					disabled={displayedLesson.lesson <= 1}
					isPrimary={false}
				>
					Prev Lesson
				</MyButton>
				<MyButton
					onClick={() => {
						console.log("Next Lesson")
						console.log("displayedLesson: ", displayedLesson)
						console.log(
							"displayedLesson.lesson + 1: ",
							displayedLesson.lesson + 1
						)

						setDisplayedLesson(displayedLesson.lesson + 1)
						setWordBank(
							spanishData.lessons[displayedLesson.lesson + 1].wordBank
						)
					}}
					disabled={
						displayedLesson.lesson >= Object.keys(spanishData.lessons).length
					}
					isPrimary={false}
				>
					Next Lesson
				</MyButton>
			</div>
		</div>
	)
}

export default WordBank
