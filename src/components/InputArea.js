import { current } from "tailwindcss/colors"
import InsetInput from "./InsetInput"
import TiltCard from "./TiltCard"
import { useState } from "react"
import { useTranslation } from "@/lib/TranslationContext"

const InputArea = ({}) => {
	const { handleSubmit } = useTranslation()
	const [userInput, setUserInput] = useState("")

	const submit = (event) => {
		event.preventDefault()
		console.log("submitting")

		handleSubmit(userInput)
		setUserInput("")
		console.log("done submitting")
	}

	return (
		<div className="bg-secondary rounded-t-2xl w-[95%] h-full flex flex-col items-center justify-center shadow-2xl shadow-primary">
			<div className="flex justify-around w-full h-1/3">
				<TiltCard className="bg-primary w-[12%] rounded-t-none">
					Button1
				</TiltCard>
				<TiltCard>Button2</TiltCard>
				<TiltCard>Button3</TiltCard>
			</div>

			<form
				onSubmit={submit}
				className="flex p-4 h-1/3 flex-col w-[80%] space-x-4 justify-center items-center"
			>
				<InsetInput
					inputText={userInput}
					setInputText={setUserInput}
				/>
			</form>
			<div className="h-1/3 flex justify-end w-[80%]">
				<TiltCard
					className="w-[110px] h-[75px] bg-primary text-secondary font-bold rounded-2xl"
					onClick={submit}
				>
					Submit!
				</TiltCard>
			</div>
		</div>
	)
}
export default InputArea
