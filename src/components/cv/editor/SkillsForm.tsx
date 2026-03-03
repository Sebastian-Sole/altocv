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
import type { Skill } from "@/types/cv";
import { SectionWrapper } from "./SectionWrapper";

interface SkillsFormProps {
	data: Skill[];
	onChange: (data: Skill[]) => void;
}

export function SkillsForm({ data, onChange }: SkillsFormProps) {
	function addItem() {
		onChange([...data, { id: crypto.randomUUID(), name: "" }]);
	}

	function updateItem(index: number, updates: Partial<Skill>) {
		const updated = [...data];
		updated[index] = { ...updated[index], ...updates };
		onChange(updated);
	}

	function removeItem(index: number) {
		onChange(data.filter((_, i) => i !== index));
	}

	return (
		<SectionWrapper title="Skills">
			{data.map((item, index) => (
				<div key={item.id} className="flex items-end gap-2">
					<div className="flex-1 space-y-1">
						<Label>Skill</Label>
						<Input
							value={item.name}
							onChange={(e) => updateItem(index, { name: e.target.value })}
							placeholder="React, TypeScript, etc."
						/>
					</div>
					<div className="w-36 space-y-1">
						<Label>Level</Label>
						<Select
							value={item.level ?? ""}
							onValueChange={(value) =>
								updateItem(index, {
									level: value as Skill["level"],
								})
							}
						>
							<SelectTrigger>
								<SelectValue placeholder="Level" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="beginner">Beginner</SelectItem>
								<SelectItem value="intermediate">Intermediate</SelectItem>
								<SelectItem value="advanced">Advanced</SelectItem>
								<SelectItem value="expert">Expert</SelectItem>
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
				Add Skill
			</Button>
		</SectionWrapper>
	);
}
