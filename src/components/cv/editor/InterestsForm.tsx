import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionWrapper } from "./SectionWrapper";

interface InterestsFormProps {
	data: string[];
	onChange: (data: string[]) => void;
}

export function InterestsForm({ data, onChange }: InterestsFormProps) {
	const [input, setInput] = useState("");

	function addInterest() {
		const trimmed = input.trim();
		if (trimmed && !data.includes(trimmed)) {
			onChange([...data, trimmed]);
			setInput("");
		}
	}

	function removeInterest(index: number) {
		onChange(data.filter((_, i) => i !== index));
	}

	function handleKeyDown(e: React.KeyboardEvent) {
		if (e.key === "Enter") {
			e.preventDefault();
			addInterest();
		}
	}

	return (
		<SectionWrapper title="Interests">
			<div className="flex flex-wrap gap-2">
				{data.map((interest, index) => (
					<Badge key={interest} variant="secondary" className="gap-1">
						{interest}
						<button
							type="button"
							onClick={() => removeInterest(index)}
							className="ml-1 hover:text-destructive"
						>
							<X className="h-3 w-3" />
						</button>
					</Badge>
				))}
			</div>
			<div className="flex gap-2">
				<Input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Add an interest..."
				/>
				<Button variant="outline" size="sm" onClick={addInterest}>
					<Plus className="h-4 w-4" />
				</Button>
			</div>
		</SectionWrapper>
	);
}
