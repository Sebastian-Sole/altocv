import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { Language } from "@/types/cv";
import { SectionWrapper } from "./SectionWrapper";

interface LanguagesFormProps {
	data: Language[];
	onChange: (data: Language[]) => void;
}

export function LanguagesForm({ data, onChange }: LanguagesFormProps) {
	function addItem() {
		onChange([
			...data,
			{ id: crypto.randomUUID(), name: "", proficiency: "intermediate" },
		]);
	}

	function updateItem(index: number, updates: Partial<Language>) {
		const updated = [...data];
		updated[index] = { ...updated[index], ...updates };
		onChange(updated);
	}

	function removeItem(index: number) {
		onChange(data.filter((_, i) => i !== index));
	}

	return (
		<SectionWrapper title="Languages">
			{data.map((item, index) => (
				<div key={item.id} className="flex items-end gap-2">
					<div className="flex-1 space-y-1">
						<Label>Language</Label>
						<Input
							value={item.name}
							onChange={(e) => updateItem(index, { name: e.target.value })}
							placeholder="English, Spanish, etc."
						/>
					</div>
					<div className="w-36 space-y-1">
						<Label>Proficiency</Label>
						<Select
							value={item.proficiency}
							onValueChange={(value) =>
								updateItem(index, {
									proficiency: value as Language["proficiency"],
								})
							}
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="native">Native</SelectItem>
								<SelectItem value="fluent">Fluent</SelectItem>
								<SelectItem value="advanced">Advanced</SelectItem>
								<SelectItem value="intermediate">Intermediate</SelectItem>
								<SelectItem value="beginner">Beginner</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<Button
						variant="ghost"
						size="icon"
						className="h-9 w-9 shrink-0"
						onClick={() => removeItem(index)}
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			))}
			<Button variant="outline" size="sm" onClick={addItem}>
				<Plus className="mr-2 h-4 w-4" />
				Add Language
			</Button>
		</SectionWrapper>
	);
}
