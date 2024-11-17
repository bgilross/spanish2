// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics"
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
} from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyA9gaTceDFffpYuNMJsMwdVh8HeZTg1p2g",
	authDomain: "spanishtester-9fc4d.firebaseapp.com",
	projectId: "spanishtester-9fc4d",
	storageBucket: "spanishtester-9fc4d.firebasestorage.app",
	messagingSenderId: "342608535443",
	appId: "1:342608535443:web:41575536ad428f1f6f5266",
	measurementId: "G-MV8MHDR5NY",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()
