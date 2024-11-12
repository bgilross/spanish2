// maybe change to prounoun.eso or conjunction.y conjuction.que

const words = {
	conj: {
		que: {
			translations: ["that"],
			word: "que",
			audio:
				"https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=that&tl=es&total=1&idx=0&textlen=4",
			pos: "conjunction",
			info: [
				"If you CAN add que/that in Spanish as a connector then you HAVE to!",
				"Que is the NUMBER 1 Word in Spanish, but English THAT is not even in the Top 5, why is that? In Spanish if you CAN use Que as a connector then you MUST. Where in English we can say things like 'We hope we get there soon!' In spanish you would have to say 'We hope THAT we get there soon!'",
			],
		},
		y: {
			translations: ["and"],
			word: "y",
			audio:
				"https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=and&tl=es&total=1&idx=0&textlen=3",
			pos: "conjunction",
		},
	},

	pron: {
		eso: {
			translations: ["that"],
			word: "que",
			audio:
				"https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=that&tl=es&total=1&idx=0&textlen=4",
			pos: "conjunction",
			info: [
				"If you CAN add que/that in Spanish as a connector then you HAVE to!",
				"Que is the NUMBER 1 Word in Spanish, but English THAT is not even in the Top 5, why is that? In Spanish if you CAN use Que as a connector then you MUST. Where in English we can say things like 'We hope we get there soon!' In spanish you would have to say 'We hope THAT we get there soon!'",
			],
		},
	},
	prep: {
		de: {
			translations: ["from", "of"],
			word: "de",
			pos: "preposition",
		},
		a: {
			translations: ["to"],
			word: "a",
			pos: "preposition",
		},
	},
	advrb: {
		no: {
			translations: ["not", "no"],
			word: "no",
			pos: "adverb",
			info: [
				"NO means NOT moreso than NO!",
				"Most Adverbs can go anywhere in a sentence and mean all kinds of things, but NO is far more strict, used very specifically to NEGATE a sentence.",
				"In English we can use contractions but they don't exist in Spanish, so we have to use NOT/NO!",
				"When translating English to Spanish and dealing with Contractions (Can't, Don't, Won't) Simply UNTIE the NOT! Turning Can't into Can not!",
				"She Can't Be At the House. is She NO can be at the house. In Spanish verb types like CAN BE have to stick together, and the adverb NO must go first!",
				"In Spanish DO HAVE isn't a real concept, we remove the word DO: I Don't Have that! = I no have that. 'Untie the Knot, and make the D Disappear!'",
			],
		},
	},
}

const { conj, pron, prep } = words

