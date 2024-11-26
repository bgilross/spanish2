"use client"
import InputArea from "@/components/InputArea"
import Sentence from "@/components/Sentence"
import ScoreSummary from "./ScoreSummary"
import { useTranslation } from "@/lib/TranslationContext"
import WordModal from "./WordModal"
import "../styles/flashOverlay.css"
import Testing from "./Testing"
import { useQuiz } from "@/lib/QuizContext"
import LessonInfoBig from "./LessonInfoBig"
import FeedBackModal from "./FeedbackModal"

export default function Main() {
	const {
		isWordModalOpen,
		setIsWordModalOpen,
		selectedWord,
		setSelectedWord,
		wordModalPosition,
		showRedFlash,
		showGreenFlash,
	} = useTranslation()
	const { currentData, setCurrentData, logData } = useQuiz()

	const RedFlashOverlay = () => {
		return showRedFlash ? <div className="red-flash-overlay"></div> : null
	}

	const GreenFlashOverlay = () => {
		return showGreenFlash ? <div className="green-flash-overlay"></div> : null
	}

	const closeWordModal = () => {
		setIsWordModalOpen(false)
		setSelectedWord(null)
	}

	return (
		<div className="h-full w-full flex flex-col items-center">
			<RedFlashOverlay />
			<GreenFlashOverlay />
			{selectedWord && isWordModalOpen ? (
				<WordModal
					modalPosisition={wordModalPosition}
					selectedWord={selectedWord}
					closeModal={closeWordModal}
				/>
			) : null}

			<div className="w-full flex flex-1 flex-col justify-center items-center">
				<button onClick={logData}>Check</button>
				<Testing />
				<Sentence />
			</div>
			<div className="w-full flex h-1/3 justify-center">
				<InputArea />
			</div>
			<ScoreSummary
				isOpen={currentData.showScoreModal}
				onClose={() =>
					setCurrentData((prev) => ({ ...prev, showScoreModal: false }))
				}
			/>
			<LessonInfoBig
				isOpen={currentData.showLessonModal}
				onClose={() =>
					setCurrentData((prev) => ({ ...prev, showLessonModal: false }))
				}
			/>
			<FeedBackModal
				isOpen={currentData.showFeedbackModal}
				onClose={() =>
					setCurrentData((prev) => ({ ...prev, showFeedbackModal: false }))
				}
			/>
		</div>
	)
}
