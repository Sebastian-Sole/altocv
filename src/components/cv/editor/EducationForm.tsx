import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import type { Education } from "@/types/cv";
import { SectionWrapper } from "./SectionWrapper";

interface EducationFormProps {
	data: Education[];
	onChange: (data: Education[]) => void;
}

export function EducationForm({ data, onChange }: EducationFormProps) {
	function addItem() {
		onChange([
			...data,
			{
				id: crypto.randomUUID(),
				institution: "",
				degree: "",
				field: "",
				startDate: "",
				current: false,
			},
		]);
	}

	function updateItem(index: number, updates: Partial<Education>) {
		const updated = [...data];
		updated[index] = { ...updated[index], ...updates };
		onChange(updated);
	}

	function removeItem(index: number) {
		onChange(data.filter((_, i) => i !== index));
	}

	return (
		<SectionWrapper title="Education">
			{data.map((item, index) => (
				<div key={item.id} className="space-y-3 rounded-md border p-3">
					<div className="flex items-center justify-between">
						<span className="text-sm font-medium">
							{item.degree || item.institution || `Education ${index + 1}`}
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
							<Label>Institution</Label>
							<Input
								value={item.institution}
								onChange={(e) =>
									updateItem(index, { institution: e.target.value })
								}
								placeholder="MIT"
							/>
						</div>
						<div className="space-y-1">
							<Label>Degree</Label>
							<Input
								value={item.degree}
								onChange={(e) => updateItem(index, { degree: e.target.value })}
								placeholder="Bachelor of Science"
							/>
						</div>
						<div className="space-y-1">
							<Label>Field of Study</Label>
							<Input
								value={item.field}
								onChange={(e) => updateItem(index, { field: e.target.value })}
								placeholder="Computer Science"
							/>
						</div>
						<div className="space-y-1">
							<Label>Location</Label>
							<Input
								value={item.location ?? ""}
								onChange={(e) =>
									updateItem(index, { location: e.target.value })
								}
								placeholder="Cambridge, MA"
							/>
						</div>
						<div className="space-y-1">
							<Label>Start Date</Label>
							<Input
								value={item.startDate}
								onChange={(e) =>
									updateItem(index, { startDate: e.target.value })
								}
								placeholder="Sep 2016"
							/>
						</div>
						<div className="space-y-1">
							<Label>End Date</Label>
							<Input
								value={item.endDate ?? ""}
								onChange={(e) => updateItem(index, { endDate: e.target.value })}
								placeholder="Jun 2020"
								disabled={item.current}
							/>
						</div>
					</div>
					<div className="space-y-1">
						<Label>Description</Label>
						<RichTextEditor
							value={item.description ?? ""}
							onChange={(html) =>
								updateItem(index, { description: html })
							}
							placeholder="Relevant coursework, achievements..."
						/>
					</div>
				</div>
			))}
			<Button variant="outline" size="sm" onClick={addItem}>
				<Plus className="mr-2 h-4 w-4" />
				Add Education
			</Button>
		</SectionWrapper>
	);
}
