import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Certificate } from "@/types/cv";
import { SectionWrapper } from "./SectionWrapper";

interface CertificatesFormProps {
	data: Certificate[];
	onChange: (data: Certificate[]) => void;
}

export function CertificatesForm({ data, onChange }: CertificatesFormProps) {
	function addItem() {
		onChange([...data, { id: crypto.randomUUID(), name: "", issuer: "" }]);
	}

	function updateItem(index: number, updates: Partial<Certificate>) {
		const updated = [...data];
		updated[index] = { ...updated[index], ...updates };
		onChange(updated);
	}

	function removeItem(index: number) {
		onChange(data.filter((_, i) => i !== index));
	}

	return (
		<SectionWrapper title="Certificates">
			{data.map((item, index) => (
				<div key={item.id} className="space-y-3 rounded-md border p-3">
					<div className="flex items-center justify-between">
						<span className="text-sm font-medium">
							{item.name || `Certificate ${index + 1}`}
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
							<Label>Name</Label>
							<Input
								value={item.name}
								onChange={(e) => updateItem(index, { name: e.target.value })}
								placeholder="AWS Solutions Architect"
							/>
						</div>
						<div className="space-y-1">
							<Label>Issuer</Label>
							<Input
								value={item.issuer}
								onChange={(e) => updateItem(index, { issuer: e.target.value })}
								placeholder="Amazon Web Services"
							/>
						</div>
						<div className="space-y-1">
							<Label>Date</Label>
							<Input
								value={item.date ?? ""}
								onChange={(e) => updateItem(index, { date: e.target.value })}
								placeholder="Jan 2023"
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
				</div>
			))}
			<Button variant="outline" size="sm" onClick={addItem}>
				<Plus className="mr-2 h-4 w-4" />
				Add Certificate
			</Button>
		</SectionWrapper>
	);
}
