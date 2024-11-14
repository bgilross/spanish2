const SlidingWIndow = ({ isOpen, onClose }) => {
	return (
		<div
			className={`absolute bottom-full left-0 w-full max-h-[50%] bg-gray-800 text-white shadow-lg transform ${
				isOpen ? "translate-y-full z-40" : "translate-y-0 z-10"
			} transition-transform duration-300 ease-in-out`}
		>
			{/* Close Button */}
			isOpen = {isOpen}
			<button
				onClick={onClose}
				className="p-2 text-white bg-red-500 absolute top-4 right-4 rounded-full"
			>
				X
			</button>
			{/* Lesson Information */}
			<div className="p-6">
				<h2 className="text-2xl font-bold mb-4">Lesson Info</h2>
			</div>
		</div>
	)
}
export default SlidingWIndow
