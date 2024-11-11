// maybe change to prounoun.eso or conjunction.y conjuction.que

const y = {
	word: "and",
	translation: "y",
	audio:
		"https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=and&tl=es&total=1&idx=0&textlen=3",
	pos: "conjunction",
}

const eso = {
	word: "that",
	translation: "eso",
	audio:
		"https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=that&tl=es&total=1&idx=0&textlen=4",
	pos: "pronoun",
}
const que = {
	word: "that",
	translation: "que",
	audio:
		"https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=that&tl=es&total=1&idx=0&textlen=4",
	pos: "conjunction",
}

const spanishData = {
	lesson1: {
		wordBank: [y, eso, que],
		sentences: [
			{
				id: 1,
				sentence: "She and I want that",
				translation: "She y I want eso",
				data: [
					{ word: "She" },
					{ word: "and", translation: y },
					{ word: "I" },
					{ word: "want" },
					{ word: "that", translation: eso },
				],
			},
			{
				id: 1,
				sentence: "She and I want that",
				translation: "She y I want eso",
				data: [
					{ word: "She" },
					{ word: "and", translation: y },
					{ word: "I" },
					{ word: "want" },
					{ word: "that", translation: eso },
				],
			},
		],
	},
}

export default spanishData
