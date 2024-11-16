import * as React from "react"
import Popover from "@mui/material/Popover"
import Typography from "@mui/material/Typography"
import spanishWords from "@/lib/spanishWords"

const PopOut = ({ children, wordBank, word }) => {
	const [content, setContent] = React.useState(null)
	// console.log("Word: ", word)
	// console.log("PopOut Children: ", children)

	const [anchorEl, setAnchorEl] = React.useState(null)

	const makeContent = (word) => {
		// console.log("Running setContentword: ", word)
		let modifiedWord = word.toLowerCase()
		let modifiedWordSansS = ""
		if (modifiedWord.endsWith("s")) {
			modifiedWordSansS = modifiedWord.slice(0, -1) // Remove the last character
		}

		let isPos = false
		let posMatch = null
		let matchingWords = []

		Object.keys(spanishWords).forEach((pos) => {
			// console.log("spanishWords[pos].name: ", spanishWords[pos].name)
			// console.log("modifiedWordSansS: ", modifiedWordSansS)
			let posName = ""
			if (Array.isArray(spanishWords[pos].name)) {
				posName = spanishWords[pos].name[0].toLowerCase()
			} else {
				posName = spanishWords[pos].name.toLowerCase()
			}
			if (modifiedWordSansS.length > 1 && posName === modifiedWordSansS) {
				// console.log(
				// 	"posName: ",
				// 	posName,
				// 	"matches modifiedWordSansS: ",
				// 	modifiedWordSansS
				// )
				isPos = true
				posMatch = pos
			} else if (modifiedWordSansS.length < 2 && posName === modifiedWord) {
				// console.log(
				// 	"posName: ",
				// 	posName,
				// 	"matches modifiedWord: ",
				// 	modifiedWord
				// )
				isPos = true
				posMatch = pos
			}
			Object.keys(spanishWords[pos]).forEach((item) => {
				// console.log("Running loop item: ", item)
				// console.log("modified word: ", modifiedWord)
				if (item !== "info" && item !== "name") {
					if (item === modifiedWord) {
						// console.log("item: ", item, "matches modifiedWord: ", modifiedWord)
						matchingWords.push(spanishWords[pos][item])
					} else if (word === modifiedWordSansS) {
						// console.log(
						// 	"item: ",
						// 	item,
						// 	"matches modifiedWordSansS: ",
						// 	modifiedWordSansS
						// )
						matchingWords.push(spanishWords[pos][item])
					}
				}
			})
		})

		if (isPos) {
			// console.log("isPOS: posMatch: ", posMatch)
			return (
				<div>
					<div>
						<strong>Part of Speech:</strong> {spanishWords[posMatch].name}
					</div>
					<div>
						<strong>Info: </strong>
					</div>
					<div>
						{spanishWords[posMatch].info.map((info, index) => (
							<div key={index}>: {info}</div>
						))}
					</div>
				</div>
			)
		} else if (!isPos && matchingWords.length > 0) {
			// console.log("Isn't POS: matchingWords: ", matchingWords)
			return (
				<div>
					<div>
						<div>
							<strong>Word:</strong> {matchingWords[0].word}
						</div>
						{"    "}
						<div>
							<strong>Translations: </strong>{" "}
							{matchingWords[0].translations.map((translation, index) => (
								<span key={index}>{translation}</span>
							))}
						</div>
					</div>
					<div>
						<strong>POS: </strong> {matchingWords[0].pos}
					</div>
					<div>
						<strong>Info: </strong>
					</div>
					<div>
						{matchingWords[0].info.map((info, index) => (
							<div key={index}>: {info}</div>
						))}
					</div>

					{matchingWords.length > 1 &&
						matchingWords.map((word, index) => (
							<div key={index}>
								<div>
									{index} {word.word}
								</div>
							</div>
						))}
				</div>
			)
		}
	}

	const handlePopoverOpen = (event) => {
		// console.log("handlePopoverOpen event: ", event)
		// console.log("event.currentTarget: ", event.currentTarget)
		setAnchorEl(event.currentTarget)
		const temp = makeContent(word)
		setContent(temp)
	}

	const handlePopoverClose = () => {
		setAnchorEl(null)
	}

	const open = Boolean(anchorEl)

	return (
		<>
			<span
				aria-owns={open ? "mouse-over-popover" : undefined}
				aria-haspopup="true"
				onClick={handlePopoverOpen}
			>
				{/* <Typography
					aria-owns={open ? "mouse-over-popover" : undefined}
					aria-haspopup="true"
					// onMouseEnter={handlePopoverOpen}
					// onMouseLeave={handlePopoverClose}
					onClick={handlePopoverOpen}
				> */}
				{children}
				{/* </Typography> */}
			</span>
			<Popover
				id="mouse-over-popover"
				// sx={{ pointerEvents: "none" }}
				open={open}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				onClose={handlePopoverClose}
				disableRestoreFocus
			>
				<div className="bg-secondary text-primary">
					<div className="flex items-end justify-end pr-2">
						<span
							className="cursor-pointer font-bold text-right text-xl text-cornell"
							onClick={handlePopoverClose}
						>
							&times;
						</span>
					</div>
					<div className="p-2">{content}</div>
				</div>
			</Popover>
		</>
	)
}

export default PopOut
