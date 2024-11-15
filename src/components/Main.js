"use client"
import InputArea from "@/components/InputArea"
import Sentence from "@/components/Sentence"
import ScoreSummary from "./ScoreSummary"
import { useTranslation } from "@/lib/TranslationContext"
import WordModal from "./WordModal"
import "../styles/flashOverlay.css"

export default function Main() {
	const {
		logData,
		isScoreModalOpen,
		setIsScoreModalOpen,
		isWordModalOpen,
		setIsWordModalOpen,
		selectedWord,
		setSelectedWord,
		wordModalPosition,
		showRedFlash,
		showGreenFlash,
	} = useTranslation()

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
				<Sentence />
			</div>
			<div className="w-full flex h-1/3 justify-center">
				<InputArea />
			</div>
			<ScoreSummary
				isOpen={isScoreModalOpen}
				onClose={() => setIsScoreModalOpen(false)}
			/>
		</div>
	)
}
