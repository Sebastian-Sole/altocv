import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SectionWrapperProps {
	title: string;
	children: React.ReactNode;
	defaultOpen?: boolean;
}

export function SectionWrapper({
	title,
	children,
	defaultOpen = false,
}: SectionWrapperProps) {
	const [open, setOpen] = useState(defaultOpen);

	return (
		<div className="rounded-lg border bg-card">
			<Button
				variant="ghost"
				className="w-full justify-between px-4 py-3 font-semibold"
				onClick={() => setOpen(!open)}
			>
				{title}
				{open ? (
					<ChevronDown className="h-4 w-4" />
				) : (
					<ChevronRight className="h-4 w-4" />
				)}
			</Button>
			{open && <div className="space-y-4 px-4 pb-4">{children}</div>}
		</div>
	);
}
