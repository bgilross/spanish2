const spanishWords = {
	idioms: [
		{
			idiom: "A 2:00",
			translations: "At 2:00",
		},
		{ idiom: "por eso", translations: ["because of that", "that's why"] },
		{ idiom: "para eso", translations: "intended for that" },
		{
			idiom: "para qué",
			translations: [
				"intended for what",
				"for what purposre",
				"for what intended use",
			],
		},
		{
			idiom: "por que",
			translations: ["because of what", "why"],
		},
		{
			idiom: "para que",
			translations: ["so that", "in order that"],
		},
	],

	artcl: {
		name: "Article",
		info: [
			"Articles are almost ALWAYS used directly before a NOUN",
			"Articles are really just part of the NOUN PHRASE",
		],
		el: {
			id: "artcl.el",
			translations: ["the (M)"],
			word: "el",
			audio:
				"https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=the&tl=es&total=1&idx=0&textlen=3",
			pos: "Article",
			gender: "masculine",
		},
		los: {
			id: "artcl.los",
			translations: ["the (M)"],
			word: "los",
			pos: "Article",
			gender: "masculine",
		},
		la: {
			id: "artcl.la",
			translations: ["the (F)"],
			word: "la",
			audio:
				"https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=the&tl=es&total=1&idx=0&textlen=3",
			pos: "Article",
			gender: "feminine",
		},
		las: {
			id: "artcl.las",
			translations: ["the (F)"],
			word: "las",
			pos: "Article",
			gender: "feminine",
		},
		un: {
			id: "artcl.un",
			translations: ["A (M)", "An (M)"],
			word: "un",
			pos: "Article",
			gender: "masculine",
		},
		una: {
			id: "artcl.una",
			translations: ["A (F)", "An (F)"],
			word: "una",
			pos: "Article",
			gender: "feminine",
		},
	},
	conj: {
		id: "conj",
		name: "Conjunction",
		info: [
			"CONJUNCTIONS don't pass the FOOD or the EAT test they are something New!",
			"CONJUNCTIONS are Connecting Words which hold a sentence, or even multiple sentences together!",
			"Proper Spanish sentence can ONLY have ONE verb! (EATS EAT or ATE (NOT EATING/EATEN(Those are Nouns sorta!))), conjunctions allow combining phrases/sentences",
		],
		que: {
			id: "conj.que",
			translations: ["that", "than"],
			word: "que",
			audio:
				"https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=that&tl=es&total=1&idx=0&textlen=4",
			pos: "Conjunction",
			info: [
				"Que is a CONJUNCTION meaning 'that', and the NUMBER 1 Word in Spanish, but English's THAT is not even in the Top 5, why is that? In Spanish if you CAN use QUE as a connector then you MUST. Where in English we can say things like 'We hope we get there soon!' In spanish you would have to say 'We hope THAT we get there soon!'",
				"If you CAN add QUE / that in Spanish as a connector then you HAVE to!",
				"'Para que' is an idiom which means 'So that' or 'In order that'",
				"Que can also mean than, in the sense of 'He is taller THAN his brother'",
			],
		},
		y: {
			id: "conj.y",
			translations: ["and"],
			word: "y",
			audio:
				"https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=and&tl=es&total=1&idx=0&textlen=3",
			pos: "Conjunction",
			info: ["Y is another CONJUNCTION and is a direct translation of AND"],
		},
	},

	pron: {
		id: "pron",
		name: "Pronoun",
		info: ["PRONOUNS are INTERCHANGEABLE with NOUNS!"],
		eso: {
			id: "pron.eso",
			translations: ["that"],
			word: "eso",
			audio:
				"https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=that&tl=es&total=1&idx=0&textlen=4",
			pos: "Pronoun",
			info: [
				"likely the MOST VERSATILE word in Spanish! It is interchangeable with any NOUN or NOUN PHRASE, it can also represent actions and concepts",
			],
		},
		que: {
			id: "pron.que",
			translations: ["what"],
			word: "que",
			info: [
				"Qué can mean HOW in the sense of HOW lucky, would be Qué Lucky! or What Lucky!/What Luck!",
				"Para qué is an idiom which means 'So that' or 'In order that'",
			],
		},
	},
	prep: {
		id: "prep",
		name: "Preposition",
		info: [
			"PREPOSITIONS are ALWAYS used directly before a NOUN of some type, that's why they are call PRE-POSITIONS!",
			"As a rule Prepositions DON'T translate one-to-one between Spanish and English",
		],
		de: {
			id: "prep.de",
			translations: ["from", "of"],
			word: "de",
			pos: "Preposition",
			info: [
				"De  is mostly used as OF in one of these three ideas:\nORIGIN: 'The people OF the north!', or\nPOSSESION: 'The house OF my parents', or\nMATERIAL: 'The sheet OF paper'",
				"ORIGIN: In english we say Sydney is a City in Australia, but Spanish would say Sydney is a city OF or DE Autralia. Other examples include: 'The birds of Africa', 'The wind from the cellar' 'My friend from Toronto', 'The largest cities of Columbia'",
				"POSSESION: English says 'My friends father' but spanish would say 'The father OF my friend!' other examples include: 'The cap of the bottle', 'the door of the house' and 'the hand of the writer'",
				"POSSESION2: English uses Contractions like 'The bottle's cap' but Spanish DOESN'T have this! You need to change the order and use DE",
				"MATERIAL: The Statue DE Bronze. The Table DE Stone. The horse DE wood. etc!",
			],
			audio:
				"https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=from&tl=es&total=1&idx=0&textlen=4",
		},
		a: {
			id: "prep.a",
			translations: ["to"],
			word: "a",
			pos: "Preposition",
			audio:
				"https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=to&tl=es&total=1&idx=0&textlen=2",
			info: [
				"A and Time: In Spanish we don't say AT a time, we say TO a time, `The event is A four o'Clock`",
			],
		},
		con: {
			id: "prep.con",
			translations: ["with"],
			word: "con",
			pos: "Preposition",
		},
		en: {
			id: "prep.en",
			translations: ["at", "on", "in"],
			word: "en",
			pos: "Preposition",
			info: [
				"If you are EN the chair, you are ON the chair, but if you are EN the table, you are probably AT the table not ON it!",
			],
		},
		para: {
			id: "prep.para",
			translations: ["for"],
			word: "para",
			pos: "Preposition",
			info: [
				`PARA roughly means FOR, implying some sort of INTENTION, or pointing at something. A 'gift' is PARA or 'intended for' someone`,
				`Visualize PARA as an arrow, pointint at something specific, in a very direct, maybe even expectant way!`,
				"PARA this Evening means: Do it BY this evening! We are emphasizing a point, meaking a due date",
				"PARA ESO means `Intended for that`",
				"PARA QUE` means `intended for what`, or `for what intended use, for what purpose` ",
				"'Para que' is an idiom which means 'So that' or 'In order that'",
			],
		},
		por: {
			id: "prep.por",
			translations: [
				"by",
				"because of",
				"along",
				"around",
				"near",
				"nearby",
				"during",
				"for",
			],

			word: "por",
			pos: "Preposition",
			info: [
				`POR means something like BY, but has so many uses that you shouldn't think of it as a single translation, more of a 3D concept!`,
				`Picture a Stone Fountain in the forest POURING water from the top. The water is being produced BY/POR the fountain.`,
				`DE seems like a replacement for POR, but POR implies CREATION or CAUSE as opposed to simply origin.`,
				`Water produced BY/POR the fountain also exists BECAUSE OF the fountain, or POR the fountain!`,
				`POR is associated with DEEP questions, such as BECAUSE OF WHY something is the case`,
				`Water is pooling AROUND or NEARBY the fountain also can mean POR`,
				`The water is running all ALONG/POR the sides of the fountain`,
				`POR and the FOUNTAIN: always remember the image of flowing water produced BY the fountain, AROUND it, ALONG side, NEARBY it, and existing BECASUE of it!`,
				"POR this Evening means: DURING the evening, in a general way, AROUND this evening.",
				"POR ESO mean 'Becasue of that', or 'That's Why'",
				"POR qué' means 'Because of what', or 'Why'",
			],
		},
	},
	advrb: {
		id: "advrb",
		name: "Adverb",
		info: [
			"Adverbs can go anywhere in a sentence and mean all kinds of things!",
		],

		no: {
			id: "advrb.no",
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
				"There are no contraction in Spanish. For verb types like Can't: Untie the NOT (can't be = can not be), then move not/NO to the front: NO CAN BE!",
				"There are no contractions and no concept for DO or DID in Spanish (Do have, do say, do whatever). \nUntie the NOT (don't want = do not want), and make the Do DISAPPEAR! (no want)",
				"You might think NO should work like 'She can NO be' but adverbs don't work like this. Verb Structures like CAN BE have to stick together, and the adverb has to go first!",
			],
			audio:
				"https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=no&tl=es&total=1&idx=0&textlen=3",
		},
	},
	noun: {
		id: "noun",
		name: "Noun",
		info: [
			"FOOD TEST: Nouns in Spanish are any WORD or PHRASE that can be substituted for the word FOOD! I enjoy FOOD!",
			`NOUNS aren't just PEOPLE, PLACES, or THINGS, they can also be ACTIONS! Such as: \n'I enjoy losing myself in a new city'. \n'losing myself in a new city' is the NOUN PHRASE!`,
			"EVERY Noun in Spanish is either Masculine or Feminine.",
		],
	},
	verb: {
		id: "verb",
		name: "Verb",
		info: [
			"EAT TEST: Verbs are any word that can be replaced by EAT, EATS or ATE! I EAT food!",
			"What about EATING? EATING or EATEN actually don't behave as verbs in the EAT test! EATING is my Favority activiy, EATING is the NOUN! IS is the VERB!",
			"Proper Spanish sentence can ONLY have ONE verb! (EATS EAT or ATE (NOT EATING/EATEN(Those function as NOUNS))), \nCONJUNCTIONS allow combining phrases/sentences",
			"VERB PHRASES are where multiple verbs are functioning as only one verb! 'I want to have more!' looks like two verbs, WANT and HAVE but it counts as one! 'I will continue eating my food' Three verbs which counts as ONE! you could change it to 'I EAT my food'",
			"Verbs are the absolute heart of Spanish sentences, and what makes them so different from English sentences.",
			"You can make a proper Spanish sentence without any nouns or anything even functioning like a noun! 'It's Impossible' in Spanish would be 'ES/is Impossible!'",
			"Remember that Verbs are not strictly just 'action words'. Consider: 'Food is my favorite thing' There is no action here, but IS is the Verb. What about 'Eating is my favorite' EATING is an action, but it's actually functioning as a NOUN in this sentence.",
			"Sometimes ACTIONS are verbs and sometimes not, also sometimes VERBS are ACTIONS, but not always!",
			"In Spanish a verb provides the core meaning of the sentence, and usually serve as the 'Mortar' between the bricks of sentences.",
			"Verbs have different forms called conjugations which depend on the person, plurality, and tense of the verb.",
			"This is because verbs aren't really just one words, but a whole family of words, all meaning the same thing, but appearing in different ways depending on the context.",
			'For the majority of the Spanish speaking world there are five types of PEOPLE associated with any verb. "I", "YOU", "HE/SHE/IT", "WE", and "THEY"',
		],

		ser: {
			id: "verb.ser",
			translations: ["to be, is, am, are, was, will, etc.", "ser"],
			word: "ser",
			pos: "Verb",
			info: [],

			present: {
				soy: {
					id: "verb.ser.present.soy",
					word: "soy",
					translations: ["am", "I am"],
					pos: "Verb",
					tense: "Present",
					person: "first",
				},
				eres: {
					id: "verb.ser.present.eres",
					word: "eres",
					translations: ["are", "you are"],
					pos: "Verb",
					tense: "Present",
					person: "second",
				},
				es: {
					id: "verb.ser.past.es",
					word: "es",
					translations: ["is", "He/she/it is"],
					pos: "Verb",
					tense: "Present",
					person: "third",
					info: [
						"ES is the most common verb, roughly meaning IS, but specifically ES is used to describe 'WHAT something IS' it's not an ACTION word but a 'LINKING VERB' it doesn't mean much on it's own but hold sentences together.",
						"Be careful! ES doesn't translate directly to the word 'IS'. In English we use IS to mean all sorts of things, 'He IS a doctor' 'It is raining hard' 'She is here' Spanish is more specific.",
						"In english IS can describe WHO or WHAT something is (he IS a doctor), also an ongoing activity (It IS raining) and also WHERE someone is 'She is here'. ES can ONLY be used for the first example, WHAT something is, you can't use ES to describe WHERE someone is, or HOW they are doing, or WHAT action they are doing.",
					],
				},
				somos: {
					id: "verb.ser.present.somos",
					word: "somos",
					translations: ["are", "we are"],
					pos: "Verb",
					tense: "Present",
					person: "first plural",
				},
				son: {
					id: "verb.ser.present.son",
					word: "son",
					translations: ["are", "they are"],
					pos: "Verb",
					tense: "Present",
					person: "third plural",
				},
			},
		},
	},

	dObj: {
		id: "dObj",
		name: ["Direct Object", "Direct Obj"],
		info: [
			`If a pronoun is interchangeable with "him", it's probably a direct object pronoun. "We found it!" We found HIM`,
			`PLACEMENT: Whenever a DIRECT OBJECT PRONOUN occurs in Spanish, it ALWAYS occurs DIRECTLY before the verb. We found him = We HIM found, or We LO found.`,
			` Spanish speakers don't say "I hugged him." Instead, they say "I him hugged." And they don't say "I brought her." They say "I her brought." And instead of "I did it", they say "I it did."`,
			`When NO and LO are together: The Direct Object Pronoun is most important to be next to the verb.`,
		],
		lo: {
			id: "dObj.lo",

			translations: ["him", "it (M)"],
			word: "lo",
			pos: "Direct Object Pronoun",
			gender: "masculine",
		},
		los: {
			id: "dObj.los",
			translations: ["them (M)"],
			word: "los",
			pos: "Direct Object Pronoun",
			gender: "masculine",
		},
		la: {
			id: "dObj.la",
			translations: ["her", "it (F)"],
			word: "la",
			pos: "Direct Object Pronoun",
			gender: "feminine",
		},
		las: {
			id: "dObj.las",
			translations: ["them (F)"],
			word: "las",
			pos: "Direct Object Pronoun",
			gender: "feminine",
		},
		me: {
			id: "dObj.me",
			translations: ["me"],
			word: "me",
			pos: "Direct Object Pronoun",
		},
		te: {
			id: "dObj.te",
			translations: ["you"],
			word: "te",
			pos: "Direct Object Pronoun",
		},
	},
}

export default spanishWords
