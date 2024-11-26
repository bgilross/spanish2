"use client"
import { useEffect, useRef } from "react"
import { useTranslation } from "@/lib/TranslationContext"
import spanishData from "@/lib/spanishData"

const SlidingModal = ({ isOpen, onClose, position = "left", children }) => {
	const { lessonNumber } = useTranslation()

	// Fetch the relevant lesson data for the current lesson
	const lessonInfo =
		spanishData.lessons[lessonNumber]?.details ||
		"No additional info available."

	// Determine the modal position based on the 'position' prop
	const positionClass = position === "right" ? "right-0" : "left-0"

	// Ref for the modal container
	const modalRef = useRef(null)

	// Close the modal if clicking outside of it
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				onClose()
			}
		}

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside)
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [isOpen, onClose])

	return (
		<div
			className={`fixed ${positionClass} top-20 w-1/3 h-[55%] rounded-lg bg-secondary p-2 text-secondary
             shadow-2xl shadow-primary transform ${
								isOpen
									? "translate-y-0 opacity-100 z-50"
									: "translate-y-full opacity-0 z-0"
							} transition-transform duration-300 ease-in-out overflow-hidden`}
			ref={modalRef} // Attach the ref to the modal container
		>
			{/* Close Button */}
			{/* <button
				onClick={onClose}
				className="absolute top-4 right-8 bg-spanishBlue p-1 rounded-full w-8 flex items-center justify-center"
			>
				X
			</button> */}

			{/* Scrollable Content Section */}
			<div className="p-4 overflow-y-auto h-full bg-primary">{children}</div>
		</div>
	)
}

export default SlidingModal
