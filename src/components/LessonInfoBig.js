import { useQuiz } from "@/lib/QuizContext"
import spanishData from "@/lib/spanishData"
import ClickableText from "./ClickableText"
import LessonButtons from "./LessonButtons"
import BigModal from "./BigModal"

const LessonInfoBig = ({ isOpen, onClose }) => {
	const { currentData } = useQuiz()

	const lesson = spanishData.lessons[currentData.lessonNumber]

	if (!isOpen) return null

	return (
		<BigModal isOpen={isOpen}>
			<div className="bg-primary h-full rounded-lg p-4 flex flex-col">
				{/* Header Section */}
				<div className="flex items-center mb-4">
					<div className="text-5xl font-bold">{lesson.name}:</div>
					<div className="text-2xl ml-10">
						<span className="text-accent font-bold border-b-2 border-accent">
							{lesson.details}
						</span>
					</div>
				</div>

				{/* Scrollable Info Section */}
				<div className="flex-1 overflow-y-auto p-4 rounded-md max-h-[60vh]">
					{lesson.info?.map((info, index) => (
						<div
							key={index}
							className="mt-2 flex"
						>
							<div className="font-bold text-accent w-[25px] text-right">
								{index + 1}:
							</div>
							<div className="whitespace-pre-wrap ml-2 w-[90%]">
								<ClickableText>{info}</ClickableText>
							</div>
						</div>
					))}
				</div>

				{/* Buttons Section */}
				<div className="flex justify-around mt-4 p-4 rounded-lg">
					<LessonButtons
						isPrimary={false}
						onClose={onClose}
					/>
				</div>
			</div>
		</BigModal>
	)
}

export default LessonInfoBig
