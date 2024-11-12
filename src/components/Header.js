"use client"

import React from "react"
import { AppBar, Toolbar } from "@mui/material"
import { Box } from "@mui/system"
// import { useTranslation } from "@/lib/TranslationContext"
// import spanishData from "@/lib/spanishData"

// import SpreadWord from "./SpreadWord"
import { useState } from "react"
// import GoogleLogin from "./GoogleLogin"

const Header = ({ user, onLogin }) => {
	// const { lessonIndex, setLessonIndex } = useTranslation()

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
			// onMouseEnter={() => setSpreadWord(true)}
			// onMouseLeave={() => setSpreadWord(false)}
		>
			<Toolbar className="relative flex items-center justify-between px-6 py-4 h-20">
				{/* Left: Logo */}
				<Box className="flex space-x-3 w-full">
					{/* <img
            src="/logo.png"
            alt="Logo"
            className="w-12 h-12 rounded-full bg-white p-1"
          /> */}
					<div className="text-secondary font-bold text-4xl w-full text-left">
						{/* <SpreadWord
							spreadWord={spreadWord}
							word={"Set Lister"}
						/> */}
						SpanishTester
					</div>
					{/* <div>Lesson Index: {lessonIndex}</div>
					<select>
						{spanishData?.lessons?.map((lesson, index) => (
							<option
								key={index}
								value={index}
								selected={index === lessonIndex}
							>
								Lesson {index + 1}: {lesson.name}
							</option>
						))}
					</select> */}
				</Box>
				{/* <GoogleLogin /> */}
				{/* <Login /> */}
				{/* Right: User Icon / Login */}
			</Toolbar>
		</AppBar>
	)
}

export default Header
