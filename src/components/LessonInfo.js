import spanishData from "@/lib/spanishData"
import { useTranslation } from "@/lib/TranslationContext"

const LessonInfo = () => {
	const { lessonNumber } = useTranslation()
	const lessonInfo = spanishData.lessons[lessonNumber]?.info

	return (
		<div className="p-2">
			{lessonInfo.map((info, index) => (
				<p
					key={index}
					className="border border-gray-400 p-2 mt-2"
				>
					{info}
				</p>
			))}
		</div>
	)
}
export default LessonInfo
