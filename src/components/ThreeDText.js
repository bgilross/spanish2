import { Canvas } from "@react-three/fiber"
import { Text } from "@react-three/drei"

export default function ThreeDText() {
	return (
		<Canvas>
			<Text
				fontSize={2}
				color="#ff0000"
				font="/fonts/roboto-regular.woff"
				position={[0, 0, 0]}
			>
				3D Bold Text!
			</Text>
		</Canvas>
	)
}
