import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import type { Award } from "@/types/cv";
import { SectionWrapper } from "./SectionWrapper";

interface AwardsFormProps {
	data: Award[];
	onChange: (data: Award[]) => void;
}

export function AwardsForm({ data, onChange }: AwardsFormProps) {
	function addItem() {
		onChange([...data, { id: crypto.randomUUID(), title: "", issuer: "" }]);
	}

	function updateItem(index: number, updates: Partial<Award>) {
		const updated = [...data];
		updated[index] = { ...updated[index], ...updates };
		onChange(updated);
	}

	function removeItem(index: number) {
		onChange(data.filter((_, i) => i !== index));
	}

	return (
		<SectionWrapper title="Awards">
			{data.map((item, index) => (
				<div key={item.id} className="space-y-3 rounded-md border p-3">
					<div className="flex items-center justify-between">
						<span className="text-sm font-medium">
							{item.title || `Award ${index + 1}`}
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
							<Label>Title</Label>
							<Input
								value={item.title}
								onChange={(e) => updateItem(index, { title: e.target.value })}
								placeholder="Best Paper Award"
							/>
						</div>
						<div className="space-y-1">
							<Label>Issuer</Label>
							<Input
								value={item.issuer}
								onChange={(e) => updateItem(index, { issuer: e.target.value })}
								placeholder="ACM"
							/>
						</div>
						<div className="space-y-1">
							<Label>Date</Label>
							<Input
								value={item.date ?? ""}
								onChange={(e) => updateItem(index, { date: e.target.value })}
								placeholder="2023"
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
							placeholder="Description of the award..."
						/>
					</div>
				</div>
			))}
			<Button variant="outline" size="sm" onClick={addItem}>
				<Plus className="mr-2 h-4 w-4" />
				Add Award
			</Button>
		</SectionWrapper>
	);
}
