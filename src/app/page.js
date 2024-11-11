"use client"
import InputArea from "@/components/InputArea"
import "./globals.css"
import FlipCard from "@/components/FlipCard"
import spanishData from "../lib/spanishData.json"
import Sentence from "@/components/Sentence"
export default function Home() {
	return (
		<div className="h-full w-full flex flex-col justify-center items-center">
			<div className="w-full h-full">
				<Sentence sentence={spanishData.lesson1.sentences[0]} />
			</div>
			<h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
				Fancy Gradient Text!
			</h1>
			<h1 className="text-6xl font-extrabold text-pink-500 glow">
				Glowing Neon Text!
			</h1>
			<h1 className="text-6xl font-extrabold text-gray-800 three-d">
				3D Shadow Text!
			</h1>
			<h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-red-500 block-gradient">
				Stunning 3D Gradient Text!
			</h1>

			<InputArea />
		</div>
	)
}
