import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Presentation } from "@/types/cv";
import { SectionWrapper } from "./SectionWrapper";

interface PresentationsFormProps {
	data: Presentation[];
	onChange: (data: Presentation[]) => void;
}

export function PresentationsForm({ data, onChange }: PresentationsFormProps) {
	function addItem() {
		onChange([...data, { id: crypto.randomUUID(), title: "", event: "" }]);
	}

	function updateItem(index: number, updates: Partial<Presentation>) {
		const updated = [...data];
		updated[index] = { ...updated[index], ...updates };
		onChange(updated);
	}

	function removeItem(index: number) {
		onChange(data.filter((_, i) => i !== index));
	}

	return (
		<SectionWrapper title="Presentations">
			{data.map((item, index) => (
				<div key={item.id} className="space-y-3 rounded-md border p-3">
					<div className="flex items-center justify-between">
						<span className="text-sm font-medium">
							{item.title || `Presentation ${index + 1}`}
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
								placeholder="Building Scalable Systems"
							/>
						</div>
						<div className="space-y-1">
							<Label>Event</Label>
							<Input
								value={item.event}
								onChange={(e) => updateItem(index, { event: e.target.value })}
								placeholder="React Conf 2024"
							/>
						</div>
						<div className="space-y-1">
							<Label>Date</Label>
							<Input
								value={item.date ?? ""}
								onChange={(e) => updateItem(index, { date: e.target.value })}
								placeholder="May 2024"
							/>
						</div>
						<div className="space-y-1">
							<Label>URL</Label>
							<Input
								value={item.url ?? ""}
								onChange={(e) => updateItem(index, { url: e.target.value })}
								placeholder="https://..."
							/>
						</div>
					</div>
					<div className="space-y-1">
						<Label>Description</Label>
						<Textarea
							value={item.description ?? ""}
							onChange={(e) =>
								updateItem(index, { description: e.target.value })
							}
							placeholder="Brief description..."
							rows={2}
						/>
					</div>
				</div>
			))}
			<Button variant="outline" size="sm" onClick={addItem}>
				<Plus className="mr-2 h-4 w-4" />
				Add Presentation
			</Button>
		</SectionWrapper>
	);
}
