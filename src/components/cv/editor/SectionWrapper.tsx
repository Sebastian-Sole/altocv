import { ChevronDown, ChevronRight } from "lucide-react";
import { createContext, useContext, useState } from "react";
import { Button } from "@/components/ui/button";

const DragHandleContext = createContext<React.ReactNode>(null);

export function DragHandleProvider({
	handle,
	children,
}: {
	handle: React.ReactNode;
	children: React.ReactNode;
}) {
	return (
		<DragHandleContext.Provider value={handle}>
			{children}
		</DragHandleContext.Provider>
	);
}

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
	const dragHandle = useContext(DragHandleContext);

	return (
		<div className="rounded-lg border bg-card">
			<div className="flex items-center">
				{dragHandle}
				<Button
					variant="ghost"
					className="flex-1 justify-between px-4 py-3 font-semibold"
					onClick={() => setOpen(!open)}
				>
					{title}
					{open ? (
						<ChevronDown className="h-4 w-4" />
					) : (
						<ChevronRight className="h-4 w-4" />
					)}
				</Button>
			</div>
			{open && <div className="space-y-4 px-4 pb-4">{children}</div>}
		</div>
	);
}
