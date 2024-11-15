"use client"
import { useState, useEffect } from "react"
import spanishData from "@/lib/spanishData"
// import { words } from "@/lib/spanishData"
import spanishWords from "@/lib/spanishWords"

const ClickableText = ({ children }) => {
	const [text, setText] = useState("")
	const [clickableText, setClickableText] = useState("")
	const [selectedWord, setSelectedWord] = useState(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })

	let wordBank = []
	Object.keys(spanishWords).forEach((pos) => {
		if (Array.isArray(spanishWords[pos].name)) {
			spanishWords[pos].name.forEach((name) => {
				wordBank.push(name.toLowerCase())
				wordBank.push(name.toLowerCase() + "s")
			})
		} else if (!Array.isArray(spanishWords[pos].name)) {
			wordBank.push(spanishWords[pos].name?.toLowerCase())
			wordBank.push(spanishWords[pos].name?.toLowerCase() + "s")
		}
		Object.keys(spanishWords[pos]).forEach((word) => {
			if (word !== "info" && word !== "name") {
				wordBank.push(word.toLowerCase())
			}
		})
	})

	useEffect(() => {
		console.log("Is modal open use EFfect running: status", isModalOpen)
	}, [isModalOpen])
	useEffect(() => {
		console.log("modal Position use effect running : ", modalPosition)
	}, [modalPosition])
	useEffect(() => {
		console.log(
			"children use Effect running, setting text. children: ",
			children
		)
		setText(children)
	}, [children])

	useEffect(() => {
		console.log("text use effect running making words clickable: text:", text)

		const temp = makeWordsClickable(text)
		console.log("temp is: ", temp)
		setClickableText(temp)
	}, [text])

	const makeWordsClickable = (text) => {
		console.log("making words clickable text:  ", text)
		if (!spanishWords) {
			console.log("No words found")
			return
		}

		const words = text?.split(" ")
		const clickableText = words?.map((word, index) => {
			if (wordBank.includes(word.toLowerCase()) && word.toLowerCase() !== "a") {
				return (
					<span
						key={index}
						className="cursor-pointer border-b-accent text-accent font-bold "
						onClick={(e) => handleWordClick(e, word)}
					>
						{word}{" "}
					</span>
				)
			}
			return word + " "
		})

		return <>{clickableText}</>
	}

	const handleWordClick = (e, word) => {
		console.log("word ? clicked: ", word)
		console.log("e: ", e)
		// const lowerCaseWord = word.toLowerCase()
		// Object.keys(spanishWords).forEach((pos) => {
		// 	if (spanishWords[pos][lowerCaseWord]) {
		// 		setSelectedWord(spanishWords[pos][lowerCaseWord])
		// 		setIsModalOpen(true)
		// 	}
		// })
		const { clientX, clientY } = e
		console.log("clientX: ", clientX, "clientY: ", clientY)

		setModalPosition({ top: clientY + 10, left: clientX })
		setIsModalOpen(true)
		setSelectedWord(word)
	}

	const closeModal = () => {
		setIsModalOpen(false)
		setSelectedWord(null)
	}
	if (typeof children !== "string") {
		return <>Children isnt string {children}</>
	}

	return (
		<>
			open?: {isModalOpen}
			{clickableText}
			{isModalOpen && selectedWord && (
				<div
					className="absolute bg-secondary text-white p-4 rounded-lg shadow-lg "
					style={{
						top: modalPosition.top,
						left: modalPosition.left,
						transform: "translate(-50%, -10%)",
						transition: "all 0.2s ease",
						zIndex: 1000,
					}}
				>
					<span
						className="cursor-pointer font-bold text-right text-xl absolute top-1 right-2"
						onClick={closeModal}
					>
						&times;
					</span>
					<div className="text-lg">{selectedWord.toUpperCase()}</div>
				</div>
			)}
		</>
	)
}
export default ClickableText