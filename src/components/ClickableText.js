"use client"
import { useState, useEffect } from "react"
import spanishData from "@/lib/spanishData"
// import { words } from "@/lib/spanishData"
import spanishWords from "@/lib/spanishWords"

const ClickableText = ({ children }) => {
	const [text, setText] = useState("")
	const [clickableText, setClickableText] = useState("")

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

	console.log("Completed wordBank: ", wordBank)

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
		const clickableText = words?.map((word) => {
			console.log("word: ", word)
			if (wordBank.includes(word.toLowerCase()) && word.toLowerCase() !== "a") {
				console.log("word to be clckable: ", word)
				return (
					<span
						key="word"
						className="border-b-accent text-accent font-bold "
					>
						{word}{" "}
					</span>
				)
			}
			return word + " "
		})

		return <>{clickableText}</>
	}
	if (typeof children !== "string") {
		return <>Children isnt string {children}</>
	}

	return <>{clickableText}</>
}
export default ClickableText
