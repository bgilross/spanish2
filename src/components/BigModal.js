import React from "react"

const BigModal = ({ children, isOpen, onClose }) => {
	if (!isOpen) return null

	return (
		<div className="fixed inset-0 flex text-lg items-center bg-black bg-opacity-50 z-50 text-secondary justify-center">
			<div className="bg-secondary max-h-[90%] flex flex-col w-4/5 rounded-lg shadow-2xl shadow-primary p-4 overflow-hidden">
				<div className="bg-primary rounded-lg">{children}</div>
			</div>
		</div>
	)
}

export default BigModal
