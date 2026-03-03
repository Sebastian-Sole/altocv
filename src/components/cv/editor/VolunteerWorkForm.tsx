import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { VolunteerWork } from "@/types/cv";
import { SectionWrapper } from "./SectionWrapper";

interface VolunteerWorkFormProps {
	data: VolunteerWork[];
	onChange: (data: VolunteerWork[]) => void;
}

export function VolunteerWorkForm({ data, onChange }: VolunteerWorkFormProps) {
	function addItem() {
		onChange([
			...data,
			{
				id: crypto.randomUUID(),
				organization: "",
				role: "",
				startDate: "",
				current: false,
			},
		]);
	}

	function updateItem(index: number, updates: Partial<VolunteerWork>) {
		const updated = [...data];
		updated[index] = { ...updated[index], ...updates };
		onChange(updated);
	}

	function removeItem(index: number) {
		onChange(data.filter((_, i) => i !== index));
	}

	return (
		<SectionWrapper title="Volunteer Work">
			{data.map((item, index) => (
				<div key={item.id} className="space-y-3 rounded-md border p-3">
					<div className="flex items-center justify-between">
						<span className="text-sm font-medium">
							{item.role || item.organization || `Volunteer ${index + 1}`}
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
							<Label>Organization</Label>
							<Input
								value={item.organization}
								onChange={(e) =>
									updateItem(index, { organization: e.target.value })
								}
								placeholder="Red Cross"
							/>
						</div>
						<div className="space-y-1">
							<Label>Role</Label>
							<Input
								value={item.role}
								onChange={(e) => updateItem(index, { role: e.target.value })}
								placeholder="Volunteer Coordinator"
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
					</div>
					<div className="space-y-1">
						<Label>Description</Label>
						<Textarea
							value={item.description ?? ""}
							onChange={(e) =>
								updateItem(index, { description: e.target.value })
							}
							placeholder="What you did..."
							rows={2}
						/>
					</div>
				</div>
			))}
			<Button variant="outline" size="sm" onClick={addItem}>
				<Plus className="mr-2 h-4 w-4" />
				Add Volunteer Work
			</Button>
		</SectionWrapper>
	);
}
