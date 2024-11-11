"use client"
import "./globals.css"

import { TranslationProvider } from "@/lib/TranslationContext"
import Main from "@/components/Main"

export default function Home() {
	return (
		<TranslationProvider>
			<Main />
		</TranslationProvider>
	)
}
