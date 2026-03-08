import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CoverLetterContactInfo } from "@/types/coverLetter";
import { SectionWrapper } from "@/components/cv/editor/SectionWrapper";

interface CoverLetterContactFormProps {
	data: CoverLetterContactInfo;
	onChange: (data: CoverLetterContactInfo) => void;
}

export function CoverLetterContactForm({
	data,
	onChange,
}: CoverLetterContactFormProps) {
	function update(field: keyof CoverLetterContactInfo, value: string) {
		onChange({ ...data, [field]: value });
	}

	return (
		<SectionWrapper title="Your Information" defaultOpen>
			<div className="grid gap-4 sm:grid-cols-2">
				<div className="space-y-2 sm:col-span-2">
					<Label htmlFor="cl-fullName">Full Name</Label>
					<Input
						id="cl-fullName"
						value={data.fullName}
						onChange={(e) => update("fullName", e.target.value)}
						placeholder="John Doe"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="cl-email">Email</Label>
					<Input
						id="cl-email"
						type="email"
						value={data.email}
						onChange={(e) => update("email", e.target.value)}
						placeholder="john@example.com"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="cl-phone">Phone</Label>
					<Input
						id="cl-phone"
						value={data.phone ?? ""}
						onChange={(e) => update("phone", e.target.value)}
						placeholder="+1 234 567 890"
					/>
				</div>
				<div className="space-y-2 sm:col-span-2">
					<Label htmlFor="cl-location">Location</Label>
					<Input
						id="cl-location"
						value={data.location ?? ""}
						onChange={(e) => update("location", e.target.value)}
						placeholder="New York, NY"
					/>
				</div>
			</div>
		</SectionWrapper>
	);
}
