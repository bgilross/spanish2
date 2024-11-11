function Sentence({ sentence }) {
	// Split the sentence into words
	const words = sentence?.sentence?.split(" ")

	// Function to check if a word is within any highlight range
	const getHighlightInfo = (index) => {
		return sentence.translate.find(
			(highlight) => index >= highlight.start && index <= highlight.end
		)
	}

	return (
		<p>
			{words?.map((word, index) => {
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

export default Sentence
