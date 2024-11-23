// maybe change to prounoun.eso or conjunction.y conjuction.que
"use client"

import { sendError } from "next/dist/server/api-utils"
import words from "./spanishWords"
import { data } from "autoprefixer"
import { EditCalendar } from "@mui/icons-material"

const { conj, pron, prep, advrb, noun, verb, artcl, dObj } = words

const sideLessonPotential = [
	{
		lesson: 1,
		info: "general intro, info",
	},
	{
		lesson: 2,
		info: "FOOD test, EAT test, Potato head game.",
	},
	{
		lesson: 6,
		info: [
			"Find the direct object",
			"explains positions of NO vs Direct Obj pronouns",
		],
	},
	{
		lesson: 8,
		info: [
			"Find the direct object PRONOUN",
			"Direct obj Pronoun memory palace",
			"explains posisitions of direct object vs direct object pronouns",
		],
	},
	{
		lesson: 12,
		info: ["Guess if is is being used as ES"],
	},
	{
		lesson: 13,
		info: ["Ser memory palace"],
	},
]

const spanishData = {
	lessons: {
		1: {
			lesson: 1,
			name: "Lesson 1",
			details: "INTRO: A Grammatical Approach to Language Learning",
			info: [
				"This language course is focused on reuslts and genuine fluency. \nThe aim is to have you thinking in Spanish ASAP, and from there sounding more like a native speaker every day.",
				"Vocab will always make contextual sense. Grammar rules will ALWAYS integrate with what you already know, helping you to naturally form sentences. \nEvery new word will fit into a fabric that will quickly grow and develop into your SPANISH VOICE so that you can speak Idiomatically faster than ever!",
				"This all requires doing the work, step by step from the foundations and working your way up. This requires the mindset of a SERIOUS language learner. ",
				"This program is not focused on vocab, so we won't be learning words for 'tree' or 'napkin' right away, we need to focus on the core elements of the language EXCLUSIVELY first.",
				"This course starts with some hard concepts in Spanish, like essential sentence structures, pronouns, prepositions, irregular verb conjugations, and everything that makes Spanish what it is!",
				"Don't worry though there will by systems involved to help master all of these foundations until they are second nature!",
				"Once you know how to fit Spanish words into sentences we can learn all the vocab that fits into those sentence constructs and idioms.",
				"We actually will be learning the most frequently used Spanish words first, leaning all the words needed to get to 90% comprehension and enabling you to express literally anything you to express in Spanish.",
				"You might not know the word for Office Printer in spanish but you'll be able to describe this thing and ask what it is called, giving you a new vocab word on the spot!",
				"You'll learn fastest if you take an opportunity to predict the Spanish you're about to translate outloud, and especially speak it out loud, trying to imitate the audio!",
				"One of the most important objectives on the road to fluency is SPONTANEOUS PRODUCTION, coming up with your own sentences on the fly, in a smooth way. Practice changing the sentences and making them your own as well!",
			],
			wordBank: [],
			sentences: [],
		},
		2: {
			lesson: 2,
			name: "Lesson 2",
			details: "Deep foundational grammar!",
			info: [
				"What is deep fundamental grammar? Well you can't build a house from scratch, you need a foundation first. During the first 10 lessons we are going to build (or rebuild) your Spanish SYNTAX and GRAMMAR from their roots. This will be some of the hardest work in the course ",
				"We will be spending a lot of time on only a few words. In fact 20 words make up 30% of ALL words spoken in Spanish, and about 100 words make up over 50%!",
				"We will be focusing on the first 20. Not just what they mean, but how to use them in a sentence like a Native Speaker would!",
				"Fluency is all about being able to say what you want in Spanish in real time, and you need to not just recite memorized phrases, but create entire Spanish sentences from scratch!",
				"However, actually no one really assembles sentences from scratch, Every real sentence, both in English and Spanish, is actually based on an existing template that Native Speakers use all the time!",
				"Think of the sentence template like a potato head face, all the parts can be changed, the eyes, nose, mouth, you can replace the hat with hair.",
				"But the potato head has a basic structure, on top is hair or a hat of some kind, then the eyes, nose, mouth, it wouldn't be proper to place the mouth on the head.",
				"Sentences function in the same way, there is a basic template, but certain pieces are interchangeable. The parts in a sentence are called parts of speech, and two types are NOUNS and VERBS",
				"Nouns and verbs function very much the same in English as in Spanish but not quite exactly. Let's review nouns and verbs, how to identify them, and how to use them in a Spanish sentence template.",
				noun.info[1],
				noun.info[0],
				`ESO ist technically not a NOUN it's a PRONOUN meaning THAT. ${pron.eso.info[0]}`,
				`Any noun or noun phrase can be replace with ESO and still make sense: 'Losing myself in a new city makes me happy' 'That/ESO makes me happy'`,

				verb.info[0],
				verb.info[1],
				verb.info[2],
			],
		},
		3: {
			lesson: 3,
			name: "Lesson 3",
			details: "Conjunctions (Y and QUE) and ESO",
			info: [
				conj.info[0],
				conj.info[1],
				conj.que.info[0],
				conj.que.info[1],
				verb.info[3],
				conj.y.info[0],
			],
			wordBank: [conj.y, conj.que, pron.eso],
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
						{
							phrase: "We said",
							translation: conj.que,
							phraseTranslation: "We said QUE",
							reference: { "conj.que": [1] },
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
					translation: "People say QUE its good",
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
					sentence: "We said that that was fine!",
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
					sentence: "I told them that was in the way",
					translation: "I told them QUE ESO was in the way",
					data: [
						{
							phrase: "I told them",
							translation: conj.que,
							phraseTranslation: "I told them QUE",
							reference: { "conj.que": [1] },
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
					sentence: "I hope he gets that soon",
					translation: "I hope QUE he gets ESO soon",
					data: [
						{
							phrase: "I hope",
							translation: conj.que,
							phraseTranslation: "I hope QUE",
							reference: { "conj.que": [1] },
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
					sentence: "He said they said that!",
					translation: "He said QUE they said ESO!",
					data: [
						{
							phrase: "He said",
							translation: conj.que,
							phraseTranslation: "He said QUE",
							reference: { "conj.que": [1] },
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
					translation: "ESO NO is my favorite thing",
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
					sentence: "I hope he told you he was here",
					translation: "I hope QUE he told you QUE he was here",
					data: [
						{
							phrase: "I hope",
							translation: conj.que,
							phraseTranslation: "I hope QUE",
							reference: { "conj.que": [1] },
						},
						{
							phrase: "he told you",
							translation: conj.que,
							phraseTranslation: "he told you QUE",
							reference: { "conj.que": [1] },
						},
						{ word: "he was here" },
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
				`No is an adverb. ${advrb.no.info[0]}`,
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
					sentence: "She can't be at the house",
					translation: "She NO can be at the house",
					data: [
						{ word: "She" },
						{
							phrase: "Can't be",
							translation: advrb.no,
							phraseTranslation: "NO can be",
							reference: { "advrb.no": [7] },
						},
						{ word: "at" },
						{ word: "the" },
						{ word: "house" },
					],
				},
				{
					id: 2,
					sentence: "Don't say you're not here",
					translation: "NO say QUE you NO are here",
					data: [
						{
							phrase: "Don't say",
							translation: [advrb.no, conj.que],
							phraseTranslation: "NO say QUE",
							reference: { "advrb.no": [7], "conj.que": [1] },
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
					sentence: "We didn't go to this store",
					translation: "We NO went A this store",
					data: [
						{ word: "We" },
						{
							phrase: "didn't go",
							translation: advrb.no,
							phraseTranslation: "NO went",
							reference: { "advrb.no": [7] },
						},
						{ word: "to", translation: prep.a },
						{ word: "this" },
						{ word: "store" },
					],
				},
				{
					id: 4,
					sentence: "She won't send that to her sister",
					translation: "She NO will send ESO A her sister",
					data: [
						{ word: "She" },
						{
							phrase: "won't send",
							translation: advrb.no,
							phraseTranslation: "NO will send",
							reference: { "advrb.no": [6] },
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
					sentence: "This isn't your stuff",
					translation: "This NO is your stuff",
					data: [
						{ word: "This" },
						{
							phrase: "isn't",
							translation: advrb.no,
							phraseTranslation: "NO is",
							reference: { "advrb.no": [6] },
						},
						{ word: "your" },
						{ word: "stuff" },
					],
				},
				{
					id: 7,
					sentence: "We can't do that",
					translation: "We NO can do ESO",
					data: [
						{ word: "We" },
						{
							phrase: "can't do",
							translation: advrb.no,
							phraseTranslation: "NO can do",
							reference: { "advrb.no": [6] },
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
					sentence: "I can't have more of that",
					translation: "I NO can have more of ESO",
					data: [
						{ word: "I" },
						{
							phrase: "can't have",
							translation: advrb.no,
							phraseTranslation: "NO can have",
							reference: { "advrb.no": [6] },
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
					sentence: "We won't say you have that",
					translation: "We NO will say QUE you have ESO",
					data: [
						{ word: "We" },
						{
							phrase: "won't say",
							translation: [advrb.no],
							phraseTranslation: "NO will say",
							reference: { "advrb.no": [6] },
						},
						{
							word: "you have",
							translation: conj.que,
							phraseTranslation: "QUE you have",
							reference: { "conj.que": [1] },
						},
						{ word: "that", translation: pron.eso },
					],
				},
				{
					id: 12,
					sentence: "She doesn't have that",
					translation: "She NO has ESO",
					data: [
						{ word: "She" },
						{
							phrase: "doesn't have",
							translation: advrb.no,
							phraseTranslation: "NO has",
							reference: { "advrb.no": [7] },
						},
						{ word: "that", translation: pron.eso },
					],
				},
				{
					id: 13,
					sentence: "This doesn't tell us that is done",
					translation: "This NO tells us QUE ESO is done",
					data: [
						{ word: "This" },
						{
							phrase: "doesn't tell",
							translation: advrb.no,
							phraseTranslation: "NO tells",
							reference: { "advrb.no": [7] },
						},
						{
							phrase: "us that",
							translation: conj.que,
							phraseTranslation: "us QUE",
							reference: { "conj.que": [1] },
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
					sentence: "This isn't my house",
					translation: "This NO is my house",
					data: [
						{ word: "This" },
						{
							phrase: "isn't",
							translation: advrb.no,
							phraseTranslation: "NO is",
							reference: { "advrb.no": [6] },
						},
						{ word: "my" },
						{ word: "house" },
					],
				},
				{
					id: 21,
					sentence: "She can't walk very fast",
					translation: "She NO can walk very fast",
					data: [
						{ word: "She" },
						{
							phrase: "can't",
							translation: advrb.no,
							phraseTranslation: "NO can",
							reference: { "advrb.no": [6] },
						},
						{ word: "walk" },
						{ word: "very" },
						{ word: "fast" },
					],
				},
				{
					id: 22,
					sentence: "They don't see why",
					translation: "They NO see why",
					data: [
						{ word: "They" },
						{
							phrase: "don't see",
							translation: advrb.no,
							phraseTranslation: "NO see",
							reference: { "advrb.no": [7] },
						},
						{ word: "why" },
					],
				},
				{
					id: 23,

					sentence: "That won't matter",
					translation: "ESO NO will matter",
					data: [
						{ word: "That", translation: pron.eso },
						{
							phrase: "won't mattter",
							translation: advrb.no,
							phraseTranslation: "NO will matter",
							reference: { "advrb.no": [6] },
						},
					],
				},
				{
					id: 24,
					sentence: "This doesn't tell us much",
					translation: "This NO tells us much",
					data: [
						{ word: "This" },
						{
							phrase: "doesn't tell",
							translation: advrb.no,
							phraseTranslation: "NO tells",
							reference: { "advrb.no": [6] },
						},
						{ word: "us" },
						{ word: "much" },
					],
				},
				{
					id: 25,
					sentence: "He didn't know",
					translation: "He NO knew",
					data: [
						{ word: "He" },
						{
							phrase: "didn't know",
							translation: advrb.no,
							phraseTranslation: "NO knew",
							reference: { "advrb.no": [7] },
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
			sentences: [
				{
					id: 1,
					sentence: "It's Samuel's water bottle!",
					translation: "It's the bottle DE water DE Samuel",
					data: [
						{ word: "It's" },
						{
							phrase: "Samuel's water bottle",
							phraseTranslation: "the bottle DE water DE Samuel",
							translation: [prep.de],
							reference: { "prep.de": [2, 4] },
						},
					],
				},
				{
					id: 2,
					sentence: "You won't tell me they did it?",
					translation: "You NO will tell QUE they did it?",
					data: [
						{ word: "You" },
						{
							phrase: "won't tell",
							translation: advrb.no,
							phraseTranslation: "NO will tell",
							reference: { "advrb.no": [6] },
						},
						{ word: "me" },
						{
							phrase: "they did it?",
							phraseTranslation: "QUE they did it",
							translation: conj.que,
							reference: { "conj.que": [1] },
						},
					],
				},
				{
					id: 3,

					sentence: "Don't touch John's wine glass",
					translation: "NO touch the glass DE wine DE John",
					data: [
						{
							phrase: "Don't touch",
							translation: advrb.no,
							phraseTranslation: "NO touch",
							reference: { "advrb.no": [7] },
						},
						{
							phrase: "John's wine glass",
							phraseTranslation: "the glass DE wine DE John",
							translation: prep.de,
							reference: { "prep.de": [2, 4] },
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
					sentence: "This can't be from from Spain!",
					translation: "This NO can be DE Spain!",
					data: [
						{ word: "This" },
						{
							phrase: "can't be",
							translation: advrb.no,
							phraseTranslation: "NO can be",
							reference: { "advrb.no": [6] },
						},
						{ word: "from", translation: prep.de },
						{ word: "Spain!" },
					],
				},
				{
					id: 6,
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
							reference: { "prep.de": [4] },
						},
					],
				},
				{
					id: 7,
					sentence: "You hoped she and I were together",
					translation: "You hoped QUE she Y I were together",
					data: [
						{
							phrase: "You hoped",
							phraseTranslation: "You hoped QUE",
							translation: conj.que,
							reference: { "conj.que": [1] },
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
							reference: { "advrb.no": [6] },
						},
					],
				},
				{
					id: 9,
					sentence: "She hoped we woudn't go to Canada",
					translation: "She hoped QUE we NO would go A Canada",
					data: [
						{
							phrase: "She hoped",
							translation: conj.que,
							phraseTranslation: "She hoped QUE",
							reference: { "conj.que": [1] },
						},
						{ word: "we" },
						{
							phrase: "woudn't go",
							phraseTranslation: "NO would go",
							translation: advrb.no,
							reference: { "advrb.no": [6] },
						},
						{ word: "to", translation: prep.a },
						{ word: "Canada" },
					],
				},
				{
					id: 10,
					sentence: "I couldn't believe that!",
					translation: "I NO could believe ESO!",
					data: [
						{ word: "I" },
						{
							phrase: "couldn't believe",
							translation: advrb.no,
							phraseTranslation: "NO could believe",
							reference: { "advrb.no": [6] },
						},
						{ word: "that!", translation: pron.eso },
					],
				},
				{
					id: 11,
					sentence: "It was Maria's plastic chair",
					translation: "It was the chair DE plastic DE Maria",
					data: [
						{ word: "It" },
						{ word: "was" },
						{
							phrase: "Maria's plastic chair",
							phraseTranslation: "the chair DE plastic DE Maria",
							translation: prep.de,
							reference: { "prep.de": [4, 2] },
						},
					],
				},
				{
					id: 12,
					sentence: "I think he ran from the house",
					translation: "I think QUE he ran DE the house",
					data: [
						{
							phrase: "I think",
							translation: conj.que,
							phraseTranslation: "I think QUE",
							reference: { "conj.que": [1] },
						},
						{ word: "he ran" },

						{ word: "from", translation: prep.de },
						{ word: "the house" },
					],
				},
				{
					id: 13,
					sentence: "That doesn't matter.",
					translation: "ESO NO matters.",
					data: [
						{ word: "That" },
						{
							phrase: "doesn't matter.",
							phraseTranslation: "NO matters.",
							translation: advrb.no,
							reference: { "advrb.no": [7] },
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
					sentence: "She didn't care and I knew it",
					translation: "She NO cared Y I knew it",
					data: [
						{
							phrase: "She didn't care",
							phraseTranslation: "She NO cared",
							translation: advrb.no,
							reference: { "advrb.no": [7] },
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
						{ word: "The rich smell" },
						{ word: "of", translation: prep.de },
						{ word: "the food" },
					],
				},
				{
					id: 22,
					sentence: "Your brother's foot",
					translation: "The foot DE your brother",
					data: [
						{
							phrase: "Your brother's foot",
							translation: prep.de,
							phraseTranslation: "The foot DE your brother",
							reference: { "prep.de": [3] },
						},
					],
				},
				{
					id: 23,
					sentence: "The doctor's sister's nose",
					translation: "The nose DE the sister DE the doctor",
					data: [
						{
							phrase: "The doctor's sister's nose",
							translation: prep.de,
							phraseTranslation: "The nose DE the sister DE the doctor",
							reference: { "prep.de": [2, 3] },
						},
					],
				},
				{
					id: 24,
					sentence: "I said I was from Arizona",
					translation: "I said QUE I was DE Arizona",
					data: [
						{
							phrase: "I said",
							translation: conj.que,
							phraseTranslation: "I said QUE",
							reference: { "conj.que": [1] },
						},
						{ word: "I" },
						{ word: "was" },
						{ word: "from", translation: prep.de },
						{ word: "Arizona" },
					],
				},
				{
					id: 25,
					sentence: "I hope Mom's leather jacket wasn't lost",
					translation: "I hope QUE the jacket DE leather DE Mom NO was lost",
					data: [
						{
							phrase: "I hope",
							translation: conj.que,
							phraseTranslation: "I hope QUE",
							reference: { "conj.que": [1] },
						},
						{
							phrase: "Mom's leather jacket",
							translation: prep.de,
							phraseTranslation: "the jacket DE leather DE Mom",
							reference: { "prep.de": [4, 2] },
						},
						{
							phrase: "wasn't lost",
							translation: advrb.no,
							phraseTranslation: "NO was lost",
							reference: { "advrb.no": [6] },
						},
					],
				},
				{
					id: 26,
					sentence: "I said it isn't here",
					translation: "I said QUE it NO is here",
					data: [
						{
							phrase: "I said",
							translation: conj.que,
							phraseTranslation: "I said QUE",
							reference: { "conj.que": [1] },
						},
						{ word: "it" },
						{
							phrase: "isn't here",
							translation: advrb.no,
							phraseTranslation: "NO is here",
							reference: { "advrb.no": [6] },
						},
					],
				},
			],
		},
		6: {
			lesson: 6,
			name: "Lesson 6",
			details: "THE! First Articles and Gender",
			info: [
				"Spanish has several words to mean THE, most common is EL for MASC, and LA for FEM",
				noun.info[2],
			],
			wordBank: [artcl.el, artcl.la],
			sentences: [
				{
					id: 1,
					sentence: "The man has that",
					translation: "EL man has ESO",
					data: [
						{ word: "The", translation: artcl.el },
						{ word: "man" },
						{ word: "has" },
						{ word: "that", translation: pron.eso },
					],
				},
				{
					id: 2,
					sentence: "The guy went to the house",
					translation: "EL guy went A the house",
					data: [
						{ word: "the", translation: artcl.el },
						{ word: "guy" },
						{ word: "went" },
						{ word: "to", translation: prep.a },
						{ word: "the" },
						{ word: "house" },
					],
				},
				{
					id: 3,
					sentence: "That is the girl's",
					translation: "ESO is DE LA girl",
					data: [
						{ word: "That", translation: pron.eso },
						{ word: "is" },
						{
							phrase: "the girl's",
							translation: [prep.de, artcl.la],
							phraseTranslation: "DE LA girl",
							reference: { "prep.de": [2] },
						},
					],
				},
				{
					id: 4,
					sentence: "You couldn't come from there",
					translation: "YOU NO could come DE there",
					data: [
						{ word: "you" },
						{
							phrase: "couldn't come",
							translation: advrb.no,
							phraseTranslation: "NO could come",
							reference: { "advrb.no": [6] },
						},
						{ word: "from", translation: prep.de },
						{ word: "there" },
					],
				},
				{
					id: 5,
					sentence: "The boy didn't see us.",
					translation: "EL boy NO saw us",
					data: [
						{ word: "the", translation: artcl.el },
						{ word: "boy" },
						{
							phrase: "didn't see",
							translation: advrb.no,
							phraseTranslation: "NO saw",
							reference: { "advrb.no": [7] },
						},
						{ word: "us" },
					],
				},
				{
					id: 6,
					sentence: "The man can't have the girl's things",
					translation: "EL man NO can have the things DE LA girl",
					data: [
						{ word: "The", translation: artcl.el },
						{ word: "man" },
						{
							phrase: "can't have",
							translation: advrb.no,
							phraseTranslation: "NO can have",
							reference: { "advrb.no": [6] },
						},
						{ word: "the" },
						{
							phrasE: "girl's things",
							translation: [prep.de, artcl.la],
							phraseTranslation: "things DE LA girl",
							reference: { "prep.de": [2] },
						},
					],
				},
				{
					id: 7,
					sentence: "The man and the woman wouldn't go there",
					translation: "EL man Y LA woman NO would go there",
					data: [
						{ word: "the", translation: artcl.el },
						{ word: "man" },
						{ word: "and", translation: conj.y },
						{ word: "the", translation: artcl.la },
						{ word: "woman" },
						{
							phrase: "wouldn't go",
							translation: advrb.no,
							phraseTranslation: "NO would go",
							reference: { "advrb.no": [6] },
						},
						{ word: "there" },
					],
				},
				{
					id: 8,
					sentence: "The guy told the girl it was a plastic cup",
					translation: "EL guy told LA girl QUE it was a cup DE plastic",
					data: [
						{ word: "The", translation: artcl.el },
						{ word: "guy" },
						{ word: "told" },
						{
							phrase: "the girl",
							translation: conj.que,
							phraseTranslation: "LA girl QUE",
							reference: { "conj.que": [1] },
						},
						{ word: "it" },
						{ word: "was" },
						{ word: "a" },
						{
							word: "plastic cup",
							translation: prep.de,
							phraseTranslation: "cup DE plastic",
							reference: { "prep.de": [4] },
						},
					],
				},
				{
					id: 9,
					sentence: "The lady and I told her it was OK",
					translation: "LA lady Y I told her QUE it was OK",
					data: [
						{ word: "the", translation: artcl.la },
						{ word: "lady" },
						{ word: "and", translation: conj.y },
						{ word: "I" },
						{ word: "told" },
						{ phrase: "her" },
						{
							phrase: "it was OK",
							translation: conj.que,
							phraseTranslation: "QUE it was OK",
							reference: { "conj.que": [1] },
						},
					],
				},
				{
					id: 10,
					sentence: "The girl won't say that I did it",
					translation: "LA girl NO will say QUE I did it",
					data: [
						{ word: "the", translation: artcl.la },
						{ word: "girl" },
						{
							phrase: "won't say",
							translation: advrb.no,
							phraseTranslation: "NO will say",
							reference: { "advrb.no": [6] },
						},
						{ word: "that", tranlation: conj.que },
						{ word: "I" },
						{ word: "did" },
						{ word: "it" },
					],
				},
			],
		},
		7: {
			lesson: 7,
			name: "Lesson 7",
			details: "Direct Objects: LO, LA. ",
			info: [
				"How does HIM/HER fit in as far as Word Categories go, like nouns and verbs? It can't always be subsituted in place of other nouns: 'Food makes me happy.' != 'Him makes me happy' ",
				"HE and HIM have to go in very different and specific places in sentences, one is the subject (HE), and one is the Direct Object (HIM) ",
				dObj.info[0],
				dObj.info[1],
				dObj.info[2],
				"The Spanish Direct Objects for HIM and HER are LO and LA!",
				"This LA(her) is diffrent then the LA for THE! If LA occurs before a noun it has to mean THE, if it occurs before a verb it has to mean HER!",
				dObj.info[3],
			],
			wordBank: [dObj.lo, dObj.la, artcl.el, artcl.la],
			sentences: [
				{
					id: 1,
					sentence: "Our friends see her",
					translation: "Our friends LA see",
					data: [
						{ word: "Our" },
						{ word: "friends" },
						{
							word: "see her",
							translation: dObj.la,
							phraseTranslation: "LA see",
						},
					],
				},
				{
					id: 2,
					sentence: "We found it",
					translation: "We LO found",
					data: [
						{ word: "We" },
						{
							phrase: "found it",
							translation: dObj.lo,
							phraseTranslation: "LO found",
						},
					],
				},
				{
					id: 3,
					sentence: "He loves it and calls it his own",
					translation: "He LO loves Y LO calls his own",
					data: [
						{ word: "He" },
						{
							phrase: "loves it",
							translation: dObj.lo,
							phraseTranslation: "LO loves",
						},
						{ word: "and", translation: conj.y },
						{
							phrase: "calls it",
							translation: dObj.lo,
							phraseTranslation: "LO calls",
						},
						{ word: "his own" },
					],
				},
				{
					id: 4,
					sentence: "She and I did it",
					translation: "She Y I LO did",
					data: [
						{ word: "She" },
						{ word: "and", translation: conj.y },
						{ word: "I" },
						{
							phrase: "did it",
							translation: dObj.lo,
							phraseTranslation: "LO did",
						},
					],
				},
				{
					id: 5,
					sentence: "That caused it",
					translation: "ESO LO caused",
					data: [
						{ word: "That", translation: pron.eso },
						{
							phrase: "caused it",
							translation: dObj.lo,
							phraseTranslation: "LO caused",
						},
					],
				},
				{
					id: 6,
					sentence: "The girl doesn't love him",
					translation: "LA girl NO LO loves",
					data: [
						{ word: "the", translation: artcl.la },
						{ word: "girl" },
						{
							phrase: "doesn't love him",
							translation: [advrb.no, dObj.lo],
							phraseTranslation: "NO LO loves",
							reference: { "advrb.no": [7] },
						},
					],
				},
				{
					id: 7,
					sentence: "That went to it's home",
					translation: "ESO went A its home",
					data: [
						{ word: "That", translation: pron.eso },
						{ word: "went" },
						{ word: "to", translation: prep.a },
						{ word: "its" },
						{ word: "home" },
					],
				},
				{
					id: 8,
					sentence: "I don't take her to school",
					translation: "I NO LA take A school",
					data: [
						{ word: "I" },
						{
							phrase: "don't take her",
							translation: [advrb.no, dObj.la],
							phraseTranslation: "NO LA take",
						},
						{ word: "to", translation: prep.a },
						{ word: "school" },
					],
				},
				{
					id: 9,
					sentence: "That didn't hurt her",
					translation: "ESO NO LA hurt",
					data: [
						{ word: "That", translation: pron.eso },
						{
							phrase: "didn't hurt her",
							translation: [advrb.no, dObj.la],
							phraseTranslation: "NO LA hurt",
							reference: { "advrb.no": [7] },
						},
					],
				},
				{
					id: 10,
					sentence: "The man found her with a rag doll",
					translation: "EL man LA found with a doll DE rag",
					data: [
						{ word: "the", translation: artcl.el },
						{ word: "man" },
						{
							phrase: "found her",
							translation: dObj.la,
							phraseTranslation: "LA found",
						},
						{ word: "with" },
						{ word: "a" },
						{
							phrase: "rag doll",
							translation: prep.de,
							phraseTranslation: "doll DE rag",
							reference: { "prep.de": [4] },
						},
					],
				},
				{
					id: 11,
					sentence: "The boy is not the same one",
					translation: "EL boy NO is EL same one",
					data: [
						{ word: "the", translation: artcl.el },
						{ word: "boy" },
						{
							phrase: "is not",
							translation: [advrb.no, dObj.lo],
							phraseTranslation: "NO is",
							reference: { "advrb.no": [6] },
						},
						{ word: "the", translation: artcl.el },
						{ word: "same" },
						{ word: "one" },
					],
				},
				{
					id: 12,
					sentence: "I think the girl saw him",
					translation: "I think QUE LA girl LO saw",
					data: [
						{
							word: "I think",
							translation: conj.que,
							phraseTranslation: "I think QUE",
							reference: { "conj.que": [1] },
						},
						{ word: "the", translation: artcl.la },
						{ word: "girl" },
						{
							phrase: "saw him",
							translation: dObj.lo,
							phraseTranslation: "LO saw",
						},
					],
				},
				{
					id: 13,
					sentence: "My dog saw her coming from the store",
					translation: "My dog LA saw coming DE the store",
					data: [
						{ word: "My" },
						{ word: "dog" },
						{
							phrase: "saw her",
							translation: dObj.la,
							phraseTranslation: "LA saw",
						},
						{ word: "coming" },
						{ word: "from", translation: prep.de },
						{ word: "the" },
						{ word: "store" },
					],
				},
				{
					id: 14,
					sentence: "I think that is from Canada",
					translation: "I think QUE ESO is DE Canada",
					data: [
						{
							phrase: "I think",
							translation: conj.que,
							phraseTranslation: "I think QUE",
							reference: { "conj.que": [1] },
						},
						{ word: "that", translation: pron.eso },
						{ word: "is" },
						{ word: "from", translation: prep.de },
						{ word: "Canada" },
					],
				},
				{
					id: 15,
					sentence: "The girl from your country did that",
					translation: "LA girl DE your country did ESO",
					data: [
						{ word: "the", translation: artcl.la },
						{ word: "girl" },
						{ word: "from", translation: prep.de },
						{ word: "your" },
						{ word: "country" },
						{ word: "did" },
						{ word: "that", translation: pron.eso },
					],
				},
				{
					id: 16,
					sentence: "The man and the woman see her",
					translation: "EL man Y LA woman LA see",
					data: [
						{ word: "the", translation: artcl.el },
						{ word: "man" },
						{ word: "and", translation: conj.y },
						{ word: "the", translation: artcl.la },
						{ word: "woman" },
						{
							phrase: "see her",
							translation: dObj.la,
							phraseTranslation: "LA see",
						},
					],
				},
				{
					id: 17,
					sentence: "The mother didn't find him",
					translation: "LA mother NO LO found",
					data: [
						{ word: "the", translation: artcl.la },
						{ word: "mother" },
						{
							phrase: "didn't find him",
							translation: [advrb.no, dObj.lo],
							phraseTranslation: "NO LO found",
							reference: { "advrb.no": [7] },
						},
					],
				},
				{
					id: 18,
					sentence: "Sara's music drifted to his ears",
					translation: "The music DE Sara drifted A his ears",
					data: [
						{
							word: "Sara's music",
							translation: prep.de,
							phraseTranslation: "The music DE Sara",
							reference: { "prep.de": [2] },
						},
						{ word: "drifted" },
						{ word: "to", translation: prep.a },
						{ word: "his ears" },
					],
				},
				{
					id: 19,
					sentence: "She and I chased a bird and it flew away from us",
					translation: "She Y I chased a bird Y it flew away DE us",
					data: [
						{ word: "She" },
						{ word: "and", translation: conj.y },
						{ word: "I" },
						{ word: "chased a bird" },
						{ word: "and", translation: conj.y },
						{ word: "it flew away" },
						{ word: "from", translation: prep.de },
						{ word: "us" },
					],
				},
				{
					id: 20,
					sentence: "They said he told them he had gone to the party",
					translation: "They said QUE he told them QUE he had gone A the party",
					data: [
						{
							word: "They said",
							translation: conj.que,
							phraseTranslation: "They said QUE",
							reference: { "conj.que": [1] },
						},
						{
							word: "he told them",
							translation: conj.que,
							phraseTranslation: "he told them QUE",
							reference: { "conj.que": [1] },
						},
						{ word: "he had gone" },
						{ word: "to", translation: prep.a },
						{ word: "the party" },
					],
				},
			],
		},
		8: {
			lesson: 8,
			name: "Lesson 8",
			details: "Direct Obj Pronouns: TE, and ME. and Artcls: UN and UNA",
			info: [
				"We leared about Direct Object Pronoun Placement, He saw her = He HER saw or He LA saw, but what about ESO, He saw ESO, isn't ESO functioning as a Direct Object here?",
				"The only Direct Objects that get shuffled in the sentence are the Direct Object PRONOUNS, so far we've learned of LA (her) and LO (him) both can mean IT (M/F)",
				"TE, and ME, are the Spanish Direct Object Pronouns for YOU and ME!",
				"Although ESO is a Pronoun, and in 'She saw ESO' it is functioning as a Direct Object it still isn't one of the specific Direct Object Pronouns! SO it doesn't get shuffled.",
			],
			wordBank: [dObj.te, dObj.me, artcl.un, artcl.una],
			sentences: [
				{
					id: 1,
					sentence: "They found me",
					translation: "They ME found",
					data: [
						{ word: "They" },
						{
							phrase: "found me",
							translation: dObj.me,
							phraseTranslation: "ME found",
						},
					],
				},
				{
					id: 2,
					sentence: "We saw you",
					translation: "We TE saw",
					data: [
						{ word: "We" },
						{
							phrase: "saw you",
							translation: dObj.te,
							phraseTranslation: "TE saw",
						},
					],
				},
				{
					id: 3,
					sentencce: "The woman has a daughter",
					translation: "LA woman has UNA daughter",
					data: [
						{ word: "The", translation: artcl.la },
						{ word: "woman" },
						{ word: "has" },
						{ word: "a", translation: artcl.una },
						{ word: "daughter" },
					],
				},
				{
					id: 4,
					sentence: "The girl found me",
					translation: "LA girl ME found",
					data: [
						{ word: "The", translation: artcl.la },
						{ word: "girl" },
						{
							phrase: "found me",
							translation: dObj.me,
							phraseTranslation: "ME found",
						},
					],
				},
				{
					id: 5,
					sentence: "It was a girl from Argentina",
					translation: "It was UNA girl DE Argentina.",
					data: [
						{ word: "It" },
						{ word: "was" },
						{ word: "a", translation: artcl.una },
						{ word: "girl" },
						{ word: "from", translation: prep.de },
						{ word: "Argentina" },
					],
				},
				{
					id: 6,
					sentence: "We know he saw you.",
					translation: "We know QUE he TE saw.",
					data: [
						{
							word: "We know",
							translation: conj.que,
							phraseTranslation: "We know QUE",
							reference: { "conj.que": [1] },
						},

						{
							word: "he saw you",
							translation: dObj.te,
							phraseTranslation: "he TE saw.",
						},
					],
				},
				{
					id: 7,
					sentence: "They said that it wasn't a plastic dish",
					translation: "They said QUE it NO was a dish DE plastic",
					data: [
						{
							phrase: "They said",
							translation: conj.que,
							phraseTranslation: "They said QUE",
							reference: { "conj.que": [1] },
						},
						{
							phrase: "it wasn't",
							phraseTranslation: "it NO was",
							translation: advrb.no,
						},
						{ word: "a" },
						{
							word: "plastic dish",
							translation: prep.de,
							phraseTranslation: "dish DE plastic",
							reference: { "prep.de": [4] },
						},
					],
				},
				{
					id: 8,
					sentence: "A girl and her dog found you",
					translation: "UNA girl Y her dog TE found",
					data: [
						{ word: "A", translation: artcl.una },
						{ word: "girl" },
						{ word: "and", translation: conj.y },
						{ word: "her" },
						{ word: "dog" },
						{
							phrase: "found you",
							translation: dObj.te,
							phraseTranslation: "TE found",
						},
					],
				},
				{
					id: 9,
					sentence: "A man says he knows me",
					translation: "UN man says QUE he knows ME",
					data: [
						{ word: "A", translation: artcl.un },
						{
							word: "man says",
							translation: conj.que,
							phraseTranslation: "UN man says QUE",
							reference: { "conj.que": [1] },
						},
						{
							word: "he knows me",
							translation: dObj.me,
							phraseTranslation: "he ME knows",
						},
					],
				},
				{
					id: 10,
					sentence: "He said that he moved from Peru to California",
					translation: "He said QUE he moved DE Peru A California",
					data: [
						{
							phrase: "He said",
						},
						{ word: "that", translation: conj.que },
						{ word: "he moved" },
						{ word: "from", translation: prep.de },
						{ word: "Peru" },
						{ word: "to", translation: prep.a },
						{ word: "California" },
					],
				},
				{
					id: 11,
					sentence: "John's father found her",
					translation: "EL father DE John LA found",
					data: [
						{
							word: "John's father",
							translation: [prep.de, artcl.el],
							phraseTranslation: "EL father DE John",
						},
						{
							phrase: "found her",
							translation: dObj.la,
							phraseTranslation: "LA found",
						},
					],
				},
				{
					id: 12,
					sentence: "A man did that and I found him",
					translation: "UN man did ESO Y I LO found",
					data: [
						{ word: "A", translation: artcl.un },
						{ word: "man" },
						{ word: "did" },
						{ word: "that", translation: pron.eso },
						{ word: "and", translation: conj.y },
						{
							phrase: "I found him",
							translation: dObj.lo,
							phraseTranslation: "I LO found",
						},
					],
				},
			],
		},
		9: {
			lesson: 9,
			name: "Lesson 9",
			details: "Prepositions: POR and PARA, CON and EN!",
			info: [
				`Remember: ${prep.info[0]}`,
				"Two new Prepositions are: CON meaning WITH, and EN meanin AT, ON, or IN, but mostly at! 'I'm AT/EN the Table'",
				`The nuance with EN, is ${prep.info[0]}`,
				`TIME! ${prep.a.info[0]}`,
				`Two new tricky Prepsotions are POR and PARA, they are nuanced because: ${prep.info[1]}`,
				prep.para.info[0],
				prep.para.info[1],
				`POR is far less straightforward. ${prep.por.info[0]}`,
				prep.por.info[1],
				prep.por.info[2],
				prep.por.info[3],
				prep.por.info[4],
				prep.por.info[5],
				prep.por.info[6],
				prep.por.info[7],
				"Something funny happens with these two Prepositions and Time: Do something PARA this Evening, or Do something POR this Evening",
				prep.por.info[8],
				prep.para.info[2],
				"Another interesting thing happens using ESO: POR ESO or PARA ESO:",
				prep.por.info[9],
				"These combinations are known as IDIOMS, which are phrases that don't usually translate properly to english but are commonly used by native speakers",
			],
			wordBank: [prep.con, prep.en, prep.para, prep.por],
			sentences: [
				{
					id: 1,
					sentence: "They were in the room at 4:00",
					translation: "They were EN the room A 4:00",
					data: [
						{ word: "They were" },
						{ word: "in", translation: prep.en },
						{ word: "the" },
						{ word: "room" },
						{
							word: "at",
							translation: prep.a,
							reference: { "prep.a": [0] },
						},
						{ word: "4:00" },
					],
				},
				{
					id: 2,
					sentence: "I was at a party with the girls",
					translation: "I was EN a party CON the girls",
					data: [
						{ word: "I was" },
						{ word: "at", translation: prep.en },
						{ word: "a" },
						{ word: "party" },
						{ word: "with", translation: prep.con },
						{ word: "the" },
						{ word: "girls" },
					],
				},
				{
					id: 3,
					sentence: "We ate with our friends at 6:00",
					translation: "We ate CON our friends A 6:00",
					data: [
						{ word: "We" },
						{ word: "ate" },
						{ word: "with", translation: prep.con },
						{ word: "our" },
						{ word: "friends" },
						{
							word: "at",
							translation: prep.a,
							reference: { "prep.a": [0] },
						},
						{ word: "6:00" },
					],
				},
				{
					id: 4,
					sentence: "The book was written by a young girl",
					translation: "The book was written POR UNA young girl",
					data: [
						{ word: "The book was written" },
						{
							word: "by",
							translation: prep.por,
							reference: { "prep.por": [3] },
						},
						{ word: "a", translation: artcl.una },
						{ word: "young" },
						{ word: "girl" },
					],
				},
				{
					id: 5,
					sentence: "That was because of those problems",
					translation: "ESO was POR those problems",
					data: [
						{ word: "That", tranlation: dObj.eso },
						{ word: "was" },
						{ word: "beacuase of", translation: prep.por },
						{ word: "those problems" },
					],
				},
				{
					id: 6,
					sentence: "We ran along the street",
					translation: "We ran POR the street",
					data: [
						{ word: "We ran" },
						{ word: "along", translation: prep.por },
						{ word: "the" },
						{ word: "street" },
					],
				},
				{
					id: 7,
					sentence: "I saw him during the morning",
					translation: "I LO saw POR the morning",
					data: [
						{
							word: "I saw him",
							translation: dObj.lo,
							phraseTranslation: "I LO saw",
						},
						{
							word: "during",
							translation: prep.por,
							reference: { "prep.por": [8] },
						},
						{ word: "the" },
						{ word: "morning" },
					],
				},
				{
					id: 8,
					sentence: "The boss(F) wants that by lunch",
					translation: "LA boss wants eso PARA lunch",
					data: [
						{ word: "the", translation: artcl.la },
						{ word: "boss" },
						{ word: "wants" },
						{ word: "that", translation: pron.eso },
						{
							word: "by",
							translation: prep.para,
							reference: { "prep.para": [2] },
						},
						{ word: "lunch" },
					],
				},
				{
					id: 9,
					sentence: "I don't babysit the girl during the evenings",
					translation: "I NO babysit LA girl POR the evenings",
					data: [
						{
							word: "I don't babysit",
							translation: advrb.no,
							phraseTranslation: "I NO babysit",
							reference: { "advrb.no": [7] },
						},
						{ word: "the", translation: artcl.la },
						{ word: "girl" },
						{ word: "during", translation: prep.por },
						{ word: "the" },
						{ word: "evenings" },
					],
				},
				{
					id: 10,
					sentence: "I went to the store during the afternoon	",
					translation: "I went A the store POR the afternoon",
					data: [
						{ word: "I went" },
						{
							word: "to",
							translation: prep.a,
							reference: { "prep.a": [0] },
						},
						{ word: "the store" },
						{ word: "during", translation: prep.por },
						{ word: "the" },
						{ word: "afternoon" },
					],
				},
				{
					id: 11,
					sentence: "The actress is on the stage",
					translation: "LA actress is EN the stage",
					data: [
						{ word: "the", translation: artcl.la },
						{ word: "actress" },
						{ word: "is" },
						{ word: "on", translation: prep.en },
						{ word: "the" },
						{ word: "stage" },
					],
				},
				{
					id: 12,
					sentence: "I said he was around here",
					translation: "I said QUE he was AROUND here",
					data: [
						{
							word: "I said",
							translation: conj.que,
							phraseTranslation: "I said QUE",
							reference: { "conj.que": [1] },
						},
						{ word: "he" },
						{ word: "was" },
						{
							word: "around",
							translation: prep.por,
							reference: { "prep.por": [5] },
						},
						{ word: "here" },
					],
				},
				{
					id: 13,
					sentence: "That won't be for him",
					translation: "That NO will be PARA him",
					data: [
						{ word: "That", translation: pron.eso },
						{
							word: "won't be",
							translation: advrb.no,
							phraseTranslation: "NO will be",
							reference: { "advrb.no": [7] },
						},
						{
							word: "for",
							translation: prep.para,
							reference: { "prep.para": [0] },
						},
						{ word: "him" },
					],
				},
				{
					id: 14,
					sentence: "She ran out of there because of the fire",
					translation: "She ran out DE there POR the fire",
					data: [
						{ word: "She ran" },
						{ word: "out" },
						{ word: "of", translation: prep.de },
						{ word: "there" },
						{
							word: "because of",
							translation: prep.por,
							reference: { "prep.por": [3] },
						},
						{ word: "the" },
						{ word: "fire" },
					],
				},
				{
					id: 15,
					sentence: "That was created by an interesting guy",
					translation: "ESO was created POR UN interesting guy",
					data: [
						{ word: "That", translation: pron.eso },
						{ word: "was" },
						{ word: "created" },
						{
							word: "by",
							translation: prep.por,
							reference: { "prep.por": [1] },
						},
						{ word: "an", translation: artcl.un },
						{ word: "interesting" },
						{ word: "guy" },
					],
				},
				{
					id: 16,
					sentence: "I saw her in the store with her mom",
					translation: "I LA saw EN the store CON her mom",
					data: [
						{
							phrase: "I saw her",
							translation: dObj.la,
							phraseTranslation: "I LA saw",
						},
						{ word: "in", translation: prep.en },
						{ word: "the" },
						{ word: "store" },
						{ word: "with", translation: prep.con },
						{ word: "her" },
						{ word: "mom" },
					],
				},
				{
					id: 17,
					sentence: "I said that my fur coat is from Europe",
					translation: "I said QUE my coat DE fur is DE Europe",
					data: [
						{
							phrase: "I said",
							translation: conj.que,
							phraseTranslation: "I said QUE",
							reference: { "conj.que": [1] },
						},
						{ word: "that", translation: pron.eso },
						{ word: "my" },
						{
							phrase: "fur coat",
							translation: prep.de,
							phraseTranslation: "coat DE fur",
							reference: { "prep.de": [4] },
						},
						{ word: "is" },
						{ word: "from", translation: prep.de },
						{ word: "Europe" },
					],
				},
				{
					id: 18,
					sentence: "Maria's son will be here by then	",
					translation: "EL son DE Maria will be here PARA then",
					data: [
						{
							phrase: "Maria's son",
							translation: [prep.de, artcl.el],
							phraseTranslation: "EL son DE Maria",
							reference: { "prep.de": [4] },
						},
						{ word: "will be here" },
						{
							word: "by",
							translation: prep.para,
							reference: { "prep.para": [2] },
						},
						{ word: "then" },
					],
				},
				{
					id: 19,
					sentence: "I have to leave at 2:00 and he can't",
					translation: "I have to leave A 2:00 Y he NO can",
					data: [
						{ word: "I" },
						{ word: "have" },
						{ word: "to", translation: prep.a },
						{ word: "leave" },
						{ word: "at", translation: prep.a },
						{ word: "2:00" },
						{ word: "and", translation: conj.y },
						{ word: "he" },
						{
							phrase: "can't",
							translation: advrb.no,
							phraseTranslation: "NO can",
							reference: { "advrb.no": [6] },
						},
					],
				},
				{
					id: 20,
					sentence: "It's a girl that I know; that's why she knows you",
					translation: "It's UNA girl QUE I know, POR ESO she TE knows",
					data: [
						{ word: "It's" },
						{ word: "a", translation: artcl.una },
						{ word: "girl" },
						{
							phrase: "that I know",
							translation: conj.que,
							phraseTranslation: "QUE I know",
							reference: { "conj.que": [1] },
						},
						{
							word: "that's why",
							translation: [prep.por, pron.eso],
							phraseTranslation: "POR ESO",
							reference: { "prep.por": [9] },
						},

						{
							phrase: "she knows you",
							translation: dObj.te,
							phraseTranslation: "she TE knows",
						},
					],
				},
				{
					id: 21,
					sentence: "He didn't bring me along this street	",
					translation: "He NO ME brought ALONG this street",
					data: [
						{ word: "He" },
						{
							phrase: "didn't bring me",
							translation: [advrb.no, dObj.me],
							phraseTranslation: "NO ME brought",
							reference: { "advrb.no": [7] },
						},
						{
							word: "along",
							translation: prep.por,
							reference: { "prep.por": [7] },
						},
						{ word: "this" },
						{ word: "street" },
					],
				},
			],
		},
		10: {
			lesson: 10,
			name: "Lesson 10",
			details: "Articles and Direct Obj Pronouns: LOS and LAS",
			info: [
				"LOS and LAS can be DIRECT OBJ PRONOUNS that mean THEM (M/F) in Spanish ",
				"LOS and LAS can also be ARTICLES that mean THE (pluralized) : The/LOS Men, The/LAS women",
				"Que' is another Pronoun meaning WHAT, usually used to turn sentences into questions",
			],
			wordBank: [artcl.los, artcl.las, dObj.los, dObj.las],
			sentences: [
				{
					id: 1,
					sentence: "The girls visited them(M)",
					translation: "LAS girls LOS visited",
					data: [
						{ word: "The", translation: artcl.las },
						{ word: "girls" },
						{
							word: "visited them",
							translation: dObj.los,
							phraseTranslation: "LOS visited",
						},
					],
				},
				{
					id: 2,
					sentence: "the boys know them(F)",
					translation: "LOS boys LAS know",
					data: [
						{ word: "the", translation: artcl.los },
						{ word: "boys" },
						{
							word: "know them",
							translation: dObj.las,
							phraseTranslation: "LAS know",
						},
					],
				},
				{
					id: 3,
					sentence: "The man doesn't see them (F)",
					translation: "EL man NO LAS see",
					data: [
						{ word: "The", translation: artcl.el },
						{ word: "man" },
						{
							phrase: "doesn't see them",
							translation: [advrb.no, dObj.las],
							phraseTranslation: "NO LAS see",
							reference: { "advrb.no": [7] },
						},
					],
				},
				{
					id: 4,
					sentence: "We won't have them(M) at the table	",
					translation: "We NO LOS will have EN the table",
					data: [
						{ word: "We" },
						{
							phrase: "won't have them",
							translation: [advrb.no, dObj.los],
							phraseTranslation: "NO LOS will have",
							reference: { "advrb.no": [7] },
						},
						{
							word: "at",
							translation: prep.en,
						},
						{ word: "the" },
						{ word: "table" },
					],
				},
				{
					id: 5,
					sentence: "They worked with what?",
					translation: "They worked CON QUE?",
					data: [
						{ word: "They" },
						{ word: "worked" },
						{ word: "with", translation: prep.con },
						{
							phrase: "what?",
							translation: pron.que,
						},
					],
				},
				{
					id: 6,
					sentence: "What hit him?",
					translation: "Que lo hit?",
					data: [
						{
							word: "What",
							translation: pron.que,
						},
						{
							word: "hit him",
							tranlation: dObj.lo,
							phraseTranslation: "lo hit",
						},
					],
				},
				{
					id: 7,
					sentence: "You found them(F) with what?",
					translation: "You LAS found CON QUE?",
					data: [
						{
							word: "You found them",
							translation: dObj.las,
							phraseTranslation: "You LAS found",
						},

						{ word: "with", translation: prep.con },
						{
							phrase: "what?",
							translation: pron.que,
						},
					],
				},
				{
					id: 8,
					sentence: "What is that for?",
					translation: "PARA QUE is ESO",
					data: [
						{
							phrase: "What is that for",
							translation: [conj.que, prep.para, pron.eso],
							phraseTranslation: "PARA QUE is ESO",
							reference: {
								"prep.para": [
									4,
									"Spanish prepositions must be followed by a noun, so we can't end a sentence with a preposition",
								],
							},
						},
					],
				},
				{
					id: 9,
					sentence: "Why is the man at the store?",
					translation: "POR QUE is EL man EN the store",
					data: [
						{
							phrase: "Why",
							translation: [prep.por, pron.que],
							phraseTranslation: "POR QUE",
							reference: { "prep.por": [10] },
						},
						{ word: "is" },
						{ word: "the", translation: artcl.el },
						{ word: "man" },
						{
							word: "at",
							translation: prep.en,
						},
						{ word: "the" },
						{ word: "store" },
					],
				},
				{
					id: 10,
					sentence: "This is for the guys",
					translation: "This is PARA LOS guys",
					data: [
						{ word: "This" },
						{ word: "is" },
						{ word: "for", translation: prep.para },
						{ word: "the", translation: artcl.los },
						{ word: "guys" },
					],
				},
				{
					id: 11,
					sentence: "I didn't see a girl at 2:00",
					translation: "I NO saw una girl A 2:00",
					data: [
						{ word: "I" },
						{
							phrase: "didn't see",
							translation: advrb.no,
							phraseTranslation: "NO saw",
							reference: { "advrb.no": [7] },
						},
						{ word: "a", translation: artcl.una },
						{ word: "girl" },
						{
							word: "at",
							translation: prep.a,
							reference: { "prep.a": [0] },
						},
						{ word: "2:00" },
					],
				},
				{
					id: 12,
					sentence: "You need to be in the car at 2:00",
					translation: "You need to be EN the car A 2:00",
					data: [
						{ word: "You need to be" },
						{
							word: "in",
							translation: prep.en,
						},
						{ word: "the" },
						{ word: "car" },
						{
							word: "at",
							translation: prep.a,
							reference: { "prep.a": [0] },
						},
						{ word: "2:00" },
					],
				},
				{
					id: 13,
					sentence: "But why?",
					translation: "But POR QUE",
					data: [
						{ word: "But" },
						{
							phrase: "why?",
							translation: [prep.por, pron.que],
							phraseTranslation: "POR QUE",
							reference: { "prep.por": [10] },
						},
					],
				},
				{
					id: 14,
					sentence: "I left something for my boss at the office	",
					translation: "I left something PARA my boss EN the office",
					data: [
						{ word: "I left" },
						{ word: "something" },
						{ word: "for", translation: prep.para },
						{ word: "my" },
						{ word: "boss" },
						{
							word: "at",
							translation: prep.en,
						},
						{ word: "the" },
						{ word: "office" },
					],
				},
				{
					id: 15,
					sentence: "This was created by the girls",
					translation: "This was created POR LAS girls",
					data: [
						{ word: "This was created" },
						{
							word: "by",
							translation: prep.por,
						},
						{ word: "the", translation: artcl.las },
						{ word: "girls" },
					],
				},
				{
					id: 16,
					sentence: "On what did he put it?",
					translation: "EN QUE he LO put",
					data: [
						{
							word: "On",
							translation: prep.en,
						},
						{
							phrase: "what",
							translation: pron.que,
						},
						{
							word: "did he put it",
							translation: dObj.lo,
							phraseTranslation: "he LO put",
						},
					],
				},
				{
					id: 17,
					sentence: "The ladies saw her",
					translation: "LAS ladies LA saw",
					data: [
						{ word: "The", translation: artcl.las },
						{ word: "ladies" },
						{
							word: "saw her",
							translation: dObj.la,
							phraseTranslation: "LA saw",
						},
					],
				},
				{
					id: 18,
					sentence: "What isn't here yet?",
					translation: "QUE NO is here yet?",
					data: [
						{
							phrase: "What",
							translation: pron.que,
						},
						{
							phrase: "isn't here",
							translation: advrb.no,
							phraseTranslation: "NO is here?",
							reference: { "advrb.no": [6] },
						},
						{
							phrase: "yet?",
						},
					],
				},
				{
					id: 19,
					sentence: "I saw them(M) near the park",
					translation: "I LOS saw POR the park",
					data: [
						{ word: "I" },
						{
							word: "saw them",
							translation: dObj.lo,
							phraseTranslation: "LOS saw",
						},
						{
							word: "near",
							translation: prep.por,
							reference: { "prep.por": [5] },
						},
						{ word: "the park" },
					],
				},
				{
					id: 20,
					sentence: "I found it(M) beacuse of the smell",
					translation: "I LO found POR the smell",
					data: [
						{ word: "I" },
						{
							word: "found it",
							translation: dObj.lo,
							phraseTranslation: "LO found",
						},
						{
							word: "because of",
							translation: prep.por,
							reference: { "prep.por": [3] },
						},
						{ word: "the" },
						{ word: "smell" },
					],
				},
				{
					id: 21,
					sentence: "I have loved you for many years",
					translation: "I TE have loved POR many years",
					data: [
						{ word: "I" },
						{
							word: "have loved you",
							translation: dObj.te,
							phraseTranslation: "TE have loved",
						},
						{
							word: "for",
							translation: prep.por,
						},
						{ word: "many" },
						{ word: "years" },
					],
				},
				{
					id: 22,
					sentence: "A man confronted them(M)",
					translation: "UN man LOS confronted",
					data: [
						{ word: "A", translation: artcl.un },
						{ word: "man" },
						{
							word: "confronted them",
							translation: dObj.lo,
							phraseTranslation: "LOS confronted",
						},
					],
				},
				{
					id: 23,
					sentence: "What did you eat with it(F)?",
					translation: "CON QUE you LA ate",
					data: [
						{
							word: "(With) What",
							translation: [prep.con, pron.que],
							phraseTranslation: "CON QUE",
						},
						{
							word: "did you eat with it",
							translation: dObj.la,
							phraseTranslation: "you LA ate",
						},
					],
				},
				{
					id: 24,
					sentence: "I left them(F) with their parents",
					translation: "I LAS left CON their parents",
					data: [
						{ word: "I" },
						{
							word: "left them",
							translation: dObj.las,
							phraseTranslation: "LAS left",
						},
						{
							word: "with",
							translation: prep.con,
						},
						{ word: "their parents" },
					],
				},
				{
					id: 25,
					sentence: "Don't bother the men with that",
					translation: "NO bother LOS men CON ESO",
					data: [
						{
							word: "Don't bother",
							translation: advrb.no,
							phraseTranslation: "NO bother",
							reference: { "advrb.no": [7] },
						},
						{
							word: "the men",
							translation: dObj.lo,
							phraseTranslation: "LOS men",
						},
						{
							word: "with",
							translation: prep.con,
						},
						{ word: "that", translation: pron.eso },
					],
				},
				{
					id: 26,
					sentence: "I'm on the list; that's why he knows me",
					translation: "I'm EN the list, POR ESO he ME knows	",
					data: [
						{ word: "I'm" },
						{
							word: "on",
							translation: pron.en,
						},
						{ word: "the list" },
						{
							word: "that's why",
							translation: [prep.por, pron.eso],
							phraseTranslation: "POR ESO",
							reference: { "prep.por": [9] },
						},
						{
							word: "He knows me",
							transloation: dObj.me,
							phraseTranslation: "he ME knows",
						},
					],
				},
				{
					id: 27,
					sentence: "I can't see them(F)",
					translation: "I NO LAS can see",
					data: [
						{ word: "I" },
						{
							word: "can't",
							translation: advrb.no,
							phraseTranslation: "NO can",
							reference: { "advrb.no": [6] },
						},
						{
							word: "see them",
							translation: dObj.las,
							phraseTranslation: "LAS see",
						},
					],
				},
			],
		},
		11: {
			lesson: 11,
			name: "Lesson 11",
			details: "Expressing abstract ideas",
			wordBank: [],
			info: [
				"Learning to express abstract concepts is more constructive to Deep Language Learning than learning lots of vocab words.",
				"MOST of what we say in any language doesn't consist of simple concrete labels for things, instead we talk about intangible ideas almost constantly",
				"Consider the sentence: `I'd prefer that they do it by this afternoon`, seems simple in English, but to express this in another language requires some really deep knowledge of how the language works.",
				"That sentence is a sort of INTENTION, you are expressing that this IDEA of them doing it by this afernoon is SOMETHING that you want.",
				"This sentence type is commonly seen like: 'I predict that they'll....' or 'I like that they....'",
				"We will learn the words you use for preferring, or predicting, or liking something soon, but currently we want to know exactly HOW and WHERE those words get used in a sentence",
				"Let's play the FOOD game with the previous Sentence; 'I'd prefer that they do it by this afternoon'. \nThis can be turned into 'I'd prefer FOOD!",
				"This is the magic of turning rich, complex ideas into nouns! Imagine mastering the lanugage so well that you can take all you most unique thoughts, opinions, reactions, and interntions, and express them as easily as a simple word like FOOD!",
				"The whole KEY to doing this is the #1 word in Spanish... QUE!. \nThis word lets us take any abstract idea and package it as a NOUN PHRASE to use in a sentence.",
				"In sentences like 'I predict that...' the entire phrase that starts with that / QUE can be treated as the noun, we call this a 'QUE PHRASE!'",
				"A common idiom related to this idea is PARA QUE, meaning 'So that' or 'In order that'",
				"PARA being a Preposition, needs to be followed by a noun, and in this case it is since QUE is the start of the NOUN PHRASE. 'I brought him PARA (QUE he could meet her)'.",
				"Another QUE phrase includes the other qué meaning WHAT, like What Luck!. Qué luck! In English we use HOW for this. HOW strange that he's here = Qué stange QUE he's here!",
				"One last use for QUE the Conjunction (no accent) besides THAT is THAN, as in 'He is taller THAN his brother'.",
			],
			sentences: [
				{
					id: 1,
					sentence: "She did it so that I would notice her",
					translation: "She LO did PARA QUE I LA would notice",
					data: [
						{
							phrase: "She did it",
							translation: dObj.lo,
							phraseTranslation: "She LO did",
						},
						{
							phrase: "so that",
							translation: [prep.para, conj.que],
							phraseTranslation: "PARA QUE",
							reference: { "prep.para": [5] },
						},
						{
							phrase: "I would notice her",
							translation: [dObj.la],
							phraseTranslation: "I LA would notice",
						},
					],
				},
				{
					id: 2,
					sentence: "The girls are here so that you can take a break",
					translation: "LAS girls are here PARA QUE you can take a break",
					data: [
						{ word: "The", translation: artcl.las },
						{ word: "girls are here" },
						{
							phrase: "so that",
							translation: [prep.para, conj.que],
							phraseTranslation: "PARA QUE",
							reference: { "prep.para": [5] },
						},
						{
							phrase: "you can take a break",
						},
					],
				},
				{
					id: 3,
					sentence: "How scary that you almost crashed",
					translation: "Que scary QUE you almost crashed",
					data: [
						{
							phrase: "How scary",
							translation: pron.que,
							reference: { "pron.que": [0] },
						},
						{
							phrase: "that",
							translation: conj.que,
						},
						{
							phrase: "you almost crashed",
						},
					],
				},
				{
					id: 4,
					sentence: "How cool that he's with her",
					translation: "QUE cool QUE he's with her",
					data: [
						{
							phrase: "How cool",
							translation: pron.que,
							reference: { "pron.que": [0] },
						},
						{
							phrase: "that",
							translation: conj.que,
						},
						{
							word: "he's",
						},
						{
							phrase: "with",
							translation: prep.con,
						},
						{
							phrase: "her",
						},
					],
				},
				{
					id: 5,
					sentence: "How sad that the girl didn't win",
					translation: "Que sad QUE LA girl no did win",
					data: [
						{
							phrase: "How sad",
							translation: pron.que,
							reference: { "pron.que": [0] },
						},
						{
							phrase: "that",
							translation: conj.que,
						},
						{
							word: "The girl",
							translation: artcl.la,
							phraseTranslation: "LA girl",
						},
						{
							phrase: "didn't win",
							translation: advrb.no,
							phraseTranslation: "NO did win",
							reference: { "advrb.no": [7] },
						},
					],
				},
				{
					id: 6,
					sentence: "She and I said he was with him",
					translation: "She Y I said QUE he was CON him",
					data: [
						{
							phrase: "She",
						},
						{
							phrase: "and",
							translation: conj.y,
						},
						{
							phrase: "I",
						},
						{
							phrase: "said",
							translation: conj.que,
							phraseTranslation: "said QUE",
							reference: { "conj.que": [1] },
						},
						{
							phrase: "he was",
						},
						{
							phrase: "with",
							translation: prep.con,
						},
						{
							phrase: "him",
						},
					],
				},
				{
					id: 7,
					sentence: "That it's a paper airplane amuses me",
					translation: "QUE it's an airplace DE paper ME amuses",
					data: [
						{
							phrase: "That",
							translation: conj.que,
						},
						{
							phrase: "it's a",
						},
						{
							phrase: "paper airplane",
							phraseTranslation: "airplace DE paper",
							translation: [prep.de],
							reference: { "prep.de": [4] },
						},
						{
							phrase: "amuses me",
							phraseTranslation: "ME amuses",
							translation: dObj.me,
						},
					],
				},
				{
					id: 8,
					sentence: "Why did he go along this street?",
					translation: "POR QUE did he go POR this street?",
					data: [
						{
							phrase: "Why",
							translation: [prep.por, pron.que],
							phraseTranslation: "POR QUE",
							reference: { "prep.por": [10] },
						},
						{
							phrase: "did he go",
						},
						{
							phrase: "along",
							translation: prep.por,
							reference: { "prep.por": [6] },
						},
						{
							phrase: "this street",
						},
					],
				},
				{
					id: 9,
					sentence: "A man did it so that she would find you",
					translation: "UN man LO did PARA QUE she TE would find",
					data: [
						{
							phrase: "A man",
							translation: artcl.un,
							phraseTranslation: "UN man",
						},
						{
							phrase: "did it",
							translation: advrb.lo,
							phraseTranslation: "LO did",
						},
						{
							phrase: "so that",
							translation: [prep.para, conj.que],
							phraseTranslation: "PARA QUE",
							reference: { "prep.para": [5], "pron.que": [1] },
						},
						{
							phrase: "She would find you",
							translation: [dObj.te],
							phraseTranslation: "She TE would find",
						},
					],
				},
				{
					id: 10,
					sentence: "This can't be becasue of a girl",
					translation: "This NO can be POR UNA girl",
					data: [
						{
							phrase: "This",
						},
						{
							phrase: "can't be",
							translation: advrb.no,
							phraseTranslation: "NO can be",
							reference: { "advrb.no": [6] },
						},
						{
							phrase: "becasue of",
							translation: prep.por,
							reference: { "prep.por": [3] },
						},
						{
							phrase: "a girl",
							translation: artcl.una,
							phraseTranslation: "UNA girl",
						},
					],
				},
				{
					id: 11,
					sentence: "How funny that that wasn't for him",
					translation: "Que funny QUE ESO NO was PARA him",
					data: [
						{
							phrase: "How funny",
							translation: conj.que,
							phraseTranslation: "Que funny",
							reference: { "pron.que": [0] },
						},
						{
							phrase: "that",
							translation: conj.que,
						},
						{
							word: "that",
							translation: pron.eso,
						},
						{
							phrase: "wasn't",
							translation: advrb.no,
							phraseTranslation: "NO was",
							reference: { "advrb.no": [6] },
						},
						{
							phrase: "for",
							translation: prep.para,
							reference: { "prep.para": [0] },
						},
					],
				},
				{
					id: 12,
					sentence: "What do you do around here?",
					translation: "Que do you do POR here?",
					data: [
						{
							phrase: "Que",
							translation: pron.que,
						},
						{
							phrase: "do you do",
						},
						{
							phrase: "around",
							translation: prep.por,
							reference: { "prep.por": [5] },
						},
						{
							phrase: "here",
						},
					],
				},
				{
					id: 13,
					sentence: "I met them(F) at the park, how unlikely!",
					translation: "I LAS met EN the park, QUE unlikely!",
					data: [
						{ word: "I" },
						{
							word: "met them",
							translation: dObj.las,
							phraseTranslation: "LAS met",
						},
						{
							word: "at",
							translation: prep.en,
						},
						{ word: "the" },
						{ word: "park" },
						{
							phrase: "how unlikely",
							translation: pron.que,
							phraseTranslation: "QUE unlikely",
							reference: { "pron.que": [0] },
						},
					],
				},
				{
					id: 14,
					sentence: "He is from Peru, that's why the guys know him",
					translation: "He is DE Peru, POR ESO LOS guys LO know",
					data: [
						{ word: "He is" },
						{
							phrase: "from",
							translation: prep.de,
						},
						{
							phrase: "Peru",
						},
						{
							phrase: "that's why",
							translation: [prep.por, pron.eso],
							phraseTranslation: "POR ESO",
							reference: { "prep.por": [9] },
						},
						{
							phrase: "the",
							translation: artcl.los,
						},
						{ word: "guys" },
						{
							phrase: "know him",
							translation: dObj.lo,
							phraseTranslation: "LO know",
						},
					],
				},
				{
					id: 15,
					sentence: "The man will be at the bank at 1:30",
					translation: "EL man will be EN the bank A 1:30",
					data: [
						{ word: "The", translation: artcl.el },
						{ word: "man" },
						{
							phrase: "will be",
						},
						{
							phrase: "at",
							translation: prep.en,
						},
						{ word: "the" },
						{ word: "bank" },
						{
							phrase: "at 1:30",
							translation: prep.a,
							phraseTranslation: "A 1:30",
							reference: { "prep.a": [0] },
						},
					],
				},
				{
					id: 16,
					sentence: "How nice that the girl found her",
					translation: "Que nice QUE LA girl LA found",
					data: [
						{
							phrase: "How nice",
							translation: pron.que,
							phraseTranslation: "Que nice",
							reference: { "pron.que": [0] },
						},
						{
							phrase: "that",
							translation: conj.que,
						},
						{
							phrase: "the",
							translation: artcl.la,
						},
						{ word: "girl" },
						{
							phrase: "found her",
							translation: dObj.la,
							phraseTranslation: "LA found",
						},
					],
				},
				{
					id: 17,
					sentence: "That should impress them(M) by tomorrow",
					translation: "ESO LOS should impress PARA tomorrow",
					data: [
						{
							phrase: "That",
							translation: pron.eso,
						},
						{
							phrase: "should impress them",
							translation: dObj.los,
							phraseTranslation: "LOS should impress",
						},
						{
							phrase: "by",
							translation: prep.para,
							reference: { "prep.para": [2] },
						},
						{
							phrase: "tomorrow",
						},
					],
				},
				{
					id: 18,
					sentence: "My mom's book is by a Columbian author (M)",
					translation: "The book DE my mom is POR UN columbian author",
					data: [
						{
							phrase: "My mom's book",
							translation: prep.de,
							phraseTranslation: "The book DE my mom",
							reference: { "prep.de": [2] },
						},
						{
							word: "is",
						},
						{
							phrase: "by",
							translation: prep.por,
							reference: { "prep.por": [1] },
						},
						{
							word: "A",
							translation: artcl.un,
						},
						{
							phrase: "Columbian author",
						},
					],
				},
				{
					id: 19,
					sentence: "The ladies said that so that I would find him",
					translation: "LAS ladies said ESO PARA QUE I LO would find",
					data: [
						{
							phrase: "The",
							translation: artcl.las,
						},
						{ word: "ladies" },
						{
							phrase: "said",
						},
						{
							phrase: "that",
							translation: pron.eso,
						},
						{
							phrase: "so that",
							translation: [prep.para, conj.que],
							phraseTranslation: "PARA QUE",
							reference: { "prep.para": [5] },
						},
						{
							phrase: "I would find him",
						},
					],
				},
			],
		},
		12: {
			lesson: 12,
			name: "Lesson 12",
			details: "Verbs: IS in Spanish. ES!",
			wordBank: [verb.ser.present.es],
			info: [
				verb.info[4],
				verb.info[5],
				verb.info[6],
				verb.info[7],
				verb.info[8],
				verb.ser.present.es.info[0],
				"ES is actually a CONJUGATION of SER, which we will discuss next lesson, it is also the 7th most common word!",
				verb.ser.present.es.info[1],
				verb.ser.present.es.info[2],
				"For all the sentences in this lesson we will only be using IS/ES if it has a noun right after it, to describe WHAT that SOMETHING is! Basically if there's not a noun after IS don't translate it as ES, leave as English.",
			],
			sentences: [
				{
					id: 1,
					sentence: "The girl in the car is my friend",
					translation: "LA girl EN the car ES my friend",
					data: [
						{
							phrase: "The",
							translation: artcl.la,
						},
						{ word: "girl" },
						{
							phrase: "in",
							translation: prep.en,
						},
						{
							phrase: "the",
						},
						{ word: "car" },
						{
							phrase: "is",
							translation: verb.ser.present.es,
						},
						{
							phrase: "my friend",
						},
					],
				},
				{
					id: 2,
					sentence: "The man with glasses is a nice guy",
					translation: "EL man CON glasses ES UN nice guy",
					data: [
						{
							phrase: "The",
							translation: artcl.el,
						},
						{ word: "man" },
						{
							phrase: "with",
							translation: prep.con,
						},
						{
							phrase: "glasses",
						},
						{
							phrase: "is",
							translation: verb.ser.present.es,
						},
						{
							phrase: "a",
							translation: artcl.un,
						},
						{
							phrase: "nice guy",
						},
					],
				},
				{
					id: 3,
					sentence: "What is that?",
					translation: "Que es eso?",
					data: [
						{
							phrase: "What",
							translation: pron.que,
						},
						{
							phrase: "is",
							translation: verb.ser.present.es,
						},
						{
							phrase: "that",
							translation: pron.eso,
						},
					],
				},
				{
					id: 4,
					sentence: "Yes, that's why the book is on the table",
					translation: "Yes, POR ESO the book is ON the table",
					data: [
						{
							phrase: "Yes",
						},
						{
							phrase: "that's why",
							translation: [prep.por, pron.eso],
							phraseTranslation: "POR ESO",
							reference: { "prep.por": [9] },
						},
						{
							phrase: "the book",
						},
						{
							phrase: "is on the table",
							translation: [prep.en],
							phraseTranslation: "is ON the table",
							mixup: verb.ser.present.es,
						},
					],
				},
				{
					id: 5,
					sentence: "This is my mom's dog(F)",
					translation: "This ES LA dog DE my mom",
					data: [
						{
							phrase: "This",
						},
						{
							phrase: "is",
							translation: verb.ser.present.es,
						},
						{
							phrase: "my mom's dog",
							translation: [artcl.la, dObj.de],
							phraseTranslation: "LA dog DE my mom",
						},
					],
				},
				{
					id: 6,
					sentence: "He is here during the mornings",
					translation: "He is here POR the mornings",

					data: [
						{
							phrase: "He is here",
							mixup: verb.ser.present.es,
						},
						{
							phrase: "during",
							translation: prep.por,
							reference: { "prep.por": [8] },
						},
						{
							phrase: "the mornings	",
						},
					],
				},
				{
					id: 7,
					sentence: "How embarrassing",
					translation: "Que embarrassing",
					data: [
						{
							phrase: "How",
							translation: pron.que,
							reference: { "pron.que": [0] },
						},
						{
							phrase: "embarrassing",
						},
					],
				},
				{
					id: 8,
					sentence: "I made dinner so that you could rest",
					translation: "I made dinner PARA QUE you could rest",
					data: [
						{
							phrase: "I made dinner",
						},
						{
							phrase: "so that",
							translation: [prep.para, conj.que],
							phraseTranslation: "PARA QUE",
							reference: { "prep.para": [5] },
						},
						{
							phrase: "you could rest",
						},
					],
				},
				{
					id: 9,
					sentence: "Why did you walk along this road in the snow?",
					translation: "POR QUE did you walk POR this road EN the snow?",
					data: [
						{
							phrase: "Why",
							translation: [prep.por, pron.que],
							phraseTranslation: "POR QUE",
							reference: { "prep.por": [10] },
						},
						{
							phrase: "did you walk",
						},
						{
							phrase: "along",
							translation: prep.por,
							reference: { "prep.por": [6] },
						},
						{
							phrase: "this road",
						},
						{
							phrase: "in",
							translation: prep.en,
						},
						{
							phrase: "the snow",
						},
					],
				},
				{
					id: 10,
					sentence: "This is a paper book by a young author(M)",
					translation: "This ES a book DE paper POR UN young author",
					data: [
						{
							phrase: "This",
						},
						{
							phrase: "is",
							translation: verb.ser.present.es,
						},
						{
							phrase: "a",
						},
						{
							phrase: "paper book",
							phraseTranslation: "book DE paper",
							translation: dObj.de,
						},
						{
							phrase: "by",
							translation: prep.por,
							reference: { "prep.por": [1] },
						},
						{
							phrase: "a young author",
							translation: [artcl.un],
							phraseTranslation: "UN young author",
						},
					],
				},
				{
					id: 11,
					sentence: "This is the man who met them(M).",
					translation: "This ES EL man who LOS met.",
					data: [
						{
							phrase: "This",
						},
						{
							phrase: "is",
							translation: verb.ser.present.es,
						},
						{
							phrase: "the man",
							translation: [artcl.el],
							phraseTranslation: "EL man",
						},
						{
							phrase: "who",
						},
						{
							phrase: "met them",
							translation: dObj.los,
							phraseTranslation: "LOS met",
						},
					],
				},
				{
					id: 12,
					sentence: "You can't do better than that",
					translation: "You NO can do better QUE ESO",
					data: [
						{
							phrase: "You",
						},
						{
							phrase: "can't do",
							translation: advrb.no,
							phraseTranslation: "NO can do",
							reference: { "advrb.no": [6] },
						},
						{
							phrase: "better",
						},
						{
							phrase: "than",
							translation: conj.que,
							reference: { "conj.que": [3] },
						},
						{
							phrase: "that",
							translation: pron.eso,
						},
					],
				},
				{
					id: 13,
					sentence: "He is always at work at 7:00",
					translation: "He is always EN work A 7:00",
					data: [
						{
							phrase: "He is always",
							mixup: verb.ser.present.es,
						},
						{
							phrase: "at",
							translation: prep.en,
						},
						{
							phrase: "work",
						},
						{
							phrase: "at",
							translation: prep.a,
							reference: { "prep.a": [0] },
						},
						{
							phrase: "7:00",
						},
					],
				},
				{
					id: 14,
					sentence: "We made this for you, because of your good work",
					translation: "We made this PARA you, POR your good work",
					data: [
						{
							phrase: "We made this",
						},
						{
							phrase: "for",
							translation: prep.para,
							reference: { "prep.para": [0] },
						},
						{
							phrase: "you",
						},
						{
							phrase: "because of",
							translation: prep.por,
							reference: { "prep.por": [3] },
						},
						{
							phrase: "your good work",
						},
					],
				},
				{
					id: 15,
					sentence: "How strange that this is translated into Spanglish",
					translation: "Que strange QUE this is translated into Spanglish",
					data: [
						{
							phrase: "How strange",
							translation: pron.que,
							phraseTranslation: "Que strange",
							reference: { "pron.que": [0] },
						},
						{
							phrase: "that",
							translation: conj.que,
							reference: { "conj.que": [3] },
						},
						{
							phrase: "this is translated into Spanglish",
							mixup: verb.ser.present.es,
						},
					],
				},
				{
					id: 16,
					sentence: "Sara's son saw them(M) with that",
					translation: "EL son DE sara LOS saw CON ESO",
					data: [
						{
							phrase: "Sara's son",
							translation: [artcl.el, prep.de],
							phraseTranslation: "EL son DE sara",
						},
						{
							phrase: "saw them",
							translation: dObj.los,
							phraseTranslation: "LOS saw",
						},
						{
							phrase: "with",
							translation: prep.con,
						},
						{
							phrase: "that",
							translation: pron.eso,
						},
					],
				},
				{
					id: 17,
					sentence: "This is the homework that I must do by tonight",
					translation: "This ES the homework QUE I must do PARA tonight",
					data: [
						{
							phrase: "This",
						},
						{
							phrase: "is",
							translation: verb.ser.present.es,
						},
						{
							phrase: "the homework",
						},
						{
							phrase: "that",
							translation: conj.que,
						},
						{
							phrase: "I must do",
						},
						{
							phrase: "by",
							translation: prep.para,
							reference: { "prep.para": [2] },
						},
						{
							phrase: "tonight",
						},
					],
				},
				{
					id: 18,
					sentence: "The girl that is walking near the park is my friend",
					translation: "LA girl QUE is walking POR the park ES my friend",
					data: [
						{
							phrase: "The",
							translation: artcl.la,
						},
						{
							phrase: "girl",
						},
						{
							phrase: "that",
							translation: conj.que,
						},
						{
							phrase: "is",
						},
						{
							phrase: "walking",
						},
						{
							phrase: "near",
							translation: prep.por,
							reference: { "prep.por": [5] },
						},
						{
							phrase: "the park",
						},
						{
							phrase: "is",
							translation: verb.ser.present.es,
						},
						{
							phrase: "my friend",
						},
					],
				},
			],
		},
		13: {
			lesson: 13,
			name: "Lesson 13",
			details: "Verbs: Conjugating SER",
			wordBank: [
				verb.ser.present.soy,
				verb.ser.present.eres,
				verb.ser.present.es,
				verb.ser.present.somos,
				verb.ser.present.son,
			],
			info: [
				"We learned the word ES for IS, but ES is only one small part of SER, a big Spanish verb with many different forms to learn.",
				'It turns out we use different forms of verbs in English too, changing the word "is" to different forms, like "are" "am" etc.',
				verb.info[10],
				'The parent word of "are" "is" "am" etc. is TO BE, or in Spanish SER. So ES is just one of many forms of SER, like IS is a form of TO BE.',
				'We are learning "Conjugating" which is changing the verb to agree with the context of the sentence it is a part of. I AM, you ARE, he IS',
				verb.info[11],
				"Conjugations for SER: \nI am = I SOY \nYou are = You ERES \nHe/She/It is = He/She/It ES \nWe are = We SOMOS \nThey are = They SON",
				"What about the word SER itself? It's the equivalent of the term 'to be' in English. SER is the name of the verb, representing all the conjugations we've learned so far. \n'Is', 'Are', 'Am', are all conjugations of 'to be' just as ES, ERES, and SOY are all conjugations of SER!",
				"Remember we are still only translating the IS/ES version of SER if it is SPECIFICALLY referring to WHAT something is, not where, or how, or what it is doing. Just what it is.",
			],
			sentences: [
				{
					id: 1,
					sentence: "We are students",
					translation: "We SOMOS students",
					data: [
						{
							phrase: "We",
						},
						{
							phrase: "are",
							translation: verb.ser.present.somos,
						},
						{
							phrase: "students",
						},
					],
				},
				{
					id: 2,
					sentence: "I am his daughter",
					translation: "I SOY his daughter",
					data: [
						{
							phrase: "I",
						},
						{
							phrase: "am",
							translation: verb.ser.present.soy,
						},
						{
							phrase: "his daughter",
						},
					],
				},
				{
					id: 3,
					sentence: "They are students",
					translation: "They SON students",
					data: [
						{
							phrase: "They",
						},
						{
							phrase: "are",
							translation: verb.ser.present.son,
						},
						{
							phrase: "students",
						},
					],
				},
				{
					id: 4,
					sentence: "You are my cousin",
					translation: "You ERES my cousin",
					data: [
						{
							phrase: "You",
						},
						{
							phrase: "are",
							translation: verb.ser.present.eres,
						},
						{
							phrase: "my cousin",
						},
					],
				},
				{
					id: 5,
					sentence: "I like to be a student",
					translation: "I like SER a student",
					data: [
						{
							phrase: "I like",
						},
						{
							phrase: "to be",
							translation: verb.ser,
						},
						{
							phrase: "a student",
						},
					],
				},
				{
					id: 6,
					sentence: "To be president would be cool",
					translation: "SER president would be cool",
					data: [
						{
							phrase: "To be",
							translation: verb.ser,
						},
						{
							phrase: "president would be cool",
						},
					],
				},
				{
					id: 7,
					sentence: "I want to be a good student",
					translation: "I want SER a good student",
					data: [
						{
							phrase: "I want",
						},
						{
							phrase: "to be",
							translation: verb.ser,
						},
						{
							phrase: "a good student",
						},
					],
				},
				{
					id: 8,
					sentence: "They want to be good friends",
					translation: "They want SER good friends",
					data: [
						{
							phrase: "They want",
						},
						{
							phrase: "to be",
							translation: verb.ser,
						},
						{
							phrase: "good friends",
						},
					],
				},
				{
					id: 9,
					sentene: "What is there in the kitchen?",
					translation: "QUE is there in the kitchen?",
					data: [
						{
							phrase: "QUE",
							translation: pron.que,
						},
						{ phrase: "is there in the kitchen?", mixup: verb.ser.present.es },
					],
				},
				{
					id: 10,
					sentence: "She and I are sisters",
					translation: "She Y I SOMOS sisters",
					data: [
						{
							phrase: "She",
						},
						{
							phrase: "and",
							translation: conj.y,
						},
						{
							phrase: "I",
						},
						{
							phrase: "are",
							translation: verb.ser.present.somos,
						},
						{
							phrase: "sisters",
						},
					],
				},
				{
					id: 11,
					sentence: "They are my friends.",
					translation: "They SON my friends.",
					data: [
						{
							phrase: "They",
						},
						{
							phrase: "are",
							translation: verb.ser.present.son,
						},
						{
							phrase: "my friends.",
						},
					],
				},
				{
					id: 12,
					sentence: "That is a problem",
					translation: "ESO ES a problem",
					data: [
						{
							phrase: "That",
							translation: pron.eso,
						},
						{
							phrase: "is",
							translation: verb.ser.present.es,
						},
						{
							phrase: "a problem",
						},
					],
				},
				{
					id: 13,
					sentence: "I am working with them",
					translation: "I am working CON them",
					data: [
						{
							phrase: "I am working",
							mixup: verb.ser.present.soy,
						},
						{
							phrase: "with",
							translation: conj.con,
						},
						{
							phrase: "them",
						},
					],
				},
				{
					id: 14,
					sentence: "This is my brother",
					translation: "This ES my brother",
					data: [
						{
							phrase: "This",
						},
						{
							phrase: "is",
							translation: verb.ser.present.es,
						},
						{
							phrase: "my brother",
						},
					],
				},
				{
					id: 15,
					sentence: "I am a good guy, really!",
					translation: "I SOY UN good guy, really!",
					data: [
						{
							phrase: "I",
						},
						{
							phrase: "am",
							translation: verb.ser.present.soy,
						},
						{
							phrase: "a",
							tranlations: artcl.un,
						},
						{
							phrase: "good guy, really!",
						},
					],
				},
				{
					id: 16,
					sentence: "I think they are running around here.",
					translation: "I think QUE they are running POR here.",
					data: [
						{
							phrase: "I think",
							translation: conj.que,
							phraseTranslation: "I think QUE",
							reference: { "conj.que": [1] },
						},
						{
							phrase: "they are running",
							mixup: verb.ser.present.son,
						},
						{
							phrase: "POR",
							translation: prep.por,
							reference: { "prep.por": [5] },
						},
						{
							phrase: "here.",
						},
					],
				},
				{
					id: 17,
					sentence: "The man and the woman are my relatives",
					translation: "EL man Y LA woman SON my relatives",
					data: [
						{
							phrase: "The",
							translation: artcl.el,
						},
						{
							phrase: "man",
						},
						{
							phrase: "and",
							translation: conj.y,
						},
						{
							phrase: "the",
							translation: artcl.la,
						},
						{
							phrase: "woman",
						},
						{
							phrase: "are",
							translation: verb.ser.present.somos,
						},
						{
							phrase: "my relatives",
						},
					],
				},
				{
					id: 18,
					sentence: "I promise I am a good student(F)",
					translation: "I promise QUE I SOY UNA good student",
					data: [
						{
							phrase: "I promise",
							translation: conj.que,
							phraseTranslation: "I promise QUE",
							reference: { "conj.que": [1] },
						},
						{
							phrase: "I",
						},
						{
							phrase: "am",
							translation: verb.ser.present.soy,
						},
						{
							phrase: "a",
							tranlations: artcl.una,
						},
						{
							phrase: "good student",
						},
					],
				},
				{
					id: 19,
					sentence: "You aren't a model student(F)?",
					translation: "You NO ERES UNA model student?",
					data: [
						{
							phrase: "You",
						},
						{
							phrase: "aren't",
							translation: [verb.ser.present.eres, pron.no],
							phraseTranslation: "NO ERES",
							reference: { "pron.no": [6] },
						},
						{
							phrase: "a",
							tranlations: artcl.una,
						},
						{
							phrase: "model student",
						},
					],
				},
				{
					id: 20,
					sentence: "You are in the wrong place",
					translation: "You are EN the wrong place",
					data: [
						{
							phrase: "You are",
							mixup: verb.ser.present.eres,
						},
						{
							phrase: "in",
							translation: prep.en,
						},
						{
							phrase: "the wrong place",
						},
					],
				},
				{
					id: 21,
					sentence: "That is slipping away",
					translation: "ESO is slipping away",
					data: [
						{
							phrase: "That",
							translations: pron.eso,
						},
						{
							phrase: "is slipping away",
						},
					],
				},
				{
					id: 22,
					sentence: "He wants to be governor",
					translation: "He wants SER governor",
					data: [
						{
							phrase: "He wants",
						},
						{
							phrase: "to be",
							translation: verb.ser,
						},
						{
							phrase: "governor",
						},
					],
				},
				{
					id: 23,
					sentence: "The ladies know them(F)",
					translation: "LAS ladies LAS know",
					data: [
						{
							phrase: "The",
							translation: artcl.las,
						},
						{
							phrase: "ladies",
						},
						{
							phrase: "know them",
							translation: dObj.las,
							phraseTranslation: "LAS know",
						},
					],
				},
				{
					id: 24,
					sentence: "You are not my mother",
					translation: "You NO ERES my mother",
					data: [
						{
							phrase: "You",
						},
						{
							phrase: "aren't",
							translation: [verb.ser.present.eres, pron.no],
							phraseTranslation: "NO ERES",
							reference: { "pron.no": [6] },
						},
						{
							phrase: "my mother",
						},
					],
				},
				{
					id: 25,
					sentence: "Why didn't the girl see them(M)?",
					translation: "POR QUE LA girl NO LOS saw",
					data: [
						{
							phrase: "Why",
							translation: [prep.por, pron.que],
							phraseTranslation: "POR QUE",
							reference: { "prep.por": [10] },
						},
						{
							phrase: "didn't the girl",
							translation: [artcl.la, pron.no, dObj.los],
							phraseTranslation: "LA girl NO",
							reference: { "pron.no": [7] },
						},
						{
							phrase: "see them",
							translation: dObj.los,
							phraseTranslation: "LOS saw",
						},
					],
				},
				{
					id: 26,
					sentence: "The guys are with someone",
					translation: "LOS guys are CON someone",
					data: [
						{
							phrase: "The",
							translation: artcl.los,
						},
						{
							phrase: "guys",
						},
						{
							phrase: "are",
							mixup: verb.ser.present.son,
						},
						{
							phrase: "with",
							translation: prep.con,
						},
						{
							phrase: "someone",
						},
					],
				},
				{
					id: 27,
					sentence: "We are friends and that is a good thing",
					translation: "We SOMOS friends Y ESO ES a good thing",
					data: [
						{
							phrase: "We",
						},
						{
							phrase: "are",
							mixup: verb.ser.present.somps,
						},
						{
							phrase: "friends",
						},
						{
							phrase: "and",
							translation: conj.y,
						},
						{
							phrase: "that",
							translation: pron.eso,
						},
						{
							phrase: "is",
							translation: verb.ser.present.es,
						},
						{
							phrase: "a good thing",
						},
					],
				},
			],
		},
	},
}

export default spanishData
