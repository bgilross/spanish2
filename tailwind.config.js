const plugin = require("tailwindcss/plugin")

const ultraViolet = "#52489c"
const wisteria = "#8E3BFF"
const trueBlue = "#4062bb"
const sunset = "#f0c987"
const champagne = "#F8E7C9"
const darkChampagne = "#edb553"
const persianRed = "#c3423f"
const lightCoral = "#DD9492"
const cornellRed = "#b3001b"
const vistaBlue = "#95A8DB"

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: persianRed,
				primary_light: lightCoral,
				secondary: sunset,
				secondary_light: champagne,
				secondary_dark: darkChampagne,
				accent: ultraViolet,
				accent_light: wisteria,
				true_blue: trueBlue,
				blue_light: vistaBlue,
				cornell: cornellRed,
			},

			// backgroundImage: {
			// 	background: "url('/media/spanishBG.png')",
			// },
		},
	},
	plugins: [
		plugin(function ({ addBase, theme }) {
			const cssVariables = Object.entries(theme("colors")).reduce(
				(vars, [key, value]) => {
					vars[`--${key}`] = value
					return vars
				},
				{}
			)
			addBase({
				":root": cssVariables,
			})
		}),
	],
}
