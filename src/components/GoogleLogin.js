import { useAuth } from "@/lib/useAuth"
const GoogleLogin = () => {
	const { user, loginWithGoogle, logout } = useAuth()
	return (
		<div>
			{user ? (
				<div>
					<span>Welcome, {user.displayName}</span>
					<button
						onClick={logout}
						className="ml-4 bg-red-500 text-white px-4 py-2 rounded"
					>
						Logout
					</button>
				</div>
			) : (
				<button
					onClick={loginWithGoogle}
					className="bg-blue-500 text-white px-4 py-2 rounded"
				>
					Login with Google
				</button>
			)}
		</div>
	)
}
export default GoogleLogin
