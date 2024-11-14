"use client"
import InputArea from "@/components/InputArea"
import Sentence from "@/components/Sentence"
import ScoreSummary from "./ScoreSummary"
import { useTranslation } from "@/lib/TranslationContext"
import "../styles/flashOverlay.css"

export default function Main() {
	const { logData, isScoreModalOpen, setIsScoreModalOpen } = useTranslation()

	const RedFlashOverlay = () => {
		const { showRedFlash, isScoreModalOpen, setIsScoreModalOpen } =
			useTranslation()
		return showRedFlash ? <div className="red-flash-overlay"></div> : null
	}

	const GreenFlashOverlay = () => {
		const { showGreenFlash } = useTranslation()
		return showGreenFlash ? <div className="green-flash-overlay"></div> : null
	}

	return (
		<div className="h-full w-full flex flex-col items-center">
			<RedFlashOverlay />
			<GreenFlashOverlay />

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
