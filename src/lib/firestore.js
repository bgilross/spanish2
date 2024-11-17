import { db } from "./firebase"
import { collection, addDoc, getDocs, query, where } from "firebase/firestore"

export const addErrorReport = async (userId, errorReport) => {
	console.log("Adding error report:", errorReport)
	try {
		const userDocRef = doc(db, "users", userId)
		const timestamp = new Date().toISOString()

		// Update the user's document, adding to the errorReports array.
		await updateDoc(userDocRef, {
			errorReports: arrayUnion({ ...errorReport, timestamp }),
		})
	} catch (error) {
		console.error("Error adding error report:", error)
	}
}

export const initializeUserData = async (userId) => {
	const userDocRef = doc(db, "users", userId)
	const docSnapshot = await getDoc(userDocRef)

	if (!docSnapshot.exists()) {
		await setDoc(userDocRef, { errorReports: [] })
	}
}
