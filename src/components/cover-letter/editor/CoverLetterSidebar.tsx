import type { CoverLetterContactInfo, RecipientInfo } from "@/types/coverLetter";
import { CoverLetterContactForm } from "./CoverLetterContactForm";
import { RecipientForm } from "./RecipientForm";
import { LetterContentForm } from "./LetterContentForm";

interface CoverLetterSidebarProps {
	contactInfo: CoverLetterContactInfo;
	recipientInfo: RecipientInfo;
	date: string;
	subject: string;
	body: string;
	signOff: string;
	onContactInfoChange: (data: CoverLetterContactInfo) => void;
	onRecipientInfoChange: (data: RecipientInfo) => void;
	onDateChange: (date: string) => void;
	onSubjectChange: (subject: string) => void;
	onBodyChange: (body: string) => void;
	onSignOffChange: (signOff: string) => void;
}

export function CoverLetterSidebar({
	contactInfo,
	recipientInfo,
	date,
	subject,
	body,
	signOff,
	onContactInfoChange,
	onRecipientInfoChange,
	onDateChange,
	onSubjectChange,
	onBodyChange,
	onSignOffChange,
}: CoverLetterSidebarProps) {
	return (
		<div className="flex w-full flex-col">
			<div className="space-y-4 p-4">
				<CoverLetterContactForm
					data={contactInfo}
					onChange={onContactInfoChange}
				/>
				<RecipientForm
					data={recipientInfo}
					onChange={onRecipientInfoChange}
				/>
				<LetterContentForm
					date={date}
					subject={subject}
					body={body}
					signOff={signOff}
					onDateChange={onDateChange}
					onSubjectChange={onSubjectChange}
					onBodyChange={onBodyChange}
					onSignOffChange={onSignOffChange}
				/>
			</div>
		</div>
	);
}
