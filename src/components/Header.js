"use client"

import React from "react"
import { AppBar, Toolbar } from "@mui/material"
import { Box } from "@mui/system"
import { useTranslation } from "@/lib/TranslationContext"
import spanishData from "@/lib/spanishData"
import { useState } from "react"

// import SpreadWord from "./SpreadWord"
// import GoogleLogin from "./GoogleLogin"

const Header = ({ user, onLogin }) => {
	const { lessonNumber, handleLessonChange } = useTranslation()
	const [value, setValue] = useState(null)

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
					<div className="w-1/3"> </div>
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
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default Header
