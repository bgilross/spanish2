"use client"
import InputArea from "@/components/InputArea"
import Sentence from "@/components/Sentence"

import { useTranslation } from "@/lib/TranslationContext"
import "../styles/flashOverlay.css"

export default function Main() {
	const { logData } = useTranslation()

	const RedFlashOverlay = () => {
		const { showRedFlash } = useTranslation()
		return showRedFlash ? <div className="red-flash-overlay"></div> : null
	}

	const GreenFlashOverlay = () => {
		const { showGreenFlash } = useTranslation()
		return showGreenFlash ? <div className="green-flash-overlay"></div> : null
	}

	return (
		<div className="h-full w-full flex flex-col justify-center items-center">
			<RedFlashOverlay />
			<GreenFlashOverlay />
			<button onClick={logData}>Check</button>
			<div className="w-full h-full flex flex-col justify-center items-center">
				<Sentence />
			</div>
			<InputArea />
		</div>
	)
}
