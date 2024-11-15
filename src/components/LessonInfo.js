import spanishData from "@/lib/spanishData"
import { useTranslation } from "@/lib/TranslationContext"
import ClickableText from "./ClickableText"

const LessonInfo = () => {
	const { lessonNumber } = useTranslation()
	const lessonInfo = spanishData?.lessons?.[lessonNumber]?.info

	return (
		<div className="p-2">
			{lessonInfo?.map((info, index) => (
				<div
					key={index}
					className="border border-gray-400 p-2 mt-2"
				>
					<ClickableText>{info}</ClickableText>
				</div>
			))}
		</div>
	)
}
export default LessonInfo
