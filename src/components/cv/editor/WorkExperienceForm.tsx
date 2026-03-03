import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import type { WorkExperience } from "@/types/cv";
import { SectionWrapper } from "./SectionWrapper";

interface WorkExperienceFormProps {
	data: WorkExperience[];
	onChange: (data: WorkExperience[]) => void;
}

export function WorkExperienceForm({
	data,
	onChange,
}: WorkExperienceFormProps) {
	function addItem() {
		onChange([
			...data,
			{
				id: crypto.randomUUID(),
				company: "",
				position: "",
				startDate: "",
				current: false,
				description: "",
			},
		]);
	}

	function updateItem(index: number, updates: Partial<WorkExperience>) {
		const updated = [...data];
		updated[index] = { ...updated[index], ...updates };
		onChange(updated);
	}

	function removeItem(index: number) {
		onChange(data.filter((_, i) => i !== index));
	}

	return (
		<SectionWrapper title="Work Experience">
			{data.map((item, index) => (
				<div key={item.id} className="space-y-3 rounded-md border p-3">
					<div className="flex items-center justify-between">
						<span className="text-sm font-medium">
							{item.position || item.company || `Position ${index + 1}`}
						</span>
						<Button
							variant="ghost"
							size="icon"
							className="h-7 w-7"
							onClick={() => removeItem(index)}
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
					<div className="grid gap-3 sm:grid-cols-2">
						<div className="space-y-1">
							<Label>Position</Label>
							<Input
								value={item.position}
								onChange={(e) =>
									updateItem(index, { position: e.target.value })
								}
								placeholder="Software Engineer"
							/>
						</div>
						<div className="space-y-1">
							<Label>Company</Label>
							<Input
								value={item.company}
								onChange={(e) => updateItem(index, { company: e.target.value })}
								placeholder="Acme Corp"
							/>
						</div>
						<div className="space-y-1">
							<Label>Location</Label>
							<Input
								value={item.location ?? ""}
								onChange={(e) =>
									updateItem(index, { location: e.target.value })
								}
								placeholder="San Francisco, CA"
							/>
						</div>
						<div className="space-y-1">
							<Label>Start Date</Label>
							<Input
								value={item.startDate}
								onChange={(e) =>
									updateItem(index, { startDate: e.target.value })
								}
								placeholder="Jan 2020"
							/>
						</div>
						<div className="space-y-1">
							<Label>End Date</Label>
							<Input
								value={item.endDate ?? ""}
								onChange={(e) => updateItem(index, { endDate: e.target.value })}
								placeholder="Present"
								disabled={item.current}
							/>
						</div>
						<div className="flex items-end space-x-2 pb-1">
							<input
								type="checkbox"
								id={`current-${item.id}`}
								checked={item.current}
								onChange={(e) =>
									updateItem(index, {
										current: e.target.checked,
										endDate: e.target.checked ? undefined : item.endDate,
									})
								}
								className="h-4 w-4"
							/>
							<Label htmlFor={`current-${item.id}`}>Current position</Label>
						</div>
					</div>
					<div className="space-y-1">
						<Label>Description</Label>
						<RichTextEditor
							value={item.description}
							onChange={(html) =>
								updateItem(index, { description: html })
							}
							placeholder="Describe your responsibilities and achievements..."
						/>
					</div>
				</div>
			))}
			<Button variant="outline" size="sm" onClick={addItem}>
				<Plus className="mr-2 h-4 w-4" />
				Add Experience
			</Button>
		</SectionWrapper>
	);
}
