const { transform } = require("next/dist/build/swc")
const colors = require("tailwindcss/colors")
const plugin = require("tailwindcss/plugin")

const basePrimaryColor = "red"
const baseSecondaryColor = "amber"
const baseAccentColor = "violet"
const baseWarningColor = "blue"

const ultraViolet = "#52489c"
const wisteria = "#8E3BFF"
const trueBlue = "#4062bb"
const sunset = "#f0c987"
const champagne = "#F8E7C9"
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
				primary: "#c3423f",
				primary_light: lightCoral,
				secondary: sunset,
				secondary_light: champagne,
				accent: ultraViolet,
				accent_light: wisteria,
				true_blue: trueBlue,
				blue_light: vistaBlue,
				cornell: cornellRed,
			},
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
