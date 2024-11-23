"use client"

import { useQuiz } from "@/lib/QuizContext"
import MyButton from "./MyButton"
import spanishData from "@/lib/spanishData"
const LessonButtons = ({ handleClose, isPrimary, onClose }) => {
	const { currentData, setCurrentData, handleLessonChange } = useQuiz()
	const lessons = spanishData.lessons

	return (
		<>
			<MyButton
				onClick={() => handleLessonChange(currentData.lessonNumber - 1)}
				disabled={currentData.lessonNumber === 1}
				isPrimary={isPrimary}
			>
				Prev Lesson
			</MyButton>
			<MyButton
				onClick={onClose}
				disabled={currentData.lessonNumber < 3}
				isPrimary={isPrimary}
			>
				Take Quiz
			</MyButton>
			<MyButton
				onClick={() => handleLessonChange(currentData.lessonNumber + 1)}
				disabled={currentData.lessonNumber === Object.keys(lessons).length}
				isPrimary={isPrimary}
			>
				Next Lesson
			</MyButton>
		</>
	)
}
export default LessonButtons
