import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ContactInfo } from "@/types/cv";
import { SectionWrapper } from "./SectionWrapper";

interface ContactInfoFormProps {
	data: ContactInfo;
	onChange: (data: ContactInfo) => void;
}

export function ContactInfoForm({ data, onChange }: ContactInfoFormProps) {
	function update(field: keyof ContactInfo, value: string) {
		onChange({ ...data, [field]: value });
	}

	return (
		<SectionWrapper title="Contact Information" defaultOpen>
			<div className="grid gap-4 sm:grid-cols-2">
				<div className="space-y-2 sm:col-span-2">
					<Label htmlFor="fullName">Full Name</Label>
					<Input
						id="fullName"
						value={data.fullName}
						onChange={(e) => update("fullName", e.target.value)}
						placeholder="John Doe"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"
						value={data.email}
						onChange={(e) => update("email", e.target.value)}
						placeholder="john@example.com"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="phone">Phone</Label>
					<Input
						id="phone"
						value={data.phone ?? ""}
						onChange={(e) => update("phone", e.target.value)}
						placeholder="+1 234 567 890"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="location">Location</Label>
					<Input
						id="location"
						value={data.location ?? ""}
						onChange={(e) => update("location", e.target.value)}
						placeholder="New York, NY"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="linkedin">LinkedIn</Label>
					<Input
						id="linkedin"
						value={data.linkedin ?? ""}
						onChange={(e) => update("linkedin", e.target.value)}
						placeholder="linkedin.com/in/johndoe"
					/>
				</div>
				<div className="space-y-2 sm:col-span-2">
					<Label htmlFor="website">Website</Label>
					<Input
						id="website"
						value={data.website ?? ""}
						onChange={(e) => update("website", e.target.value)}
						placeholder="johndoe.com"
					/>
				</div>
				<div className="space-y-2 sm:col-span-2">
					<Label htmlFor="summary">Professional Summary</Label>
					<Textarea
						id="summary"
						value={data.summary ?? ""}
						onChange={(e) => update("summary", e.target.value)}
						placeholder="Brief summary of your professional background..."
						rows={4}
					/>
				</div>
			</div>
		</SectionWrapper>
	);
}
