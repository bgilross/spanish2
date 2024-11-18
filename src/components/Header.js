"use client"

import React from "react"
import { AppBar, Toolbar } from "@mui/material"
import { Box } from "@mui/system"
import { useTranslation } from "@/lib/TranslationContext"
import spanishData from "@/lib/spanishData"
import { useState, useEffect } from "react"
import { useQuiz } from "@/lib/QuizContext"

import { useAuth } from "@/lib/useAuth"
import GoogleLogin from "./GoogleLogin"

// import SpreadWord from "./SpreadWord"
// import GoogleLogin from "./GoogleLogin"

const Header = () => {
	const {
		// lessonNumber,
		// handleLessonChange,
		// quizType,
		// setQuizType,
		// sentenceIndex,
		// changeSentence,
	} = useTranslation()

	const { currentData, setCurrentData, handleLessonChange } = useQuiz()
	const { sentenceIndex, quizType, lessonNumber } = currentData

	const [value, setValue] = useState(3)

	const { user, loginWithGoogle, logout } = useAuth()

	useEffect(() => {
		console.log("Updating sentence select dropdown to index:", sentenceIndex)
	}, [sentenceIndex])

	const quizTypeSelect = (
		<select
			value={quizType}
			onChange={(e) =>
				setCurrentData({ ...currentData, quizType: e.target.value })
			}
		>
			<option value="parts">Parts</option>
			<option value="full">Full</option>
		</select>
	)
	const sentenceSelect = (
		<select
			value={sentenceIndex}
			onChange={(e) => assignNextSentence(sentenceIndex, e.target.value)}
		>
			{spanishData?.lessons[lessonNumber]?.sentences.map((sentence, index) => {
				return (
					<option
						key={index}
						value={index}
					>
						{sentence.id}
					</option>
				)
			})}
		</select>
	)
	const lessonSelect = (
		<select
			className="text-primary font-bold"
			value={lessonNumber}
			onChange={(e) => {
				handleLessonChange(e.target.value)
			}}
		>
			{Object.keys(spanishData.lessons).map((key) => (
				<option
					key={key}
					value={key}
				>
					{spanishData.lessons[key].name} {spanishData.lessons[key].details}
				</option>
			))}
		</select>
	)

	console.log("Current lessonNumber in Header:", lessonNumber)

	return (
		<AppBar
			position="sticky"
			className="bg-primary shadow-2xl shadow-red-900"
			sx={{
				borderBottomLeftRadius: "1rem",
				borderBottomRightRadius: "1rem",
				zIndex: 10,
				height: "8%",
				display: "flex",
				alignItems: "space-between",
				justifyContent: "center",
			}}
		>
			<Toolbar className="relative flex items-center justify-between px-6 py-4 h-20">
				<Box className="flex space-x-3 w-full">
					<div className="text-secondary font-bold text-4xl w-1/3 text-left">
						SpanishTester
					</div>
					<div className="w-1/3 flex items-center justify-center text-primary">
						<div className="text-lg space-x-4">
							{quizTypeSelect}
							{sentenceSelect}
						</div>
					</div>
					{lessonSelect}

					<GoogleLogin />
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default Header
