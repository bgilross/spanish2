import spanishData from "@/lib/spanishData"
import ClickableText from "./ClickableText"
import { useQuiz } from "@/lib/QuizContext"
import { useState } from "react"
import MyButton from "./MyButton"

const LessonInfo = () => {
	const { currentData } = useQuiz()
	const [displayedLesson, setDisplayedLesson] = useState(
		currentData.lessonNumber
	)

	const lessonInfo = spanishData?.lessons?.[displayedLesson]?.info

	return (
		<div className="flex flex-col items-center w-full h-full p-2">
			{/* Title Section */}
			<div className="text-center text-lg font-bold mb-4">
				{spanishData?.lessons?.[displayedLesson]?.name}:{" "}
				<span className="text-sm">
					{spanishData.lessons[displayedLesson].details}
				</span>
			</div>
			<div className="overflow-y-auto">
				{lessonInfo?.map((info, index) => (
					<div
						key={index}
						className="border border-gray-400 p-2 mt-2"
					>
						<ClickableText>{info}</ClickableText>
					</div>
				))}
			</div>
			<div className="flex justify-around w-full mt-4">
				<MyButton
					onClick={() => {
						setDisplayedLesson(displayedLesson - 1)
					}}
					disabled={displayedLesson <= 1}
					isPrimary={false}
				>
					Prev Lesson
				</MyButton>
				<MyButton
					onClick={() => {
						console.log("Next Lesson")
						console.log("displayedLesson: ", displayedLesson)

						setDisplayedLesson(displayedLesson + 1)
					}}
					disabled={displayedLesson === Object.keys(spanishData.lessons).length}
					isPrimary={false}
				>
					Next Lesson
				</MyButton>
			</div>
		</div>
	)
}
export default LessonInfo
