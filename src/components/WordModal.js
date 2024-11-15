const WordModal = ({ modalPosition, selectedWord, closeModal }) => {
	console.log("selectedWord: ", selectedWord, "modalPosition: ", modalPosition)
	return (
		<div
			className="absolute bg-secondary text-white p-4 rounded-lg shadow-lg "
			style={{
				top: modalPosition.top,
				left: modalPosition.left,
				transform: "translate(-50%, -10%)",
				transition: "all 0.2s ease",
				zIndex: 1000,
			}}
		>
			<span
				className="cursor-pointer font-bold text-right text-xl absolute top-1 right-2"
				onClick={closeModal}
			>
				&times;
			</span>
			<div className="text-lg">{selectedWord.toUpperCase()}</div>
			{/* <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">
            {selectedWord.toUpperCase()}
        </h2>
        <p className="text-gray-700 mb-2">
            <strong>Translations:</strong>{" "}
        </p>
        <p className="text-gray-700 mb-2"></p>
        <p className="text-gray-700 mb-4">
            <strong>Info:</strong>{" "}
        </p>
        <button
            onClick={closeModal}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
            Close
        </button>
    </div> */}
		</div>
	)
}
export default WordModal