const spanishData = {
	pos_info: {
		pronouns: ["PRONOUNS are INTERCHANGEABLE with NOUNS!"],
		nouns: [
			"FOOD TEST: Nouns in Spanish function as any WORD or PHRASE that can be substituted for the word FOOD!",
			"NOUNS aren't just PEOPLE, PLACES, or THINGS, they can also be ACTIONS! I enjoy LOSING MYSELF IN A NEW CITY",
		],
		verbs: [
			"EAT TEST: Verbs are any word that can be replaced by EAT, EATS or ATE!",
			"What about EATING? EATING or EATEN actually don't behave as verbs in the EAT test! EATING is my Favority activiy, EATING is the NOUN!",
			"Proper Spanish entence can ONLY have ONE verb! (EATS EAT or ATE (NOT EATING/EATEN(Those are Nouns sorta!))), conjunctions allow combining phrases/sentences",
			"VERB PHRASES are where multiple verbs are functioning as only one verb! 'I want to have more!' looks like two verbs, WANT and HAVE but it counts as one! 'I will continue eating my food' Three verbs which counts as ONE! you could change it to 'I EAT my food'",
		],
		conjunctions: [
			"COONJUNCTIONS don't pass the FOOD or the EAT test they are something New!",
			"Connecting Words which hold a sentence, or even multiple sentences together!",
			"Proper Spanish entence can ONLY have ONE verb! (EATS EAT or ATE (NOT EATING/EATEN(Those are Nouns sorta!))), conjunctions allow combining phrases/sentences",
		],
		prepositions: [
			"PREPOSITIONS are ALWAYS used directly before a NOUN of some type, that's why they are call PRE-POSITIONS!",
		],
	},
	lesson3: {
		info: [],
		wordBank: [conj.y, pron.eso, conj.que],
		sentences: [
			{
				id: 1,
				sentence: "She and I want that",
				translation: "She Y I want ESO",
				data: [
					{ word: "She" },
					{ word: "and", translation: conj.y },
					{ word: "I" },
					{ word: "want" },
					{ word: "that", translation: pron.eso },
				],
			},
			{
				id: 2,
				sentence: "We said that was fine",
				translation: "We said QUE ESO was fine",
				data: [
					{ word: "We" },
					{ word: "said" },
					{ word: "that", translation: conj.que },
					{ word: "that", translation: pron.eso },
					{ word: "was" },
					{ word: "fine" },
				],
			},
			{
				id: 3,
				sentence: "I hope that that is OK",
				translation: "I hope QUE ESO is OK",
				data: [
					{ word: "I" },
					{ word: "hope" },
					{ word: "that", translation: conj.que },
					{ word: "that", translation: pron.eso },
					{ word: "is" },
					{ word: "OK" },
				],
			},
			{
				id: 4,
				sentence: "People say QUE it's good",
				translation: "People say QUE ESO is good",
				data: [
					{ word: "People" },
					{ word: "say" },
					{ word: "that", translation: conj.que },
					{ word: "it's" },
					{ word: "good" },
				],
			},
			{
				id: 5,
				setence: "We said that it was fine!",
				translation: "We said QUE ESO was fine!",
				data: [
					{ word: "We" },
					{ word: "said" },
					{ word: "that", translation: conj.que },
					{ word: "that", translation: pron.eso },
					{ word: "was" },
					{ word: "fine" },
				],
			},
			{
				id: 6,
				sentence: "I told them that it was in the way",
				translation: "I told them QUE ESO was in the way",
				data: [
					{ word: "I" },
					{ word: "told" },
					{ word: "them" },
					{ word: "that", translation: conj.que },
					{ word: "that", translation: pron.eso },
					{ word: "was" },
					{ word: "in" },
					{ word: "the" },
					{ word: "way" },
				],
			},
			{
				id: 7,
				sentence: "I hope he gets that soon",
				translation: "I hope QUE he gets ESO soon",
				data: [
					{ word: "I" },
					{ word: "hope" },
					{ word: "that", translation: conj.que },
					{ word: "he" },
					{ word: "gets" },
					{ word: "that", translation: pron.eso },
					{ word: "soon" },
				],
			},
			{
				id: 8,
				sentence: "I don't want that here!",
				translation: "I don't want ESO here!",
				data: [
					{ word: "I" },
					{ word: "don't" },
					{ word: "want" },
					{ word: "that", translation: pron.eso },
					{ word: "here" },
				],
			},
			{
				id: 9,
				sentence: "He said they said that!",
				translation: "He said that they said QUE ESO!",
				data: [
					{ word: "He" },
					{ word: "said" },
					{ word: "that", translation: conj.que },
					{ word: "they" },
					{ word: "said" },
					{ word: "that!", translation: pron.eso },
				],
			},
			{
				id: 10,
				sentence: "I said this and she said that",
				translation: "I said this Y she said ESO",
				data: [
					{ word: "I" },
					{ word: "said" },
					{ word: "this" },
					{ word: "and", translation: conj.y },
					{ word: "she" },
					{ word: "said" },
					{ word: "that", translation: pron.eso },
				],
			},
			{
				id: 11,
				sentence: "They found that?",
				translation: "They found ESO?",
				data: [
					{ word: "They" },
					{ word: "found" },
					{ word: "that?", translation: pron.eso },
				],
			},
		],
	},
	lesson4: {
		wordBank: [prep.no, prep.de, prep.a],
		sentences: [
			{
				id: 1,
				sentence: "She can't be at the house",
				translation: "She NO can be at the house",
				data: [{ word: "She" }],
			},
			{
				id: 1,
				sentence: "She and I want that",
				translation: "She Y I want ESO",
				data: [
					{ word: "She" },
					{ word: "and", translation: conj.y },
					{ word: "I" },
					{ word: "want" },
					{ word: "that", translation: pron.eso },
				],
			},
		],
	},
}

export default spanishData
