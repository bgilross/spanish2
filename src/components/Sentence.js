function Sentence({ sentence }) {
	// Split the sentence into words
	const words = sentence.text.split(" ")

	// Function to check if a word is within any highlight range
	const getHighlightInfo = (index) => {
		return sentence.highlights.find(
			(highlight) => index >= highlight.start && index <= highlight.end
		)
	}

	return (
		<p>
			{words.map((word, index) => {
				const highlightInfo = getHighlightInfo(index)

				if (highlightInfo) {
					// If the word (or group) should be highlighted
					return (
						<span
							key={index}
							className="text-blue-500 font-bold"
							title={highlightInfo.translation} // Optional: show translation on hover
						>
							{word}{" "}
						</span>
					)
				}
				return <span key={index}>{word} </span>
			})}
		</p>
	)
}

export default function App() {
	return (
		<div className="p-4">
			{sentences.map((sentence) => (
				<Sentence
					key={sentence.id}
					sentence={sentence}
				/>
			))}
		</div>
	)
}
