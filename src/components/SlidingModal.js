"use client"
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

	return (
		<div
			className={`fixed ${positionClass} top-20 w-1/3 h-[55%] bg-secondary p-2 text-secondary
             shadow-2xl shadow-primary transform ${
								isOpen
									? "translate-y-0 opacity-100 z-50"
									: "translate-y-full opacity-0 z-0"
							} transition-transform duration-300 ease-in-out overflow-hidden`} // Prevent scrolling on the modal itself
		>
			{/* Close Button */}
			<button
				onClick={onClose}
				className="absolute top-4 right-8 bg-accent p-1 rounded-full w-8 flex items-center justify-center"
			>
				X
			</button>

			{/* Scrollable Content Section */}
			<div className="p-6 overflow-y-auto h-full bg-primary">{children}</div>
		</div>
	)
}

export default SlidingModal
