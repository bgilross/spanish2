"use client"

import React from "react"
import { AppBar, Toolbar } from "@mui/material"
import { Box } from "@mui/system"
import { useTranslation } from "@/lib/TranslationContext"
import spanishData from "@/lib/spanishData"
import { useState, useEffect } from "react"

import { useAuth } from "@/lib/useAuth"

// import SpreadWord from "./SpreadWord"
// import GoogleLogin from "./GoogleLogin"

const Header = () => {
	const {
		lessonNumber,
		handleLessonChange,
		quizType,
		setQuizType,
		sentenceIndex,
		changeSentence,
	} = useTranslation()
	const [value, setValue] = useState(3)

	const { user, loginWithGoogle, logout } = useAuth()

	useEffect(() => {
		console.log("Updating sentence select dropdown to index:", sentenceIndex)
	}, [sentenceIndex])

	const quizTypeSelect = (
		<select
			value={quizType}
			onChange={(e) => setQuizType(e.target.value)}
		>
			<option value="parts">Parts</option>
			<option value="full">Full</option>
		</select>
	)
	const sentenceSelect = (
		<select
			value={sentenceIndex}
			onChange={(e) => changeSentence(e.target.value)}
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
					<select
						className="text-primary font-bold"
						value={value}
						onChange={(e) => {
							setValue(e.target.value)
							handleLessonChange(e.target.value)
						}}
					>
						{Object.keys(spanishData.lessons).map((key) => (
							<option
								key={key}
								value={key}
							>
								{spanishData.lessons[key].name}{" "}
								{spanishData.lessons[key].details}
							</option>
						))}
					</select>
					{user ? (
						<div>
							<span>Welcome, {user.displayName}</span>
							<button
								onClick={logout}
								className="ml-4 bg-red-500 text-white px-4 py-2 rounded"
							>
								Logout
							</button>
						</div>
					) : (
						<button
							onClick={loginWithGoogle}
							className="bg-blue-500 text-white px-4 py-2 rounded"
						>
							Login with Google
						</button>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default Header
