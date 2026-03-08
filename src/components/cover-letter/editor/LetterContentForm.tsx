import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { SectionWrapper } from "@/components/cv/editor/SectionWrapper";

interface LetterContentFormProps {
	date: string;
	subject: string;
	body: string;
	signOff: string;
	onDateChange: (date: string) => void;
	onSubjectChange: (subject: string) => void;
	onBodyChange: (body: string) => void;
	onSignOffChange: (signOff: string) => void;
}

export function LetterContentForm({
	date,
	subject,
	body,
	signOff,
	onDateChange,
	onSubjectChange,
	onBodyChange,
	onSignOffChange,
}: LetterContentFormProps) {
	return (
		<SectionWrapper title="Letter Content" defaultOpen>
			<div className="grid gap-4">
				<div className="grid gap-4 sm:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="cl-date">Date</Label>
						<Input
							id="cl-date"
							type="date"
							value={date}
							onChange={(e) => onDateChange(e.target.value)}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="cl-subject">Subject</Label>
						<Input
							id="cl-subject"
							value={subject}
							onChange={(e) => onSubjectChange(e.target.value)}
							placeholder="Application for Software Engineer"
						/>
					</div>
				</div>
				<div className="space-y-2">
					<Label>Body</Label>
					<RichTextEditor
						value={body}
						onChange={onBodyChange}
						placeholder="Write your cover letter here..."
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="cl-sign-off">Sign-off</Label>
					<Input
						id="cl-sign-off"
						value={signOff}
						onChange={(e) => onSignOffChange(e.target.value)}
						placeholder="Sincerely,"
					/>
				</div>
			</div>
		</SectionWrapper>
	);
}
