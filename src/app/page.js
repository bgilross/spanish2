"use client"
import InputArea from "@/components/InputArea"
import "./globals.css"
import FlipCard from "@/components/FlipCard"
import spanishData from "../data/spanish.json"
export default function Home() {
	return (
		<div className="h-full w-full flex flex-col justify-center items-center">
			<div className="w-full h-full"></div>

			<InputArea />
		</div>
	)
}
