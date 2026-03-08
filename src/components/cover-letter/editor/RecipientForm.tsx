import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { RecipientInfo } from "@/types/coverLetter";
import { SectionWrapper } from "@/components/cv/editor/SectionWrapper";

interface RecipientFormProps {
	data: RecipientInfo;
	onChange: (data: RecipientInfo) => void;
}

export function RecipientForm({ data, onChange }: RecipientFormProps) {
	function update(field: keyof RecipientInfo, value: string) {
		onChange({ ...data, [field]: value });
	}

	return (
		<SectionWrapper title="Recipient" defaultOpen>
			<div className="grid gap-4">
				<div className="space-y-2">
					<Label htmlFor="cl-hiringManager">Hiring Manager Name</Label>
					<Input
						id="cl-hiringManager"
						value={data.hiringManagerName ?? ""}
						onChange={(e) => update("hiringManagerName", e.target.value)}
						placeholder="Jane Smith"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="cl-companyName">Company Name</Label>
					<Input
						id="cl-companyName"
						value={data.companyName ?? ""}
						onChange={(e) => update("companyName", e.target.value)}
						placeholder="Acme Corp"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="cl-companyAddress">Company Address</Label>
					<Input
						id="cl-companyAddress"
						value={data.companyAddress ?? ""}
						onChange={(e) => update("companyAddress", e.target.value)}
						placeholder="123 Main St, New York, NY 10001"
					/>
				</div>
			</div>
		</SectionWrapper>
	);
}
