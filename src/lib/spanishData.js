// maybe change to prounoun.eso or conjunction.y conjuction.que
"use client"

import { data } from "autoprefixer"

const words = {
	conj: {
		info: [
			"CONJUNCTIONS don't pass the FOOD or the EAT test they are something New!",
			"CONJUNCTIONS are Connecting Words which hold a sentence, or even multiple sentences together!",
			"Proper Spanish entence can ONLY have ONE verb! (EATS EAT or ATE (NOT EATING/EATEN(Those are Nouns sorta!))), conjunctions allow combining phrases/sentences",
		],
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
			info: ["Y is a direct translation of AND"],
		},
	},

	pron: {
		info: ["PRONOUNS are INTERCHANGEABLE with NOUNS!"],
		eso: {
			translations: ["that"],
			word: "eso",
			audio:
				"https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=that&tl=es&total=1&idx=0&textlen=4",
			pos: "pronoun",
			info: [
				"ESO is likely the MOST VERSATILE word in Spanish! It is interchangeable with any NOUN or NOUN PHRASE, it can also represent actions and concepts",
			],
		},
	},
	prep: {
		info: [
			"PREPOSITIONS are ALWAYS used directly before a NOUN of some type, that's why they are call PRE-POSITIONS!",
		],
		de: {
			translations: ["from", "of"],
			word: "de",
			pos: "preposition",
			info: [
				"De  is mostly used as OF as in one of these three ideas:\nORIGIN: 'The people OF the north!', or\nPOSSESION: 'The house OF my parents', or\nMATERIAL: 'The sheet OF paper'",
				"ORIGIN: In english we say Sydney is a City in Australia, but Spanish would say Sydney is a city OF or DE Autralia. Other examples include: 'The birds of Africa', 'The wind from the cellar' 'My friend from Toronto', 'The largest cities of Columbia'",
				"POSSESION: English says 'My friends father' but spanish would say 'The father OF my friend!' other examples include: 'The cap of the bottle', 'the door of the house' and 'the hand of the writer'",
				"POSSESTION2: English uses Contractions like 'The bottle's cap' but Spanish DOESN'T have this! You need to change the order and use DE",
				"MATERIAL: The Statue of Bronze. The Table of Stone. The horse of wood. ETC!",
			],
			audio:
				"https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=from&tl=es&total=1&idx=0&textlen=4",
		},
		a: {
			translations: ["to"],
			word: "a",
			pos: "preposition",
			audio:
				"https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=to&tl=es&total=1&idx=0&textlen=2",
		},
	},
	advrb: {
		info: [
			"Adverbs can go anywhere in a sentence and mean all kinds of things!",
		],

		no: {
			translations: ["not", "no"],
			word: "no",
			pos: "adverb",
			info: [
				"NO means NOT moreso than NO!",
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
		info: [
			"FOOD TEST: Nouns in Spanish function as any WORD or PHRASE that can be substituted for the word FOOD!",
			"NOUNS aren't just PEOPLE, PLACES, or THINGS, they can also be ACTIONS! Such as: I enjoy LOSING MYSELF IN A NEW CITY",
		],
	},
	verb: {
		info: [
			"EAT TEST: Verbs are any word that can be replaced by EAT, EATS or ATE!",
			"What about EATING? EATING or EATEN actually don't behave as verbs in the EAT test! EATING is my Favority activiy, EATING is the NOUN!",
			"Proper Spanish sentence can ONLY have ONE verb! (EATS EAT or ATE (NOT EATING/EATEN(Those are Nouns sorta!))), conjunctions allow combining phrases/sentences",
			"VERB PHRASES are where multiple verbs are functioning as only one verb! 'I want to have more!' looks like two verbs, WANT and HAVE but it counts as one! 'I will continue eating my food' Three verbs which counts as ONE! you could change it to 'I EAT my food'",
		],
	},
}

const { conj, pron, prep, advrb, noun, verb } = words

const spanishData = {
	lessons: {
		3: {
			lesson: 3,
			name: "Lesson 3",
			details: "Conjunctions (Y and QUE) and ESO",
			info: [
				noun.info[1],
				noun.info[0],
				verb.info[0],
				verb.info[1],
				verb.info[2],
				conj.info[0],
				conj.info[1],
				conj.que.info[0],
				conj.que.info[1],
				verb.info[3],
				pron.eso.info[0],
				conj.y.info[0],
			],
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
					reference: { que: [conj.que.info[1]] },
					sentence: "We said that was fine",
					translation: "We said QUE ESO was fine",
					data: [
						{
							phrase: "We said",
							translation: conj.que,
							phraseTranslation: "We said QUE",
							reference: { que: [conj.que.info[1]] },
						},
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
					sentence: "People say that it's good",
					translation: "People say QUE it is good",
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
					setence: "We said that that was fine!",
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
					reference: [conj.que.info[1]],
					sentence: "I told them that was in the way",
					translation: "I told them QUE ESO was in the way",
					data: [
						{
							phrase: "I told them",
							translation: conj.que,
							phraseTranslation: "I told them QUE",
						},
						{ word: "that", translation: pron.eso },
						{ word: "was" },
						{ word: "in" },
						{ word: "the" },
						{ word: "way" },
					],
				},
				{
					id: 7,
					reference: [conj.que.info[1]],
					sentence: "I hope he gets that soon",
					translation: "I hope QUE he gets ESO soon",
					data: [
						{
							phrase: "I hope",
							translation: conj.que,
							phraseTranslation: "I hope QUE",
						},
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
					reference: [conj.que.info[1]],
					sentence: "He said they said that!",
					translation: "He said QUE they said ESO!",
					data: [
						{
							phrase: "He said",
							translation: conj.que,
							phraseTranslation: "He said QUE",
						},
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
				{
					id: 12,
					sentence: "That isn't my favorite thing",
					translation: "ESO isn't my favorite thing",
					data: [
						{ word: "That", translation: pron.eso },
						{ word: "isn't my favorite thing" },
					],
				},
				{
					id: 13,
					sentence: "I told him that we arrived",
					translation: "I told him QUE we arrived",
					data: [
						{ phrase: "I told him" },
						{ word: "that", translation: conj.que },
						{ word: "we" },
						{ word: "arrived" },
					],
				},
				{
					id: 14,
					sentence: "I hope that you have a nice day",
					translation: "I hope QUE you have a nice day",
					data: [
						{ phrase: "I hope" },
						{ word: "that", translation: conj.que },
						{ word: "you" },
						{ word: "have" },
						{ word: "a" },
						{ word: "nice" },
						{ word: "day" },
					],
				},
				{
					id: 15,
					sentence: "We want that as soon as possible",
					translation: "We want ESO as soon as possible",
					data: [
						{ word: "We" },
						{ word: "want" },
						{ word: "that", translation: pron.eso },
						{ word: "as soon as possible" },
					],
				},
				{
					id: 16,
					sentence: "They told me that that was impossible",
					translation: "They told me QUE ESO was impossible",
					data: [
						{ word: "They" },
						{ word: "told" },
						{ word: "me" },
						{ word: "that", translation: conj.que },
						{ word: "that", translation: pron.eso },
						{ word: "was" },
						{ word: "impossible" },
					],
				},
				{
					id: 17,
					sentence: "I dreamed that I was back in highschool",
					translation: "I dreamed QUE I was back in highschool",
					data: [
						{ word: "I" },
						{ word: "dreamed" },
						{ word: "that", translation: conj.que },
						{ word: "I" },
						{ word: "was" },
						{ word: "back" },
						{ word: "in" },
						{ word: "highschool" },
					],
				},
				{
					id: 18,
					reference: [conj.que.info[1]],
					sentence: "I hope he told you he was here",
					translation: "I hope QUE he told you QUE he was here",
					data: [
						{
							phrase: "I hope",
							translation: conj.que,
							phraseTranslation: "I hope QUE",
						},
						{
							phrase: "he told you",
							translation: conj.que,
							phraseTranslation: "he told you QUE",
						},
						{ phrase: "he was here" },
					],
				},
			],
		},
		4: {
			lesson: 4,
			name: "Lesson 4",
			details: "Prepositions: DE and A, Adverb NO ",
			info: [
				"De and A are very common prepositions, meaning of or from, and to",
				prep.info[0],
				prep.de.info[0],
				"No is an ADVERB",
				advrb.no.info[0],
				advrb.no.info[1],
				advrb.no.info[2],
				advrb.no.info[3],
				advrb.no.info[8],
				advrb.no.info[5],
			],
			wordBank: [advrb.no, prep.de, prep.a],
			sentences: [
				{
					id: 1,
					reference: [advrb.no.info[6]],
					sentence: "She can't be at the house",
					translation: "She NO can be at the house",
					data: [
						{ word: "She" },
						{
							phrase: "Can't be",
							translation: advrb.no,
							phraseTranslation: "NO can be",
						},
						{ word: "at" },
						{ word: "the" },
						{ word: "house" },
					],
				},
				{
					id: 2,
					reference: { no: [advrb.no.info[7]], que: [conj.que.info[1]] },
					sentence: "Don't say you're not here",
					translation: "NO say QUE you NO are here",
					data: [
						{
							phrase: "Don't say",
							translation: [advrb.no, conj.que],
							phraseTranslation: "NO say QUE",
							reference: { no: [advrb.no.info[7]], que: [conj.que.info[1]] },
						},
						{
							phrase: "you're not",
							translation: advrb.no,
							phraseTranslation: "you NO are",
						},
						{ word: "here" },
					],
				},
				{
					id: 3,
					reference: [advrb.no.info[7]],
					sentence: "We didn't go to this store",
					translation: "We NO went A this store",
					data: [
						{ word: "We" },
						{
							phrase: "didn't go",
							translation: advrb.no,
							phraseTranslation: "NO went",
						},
						{ word: "to", translation: prep.a },
						{ word: "this" },
						{ word: "store" },
					],
				},
				{
					id: 4,
					reference: [advrb.no.info[6]],
					sentence: "She won't send that to her sister",
					translation: "She NO will send ESO A her sister",
					data: [
						{ word: "She" },
						{
							phrase: "won't send",
							translation: advrb.no,
							phraseTranslation: "NO will send",
						},
						{ word: "that", translation: pron.eso },
						{ word: "to", translation: prep.a },
						{ word: "her" },
						{ word: "sister" },
					],
				},
				{
					id: 5,
					sentence: "Are you tired of doing that?",
					translation: "Are you tired DE doing QUE ESO?",
					data: [
						{ word: "Are" },
						{ word: "you" },
						{ word: "tired" },
						{ word: "of", translation: prep.de },
						{ word: "doing" },
						{ word: "that?", translation: pron.eso },
					],
				},
				{
					id: 6,
					reference: [advrb.no.info[6]],
					sentence: "This isn't your stuff",
					translation: "This NO is your stuff",
					data: [
						{ word: "This" },
						{
							phrase: "isn't",
							translation: advrb.no,
							phraseTranslation: "NO is",
						},
						{ word: "your" },
						{ word: "stuff" },
					],
				},
				{
					id: 7,
					reference: [advrb.no.info[6]],
					sentence: "We can't do that",
					translation: "We NO can do ESO",
					data: [
						{ word: "We" },
						{
							phrase: "can't do",
							translation: advrb.no,
							phraseTranslation: "NO can do",
						},
						{ word: "that", translation: pron.eso },
					],
				},
				{
					id: 8,
					sentence: "He and I drove from this place",
					translation: "He Y I drove DE this place",
					data: [
						{ word: "He" },
						{ word: "and", translation: conj.y },
						{ word: "I" },
						{ word: "drove" },
						{ word: "from", translation: prep.de },
						{ word: "this" },
						{ word: "place" },
					],
				},
				{
					id: 9,
					reference: [advrb.no.info[6]],
					sentence: "I can't have more of that",
					translation: "I NO can have more of ESO",
					data: [
						{ word: "I" },
						{
							phrase: "can't have",
							translation: advrb.no,
							phraseTranslation: "NO can have",
						},
						{ word: "more" },
						{ word: "of" },
						{ word: "that", translation: pron.eso },
					],
				},
				{
					id: 10,
					sentence: "My friend was from another state",
					translation: "My friend was DE another state",
					data: [
						{ word: "My" },
						{ word: "friend" },
						{ word: "was" },
						{ word: "from", translation: prep.de },
						{ word: "another" },
						{ word: "state" },
					],
				},
				{
					id: 11,
					reference: [advrb.no.info[6]],
					sentence: "We won't say you have that",
					translation: "We NO will say QUE you have ESO",
					data: [
						{ word: "We" },
						{
							phrase: "won't say",
							translation: [advrb.no, conj.que],
							phraseTranslation: "NO will say QUE",
						},
						{ word: "you" },
						{ word: "have" },
						{ word: "that", translation: pron.eso },
					],
				},
				{
					id: 12,
					reference: [advrb.no.info[7]],
					sentence: "She doesn't have that",
					translation: "She NO has ESO",
					data: [
						{ word: "She" },
						{
							phrase: "doesn't have",
							translation: advrb.no,
							phraseTranslation: "NO has",
						},
						{ word: "that", translation: pron.eso },
					],
				},
				{
					id: 13,
					reference: [advrb.no.info[7], conj.que.info[1]],
					sentence: "This doesn't tell us that is done",
					translation: "This NO tells us QUE ESO is done",
					data: [
						{ word: "This" },
						{
							phrase: "doesn't tell",
							translation: advrb.no,
							phraseTranslation: "NO tells",
						},
						{
							phrase: "us that",
							translation: conj.que,
							phraseTranslation: "us QUE",
						},
						{ word: "is" },
						{ word: "done" },
					],
				},
				{
					id: 14,
					sentence: "Give my brother more of that",
					translation: "Give my brother more DE ESO",
					data: [
						{ word: "Give" },
						{ word: "my" },
						{ word: "brother" },
						{ word: "more" },
						{ word: "of", translation: prep.de },
						{ word: "that", translation: pron.eso },
					],
				},
				{
					id: 15,
					sentence: "It came down from the mountain",
					translation: "It came down DE the mountain",
					data: [
						{ word: "It" },
						{ word: "came" },
						{ word: "down" },
						{ word: "from", translation: prep.de },
						{ word: "the" },
						{ word: "mountain" },
					],
				},
				{
					id: 16,
					sentence: "I'm tired of waiting around like this",
					translation: "I'm tired DE waiting around like this",
					data: [
						{ word: "I'm tired" },
						{ word: "of", translation: prep.de },
						{ phrase: "waiting around like this" },
					],
				},
				{
					id: 17,
					sentence: "The girl went to another country",
					translation: "The girl went A another country",
					data: [
						{ word: "The girl went" },
						{ word: "to", translation: prep.a },
						{ word: "another" },
						{ word: "country" },
					],
				},
				{
					id: 18,
					sentence: "I want to give that to my brother",
					translation: "I want to give ESO A my brother",
					data: [
						{ word: "I" },
						{ word: "want" },
						{ word: "to" },
						{ word: "give" },
						{ word: "that", translation: pron.eso },
						{ word: "to", translation: prep.a },
						{ word: "my" },
						{ word: "brother" },
					],
				},
				{
					id: 19,
					sentence: "Mark goes from New York to Houston",
					translation: "Mark goes DE New York A Houston",
					data: [
						{ word: "Mark" },
						{ word: "goes" },
						{ word: "from", translation: prep.de },
						{ word: "New" },
						{ word: "York" },
						{ word: "to", translation: prep.a },
						{ word: "Houston" },
					],
				},
				{
					id: 20,
					reference: [advrb.no.info[6]],
					sentence: "This isn't my house",
					translation: "This NO is my house",
					data: [
						{ word: "This" },
						{
							phrase: "isn't",
							translation: advrb.no,
							phraseTranslation: "NO is",
						},
						{ word: "my" },
						{ word: "house" },
					],
				},
				{
					id: 21,
					reference: [advrb.no.info[6]],
					sentence: "She can't walk very fast",
					translation: "She NO can walk very fast",
					data: [
						{ word: "She" },
						{
							phrase: "can't",
							translation: advrb.no,
							phraseTranslation: "NO can",
						},
						{ word: "walk" },
						{ word: "very" },
						{ word: "fast" },
					],
				},
				{
					id: 22,
					reference: [advrb.no.info[7]],
					sentence: "They don't see why",
					translation: "They NO see why",
					data: [
						{ word: "They" },
						{
							phrase: "don't see",
							translation: advrb.no,
							phraseTranslation: "NO see",
						},
						{ word: "why" },
					],
				},
				{
					id: 23,
					reference: [advrb.no.info[6]],
					sentence: "That won't matter",
					translation: "ESO NO will matter",
					data: [
						{ word: "That", translation: pron.eso },
						{
							phrase: "won't mattter",
							translation: advrb.no,
							phraseTranslation: "NO will matter",
						},
					],
				},
				{
					id: 24,
					reference: [advrb.no.info[7]],
					sentence: "This doesn't tell us much",
					translation: "This NO tells us much",
					data: [
						{ word: "This" },
						{
							phrase: "doesn't tell",
							translation: advrb.no,
							phraseTranslation: "NO tells",
						},
						{ word: "us" },
						{ word: "much" },
					],
				},
				{
					id: 25,
					reference: [advrb.no.info[7]],
					sentence: "He didn't know",
					translation: "He NO knew",
					data: [
						{ word: "He" },
						{
							phrase: "didn't know",
							translation: advrb.no,
							phraseTranslation: "NO knew",
						},
					],
				},
			],
		},
		5: {
			lesson: 5,
			name: "Lesson 5",
			details: "Three common uses of DE!",
			info: [
				"From or Of only covers about half of the uses of DE! Because prepositions are notorious for use in quirky context. There are THREE main uses of DE as OF:",
				prep.de.info[1],
				prep.de.info[2],
				prep.de.info[3],
				prep.de.info[4],
			],
			wordBank: [],
			sentences: [
				{
					id: 1,
					reference: [prep.de.info[2], prep.de.info[4]],
					sentence: "It's Samuel's water bottle!",
					translation: "It's the bottle DE water DE Samuel",
					data: [
						{ word: "It's" },
						{
							phrase: "Samuel's water bottle",
							phraseTranslation: "the bottle DE water DE Samuel",
							translation: [prep.de, prep.de],
						},
					],
				},
				{
					id: 2,
					reference: [advrb.no.info[6], conj.que.info[1]],
					sentence: "You won't tell me they did it?",
					translation: "You NO will tell QUE they did it?",
					data: [
						{ word: "You" },
						{
							phrase: "won't tell",
							translation: advrb.no,
							phraseTranslation: "NO will tell",
						},
						{ word: "me" },
						{
							phrase: "they did it?",
							phraseTranslation: "QUE they did it",
							translation: conj.que,
						},
					],
				},
				{
					id: 3,
					reference: [advrb.no.info[7], prep.de.info[2], prep.de.info[4]],
					sentence: "Don't touch John's wine glass",
					translation: "NO touch the glass DE wine DE John",
					data: [
						{
							phrase: "Don't touch",
							translation: advrb.no,
							phraseTranslation: "NO touch",
						},
						{
							phrase: "John's wine glass",
							phraseTranslation: "the glass DE wine DE John",
							translation: prep.de,
						},
					],
				},
				{
					id: 4,
					sentence: "They took it to the lady from Italy",
					translation: "They took it A the lady DE Italy",
					data: [
						{ phrase: "They took it" },
						{ word: "to", translation: prep.a },
						{ phrase: "the lady" },
						{ word: "from", translation: prep.de },
						{ word: "Italy" },
					],
				},
				{
					id: 5,
					reference: [advrb.no.info[6]],
					sentence: "This can't be from from Spain!",
					translation: "This NO can be DE Spain!",
					data: [
						{ word: "This" },
						{
							phrase: "can't be",
							translation: advrb.no,
							phraseTranslation: "NO can be",
						},
						{ word: "from", translation: prep.de },
						{ word: "Spain!" },
					],
				},
				{
					id: 6,
					reference: [conj.que.info[1], prep.de.info[4]],
					sentence: "I saw that it was a ceramic mug",
					translation: "I saw QUE it was a mug DE ceramic",
					data: [
						{ word: "I" },
						{ word: "saw" },
						{
							word: "that",
							translation: conj.que,
						},
						{ word: "it was" },
						{ word: "a" },
						{
							phrase: "ceramic mug",
							phraseTranslation: "mug DE ceramic",
							translation: prep.de,
						},
					],
				},
				{
					id: 7,
					reference: [conj.que.info[1]],
					sentence: "You hoped she and I were together",
					translation: "You hoped QUE she Y I were together",
					data: [
						{
							phrase: "You hoped",
							phraseTranslation: "You hoped QUE",
							translation: conj.que,
						},
						{ word: "she" },
						{ word: "and", translation: conj.y },
						{ word: "I" },
						{ word: "were" },
						{ word: "together" },
					],
				},
				{
					id: 8,
					reference: [advrb.no.info[6]],
					sentence: "I said that it isn't here",
					translation: "I said QUE it NO is here",
					data: [
						{ word: "I" },
						{ word: "said" },
						{
							word: "that",
							translation: conj.que,
						},
						{ word: "it" },
						{
							phrase: "isn't here",
							phraseTranslation: "NO is here",
							translation: advrb.no,
						},
					],
				},
				{
					id: 9,
					reference: [conj.que.info[1], advrb.no.info[6]],
					sentence: "She hoped we woudn't go to Canada",
					translation: "She hoped QUE we NO would go A Canada",
					data: [
						{
							phrase: "She hoped",
							translation: conj.que,
							phraseTranslation: "She hoped QUE",
						},
						{ word: "we" },
						{
							phrase: "woudn't go",
							phraseTranslation: "NO would go",
							translation: advrb.no,
						},
						{ word: "to", translation: prep.a },
						{ word: "Canada" },
					],
				},
				{
					id: 10,
					reference: [advrb.no.info[6]],
					sentence: "I couldn't believe that!",
					translation: "I NO could believe ESO!",
					data: [
						{ word: "I" },
						{
							phrase: "couldn't believe",
							translation: advrb.no,
							phraseTranslation: "NO could believe",
						},
						{ word: "that!", translation: pron.eso },
					],
				},
				{
					id: 11,
					reference: [prep.de.info[4], prep.de.info[2]],
					sentence: "It was Maria's plastic chair",
					translation: "It was the chair DE plastic DE Maria",
					data: [
						{ word: "It" },
						{ word: "was" },
						{
							phrase: "Maria's plastic chair",
							phraseTranslation: "the chair DE plastic DE Maria",
							translation: prep.de,
						},
					],
				},
				{
					id: 12,
					reference: [conj.que.info[1]],
					sentence: "I think he ran from the house",
					translation: "I think QUE he ran DE the house",
					data: [
						{
							phrase: "I think",
							translation: conj.que,
							phraseTranslation: "I think QUE",
						},
						{ word: "he ran" },

						{ word: "from", translation: prep.de },
						{ word: "the house" },
					],
				},
				{
					id: 13,
					reference: [advrb.no.info[7]],
					sentence: "That doesn't matter.",
					translation: "ESO NO matters.",
					data: [
						{ word: "That" },
						{
							phrase: "doesn't matter.",
							phraseTranslation: "NO matters.",
							translation: advrb.no,
						},
					],
				},
				{
					id: 14,
					sentence: "That came from this window",
					translation: "ESO came DE this window",
					data: [
						{ word: "That came" },
						{ word: "from", translation: prep.de },
						{ word: "this window" },
					],
				},
				{
					id: 15,
					reference: [advrb.no.info[7]],
					sentence: "She didn't care and I knew it",
					translation: "She NO cared Y I knew it",
					data: [
						{
							phrase: "She didn't care",
							phraseTranslation: "She NO cared",
							translation: advrb.no,
						},
						{ word: "and", translation: conj.y },
						{ word: "I knew it" },
					],
				},
				{
					id: 16,
					sentence: "The birds of Africa",
					translation: "The birds DE Africa",
					data: [
						{ word: "The" },
						{ word: "birds" },
						{ word: "of", translation: prep.de },
						{ word: "Africa" },
					],
				},
				{
					id: 17,
					sentence: "The special wine from the cellar",
					translation: "The special wine DE the cellar",
					data: [
						{ word: "The" },
						{ word: "special" },
						{ word: "wine" },
						{ word: "from", translation: prep.de },
						{ word: "the cellar" },
					],
				},
				{
					id: 18,
					sentence: "My friend from Toronto",
					translation: "My friend DE Toronto",
					data: [
						{ word: "My friend" },
						{ word: "from", translation: prep.de },
						{ word: "Toronto" },
					],
				},
				{
					id: 19,
					sentence: "The largest cities of Columbia",
					translation: "The largest cities DE Columbia",
					data: [
						{ word: "The" },
						{ word: "largest" },
						{ word: "cities" },
						{ word: "of", translation: prep.de },
						{ word: "Columbia" },
					],
				},
				{
					id: 20,
					sentence: "The pilot's schedule",
					translation: "The schedule DE the pilot",
					data: [
						{ word: "The" },
						{
							phrase: "pilot's schedule",
							translation: prep.de,
							phraseTranslation: "schedule DE the pilot",
						},
					],
				},
				{
					id: 21,
					sentence: "The rich smell of the food",
					translation: "The rich smell DE the food",
					data: [
						{ word: "The" },
						{ word: "rich" },
						{ word: "smell" },
						{ word: "of", translation: prep.de },
						{ word: "the food" },
					],
				},
				{
					id: 22,
					reference: [prep.de.info[3]],
					sentence: "Your brother's foot",
					translation: "The foot DE your brother",
					data: [
						{
							phrase: "Your brother's foot",
							translation: prep.de,
							phraseTranslation: "The foot DE your brother",
						},
					],
				},
				{
					id: 23,
					reference: [prep.de.info[2], prep.de.info[3]],
					sentence: "The doctor's sister's nose",
					translation: "The nose DE the sister DE the doctor",
					data: [
						{
							phrase: "The doctor's sister's nose",
							translation: prep.de,
							phraseTranslation: "The nose DE the sister DE the doctor",
						},
					],
				},
				{
					id: 24,
					reference: [conj.que.info[1]],
					sentence: "I said I was from Arizona",
					translation: "I said QUE I was DE Arizona",
					data: [
						{
							phrase: "I said",
							translation: conj.que,
							phraseTranslation: "I said QUE",
						},
						{ word: "I" },
						{ word: "was" },
						{ word: "from", translation: prep.de },
						{ word: "Arizona" },
					],
				},
				{
					id: 25,
					reference: [
						conj.que.info[1],
						prep.de.info[4],
						prep.de.info[2],
						advrb.no.info[6],
					],
					sentence: "I hope Mom's leather jacket wasn't lost",
					translation: "I hope QUE the jacket DE leather DE Mom NO was lost",
					data: [
						{
							phrase: "I hope",
							translation: conj.que,
							phraseTranslation: "I hope QUE",
						},
						{
							phrase: "Mom's leather jacket",
							translation: prep.de,
							phraseTranslation: "the jacket DE leather DE Mom",
						},
						{
							phrase: "wasn't lost",
							translation: advrb.no,
							phraseTranslation: "NO was lost",
						},
					],
				},
				{
					id: 26,
					reference: [conj.que.info[1], advrb.no.info[6]],
					sentence: "I said it isn't here",
					translation: "I said QUE it NO is here",
					data: [
						{
							phrase: "I said",
							translation: conj.que,
							phraseTranslation: "I said QUE",
						},
						{ word: "it" },
						{
							phrase: "isn't here",
							translation: advrb.no,
							phraseTranslation: "NO is here",
						},
					],
				},
			],
		},
	},
}

export default spanishData
