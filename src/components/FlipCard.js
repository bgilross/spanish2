import "../styles/flipcard.css"

const FlipCard = () => {
	return (
		<div className="flip-card">
			<div className="flip-card-inner">
				<div className="flip-card-front flex items-center justify-center text-white text-2xl bg-blue-500">
					Front Side
				</div>
				<div className="flip-card-back flex items-center justify-center text-white text-2xl bg-red-500">
					Back Side
				</div>
			</div>
		</div>
	)
}
export default FlipCard
