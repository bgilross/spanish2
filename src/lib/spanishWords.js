const spanishWords = {
	artcl: {
		name: "Article",
		info: [],
		el: {
			translations: ["the (M)"],
			word: "el",
			audio:
				"https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=the&tl=es&total=1&idx=0&textlen=3",
			pos: "Article",
			gender: "masculine",
		},
		la: {
			translations: ["the (F)"],
			word: "la",
			audio:
				"https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=the&tl=es&total=1&idx=0&textlen=3",
			pos: "Article",
			gender: "feminine",
		},
	},
	conj: {
		name: "Conjunction",
		info: [
			"CONJUNCTIONS don't pass the FOOD or the EAT test they are something New!",
			"CONJUNCTIONS are Connecting Words which hold a sentence, or even multiple sentences together!",
			"Proper Spanish sentence can ONLY have ONE verb! (EATS EAT or ATE (NOT EATING/EATEN(Those are Nouns sorta!))), conjunctions allow combining phrases/sentences",
		],
		que: {
			translations: ["that"],
			word: "que",
			audio:
				"https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=that&tl=es&total=1&idx=0&textlen=4",
			pos: "Conjunction",
			info: [
				"Que is the NUMBER 1 Word in Spanish, but English THAT is not even in the Top 5, why is that? In Spanish if you CAN use Que as a connector then you MUST. Where in English we can say things like 'We hope we get there soon!' In spanish you would have to say 'We hope THAT we get there soon!'",

				"If you CAN add QUE / that in Spanish as a connector then you HAVE to!",
			],
		},
		y: {
			translations: ["and"],
			word: "y",
			audio:
				"https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=and&tl=es&total=1&idx=0&textlen=3",
			pos: "Conjunction",
			info: ["Y is a direct translation of AND"],
		},
	},

	pron: {
		name: "Pronoun",
		info: ["PRONOUNS are INTERCHANGEABLE with NOUNS!"],
		eso: {
			translations: ["that"],
			word: "eso",
			audio:
				"https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=that&tl=es&total=1&idx=0&textlen=4",
			pos: "Pronoun",
			info: [
				"ESO is likely the MOST VERSATILE word in Spanish! It is interchangeable with any NOUN or NOUN PHRASE, it can also represent actions and concepts",
			],
		},
	},
	prep: {
		name: "Preposition",
		info: [
			"PREPOSITIONS are ALWAYS used directly before a NOUN of some type, that's why they are call PRE-POSITIONS!",
		],
		de: {
			translations: ["from", "of"],
			word: "de",
			pos: "Preposition",
			info: [
				"De  is mostly used as OF in one of these three ideas:\nORIGIN: 'The people OF the north!', or\nPOSSESION: 'The house OF my parents', or\nMATERIAL: 'The sheet OF paper'",
				"ORIGIN: In english we say Sydney is a City in Australia, but Spanish would say Sydney is a city OF or DE Autralia. Other examples include: 'The birds of Africa', 'The wind from the cellar' 'My friend from Toronto', 'The largest cities of Columbia'",
				"POSSESION: English says 'My friends father' but spanish would say 'The father OF my friend!' other examples include: 'The cap of the bottle', 'the door of the house' and 'the hand of the writer'",
				"POSSESION2: English uses Contractions like 'The bottle's cap' but Spanish DOESN'T have this! You need to change the order and use DE",
				"MATERIAL: The Statue of Bronze. The Table of Stone. The horse of wood. ETC!",
			],
			audio:
				"https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=from&tl=es&total=1&idx=0&textlen=4",
		},
		a: {
			translations: ["to"],
			word: "a",
			pos: "Preposition",
			audio:
				"https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=to&tl=es&total=1&idx=0&textlen=2",
		},
	},
	advrb: {
		name: "Adverb",
		info: [
			"Adverbs can go anywhere in a sentence and mean all kinds of things!",
		],

		no: {
			translations: ["not", "no"],
			word: "no",
			pos: "Adverb",
			info: [
				"NO means NOT more-so than NO!",
				"Most Adverbs can go anywhere in a sentence and mean all kinds of things, but NO is far more strict, used very specifically to NEGATE a sentence.",
				"In English we can use contractions but they don't exist in Spanish, so we have to use NOT/NO!",
				"When translating English to Spanish and dealing with Contractions (Can't, Don't, Won't) Simply UNTIE the NOT! Turning Can't into Can not!",
				"In Spanish verb types like CAN BE have to stick together, and the adverb NO must go first!",
				"In Spanish DO HAVE isn't a real concept, we remove the word DO: I Don't Have that! = I no have that. 'Untie the Knot, and make the D Disappear!'",
				"There are no contraction in Spanish. For verb types like Can't: Untie the NOT, then move it to front: NO CAN BE!",
				"There are no contractions and also no concept for DO or DID (Do have, do say, do whatever) in Spanish. Untie the NOT, and make the Do DISAPPEAR!",
				"You might think NO should work like 'She can NO be' but adverbs don't work like this. Verb Structures like CAN BE have to stick together, and the adverb has to go first!",
			],
			audio:
				"https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=no&tl=es&total=1&idx=0&textlen=3",
		},
	},
	noun: {
		name: "Noun",
		info: [
			"FOOD TEST: Nouns in Spanish function as any WORD or PHRASE that can be substituted for the word FOOD!",
			"NOUNS aren't just PEOPLE, PLACES, or THINGS, they can also be ACTIONS! Such as: I enjoy LOSING MYSELF IN A NEW CITY",
			"EVERY Noun in Spanish is either Masculine or Feminine.",
		],
	},
	verb: {
		name: "Verb",
		info: [
			"EAT TEST: Verbs are any word that can be replaced by EAT, EATS or ATE!",
			"What about EATING? EATING or EATEN actually don't behave as verbs in the EAT test! EATING is my Favority activiy, EATING is the NOUN!",
			"Proper Spanish sentence can ONLY have ONE verb! (EATS EAT or ATE (NOT EATING/EATEN(Those are Nouns sorta!))), conjunctions allow combining phrases/sentences",
			"VERB PHRASES are where multiple verbs are functioning as only one verb! 'I want to have more!' looks like two verbs, WANT and HAVE but it counts as one! 'I will continue eating my food' Three verbs which counts as ONE! you could change it to 'I EAT my food'",
		],
	},

	dObj: {
		name: ["Direct Object", "Direct Obj"],
		info: [
			`If a pronoun is interchangeable with "him", it's probably a direct object pronoun. "We found it!" We found HIM`,
			`PLACEMENT: Whenever a DIRECT OBJECT PRONOUN occurs in Spanish, it ALWAYS occurs DIRECTLY before the verb. We found him = We HIM found, or We LO found.`,
			` Spanish speakers don't say "I hugged him." Instead, they say "I him hugged." And they don't say "I brought her." They say "I her brought." And instead of "I did it", they say "I it did."`,
			`When NO and LO are together: The Direct Object Pronoun is most important to be next to the verb.`,
		],
		lo: {
			translations: ["him", "it (M)"],
			word: "lo",
			pos: "Direct Object Pronoun",
			gender: "masculine",
		},
		la: {
			translations: ["her", "it (F)"],
			word: "la",
			pos: "Direct Object Pronoun",
			gender: "feminine",
		},
		me: {
			translation: ["me"],
			word: "me",
			pos: "Direct Object Pronoun",
		},
		te: {
			translation: ["you"],
			word: "te",
			pos: "Direct Object Pronoun",
		},
	},
}

export default spanishWords
