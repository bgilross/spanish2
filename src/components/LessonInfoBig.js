import { useQuiz } from "@/lib/QuizContext"
import spanishData from "@/lib/spanishData"
import ClickableText from "./ClickableText"

const LessonInfoBig = ({ isOpen, onClose }) => {
	const { currentData } = useQuiz()

	const lesson = spanishData.lessons[currentData.lessonNumber]

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 flex text-lg items-center bg-black bg-opacity-50 z-50 text-secondary justify-center">
			<div className="bg-primary flex flex-col w-4/5 h-[90%] rounded-lg shadow-2xl shadow-primary p-4 overflow-hidden">
				<div className="flex  items-center">
					<div className="text-5xl font-bold mb-4">{lesson.name}:</div>

					<div className="h-full w-[70%] text-2xl ml-10 ">
						<span className="text-accent font-bold border-b-2 border-accent">
							{lesson.details}
						</span>
					</div>
				</div>
				<div className="p-4 overflow-y-auto h-full">
					{lesson.info?.map((info, index) => (
						<div
							key={index}
							className="mt-2 flex"
						>
							<div className="font-bold text-accent w-[25px] text-right">
								{index + 1}:
							</div>{" "}
							<div className="whitespace-pre-wrap ml-2 w-[90%]">
								<ClickableText>{info}</ClickableText>
							</div>
						</div>
					))}
				</div>
				<div className="flex justify-end p-4">
					<button
						className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
						onClick={onClose}
					>
						Close
					</button>
				</div>
			</div>
		</div>
	)
}
export default LessonInfoBig
