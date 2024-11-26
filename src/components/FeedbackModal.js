import React from "react"
import BigModal from "./BigModal"
import { useQuiz } from "@/lib/QuizContext"

const FeedbackModal = ({}) => {
	const { currentData, setCurrentData } = useQuiz()
	return <div>FeedbackModal</div>
}

export default FeedbackModal
