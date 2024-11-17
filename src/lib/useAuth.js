"use client"
import { useEffect, useState } from "react"
import { auth, googleProvider } from "./firebase"
import { signInWithPopup, signOut } from "firebase/auth"

export const useAuth = () => {
	const [user, setUser] = useState(null)
	const [userData, setUserData] = useState({})

	const loginWithGoogle = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider)
			setUser(result.user)
			await fetchUserData(result.user.uid)
		} catch (error) {
			console.error("Google Login Error:", error)
		}
	}

	const logout = async () => {
		await signOut(auth)
		setUser(null)
		setUserData({})
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				setUser(user)
			} else {
				setUser(null)
				setUserData({})
			}
		})
		return () => unsubscribe()
	}, [])

	return {
		user,
		userData,
		loginWithGoogle,
		logout,
	}
}
