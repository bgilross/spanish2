import { useEffect, useRef } from "react"
import VanillaTilt from "vanilla-tilt"

export default function TiltButton({
	children,
	className = "",
	tiltOptions = {},
	...props
}) {
	const tiltRef = useRef(null)

	// Initialize VanillaTilt
	useEffect(() => {
		if (tiltRef.current) {
			VanillaTilt.init(tiltRef.current, {
				max: 25,
				speed: 400,
				glare: true,
				"max-glare": 0.5,
				...tiltOptions, // Allow custom tilt options to be passed
			})
		}
	}, [tiltOptions])

	return (
		<button
			ref={tiltRef}
			className={` px-4 py-2 rounded ${className}`}
			{...props}
		>
			{children}
		</button>
	)
}
