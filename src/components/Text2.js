import { Canvas } from "@react-three/fiber"
import { Text, OrbitControls } from "@react-three/drei"

export default function ThreeDText() {
	return (
		<div
			style={{
				height: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#111",
			}}
		>
			<Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
				{/* Add ambient light to the scene */}
				<ambientLight intensity={0.5} />
				{/* Add a point light to illuminate the text */}
				<pointLight
					position={[10, 10, 10]}
					intensity={1}
				/>

				{/* Render 3D Text */}
				<Text
					fontSize={2}
					depth={0.5}
					bevelEnabled
					bevelSize={0.05}
					bevelThickness={0.1}
					color="#FF6347"
					position={[0, 0, 0]}
				>
					3D Text
				</Text>

				{/* Add camera controls */}
				<OrbitControls enableZoom={true} />
			</Canvas>
		</div>
	)
}
