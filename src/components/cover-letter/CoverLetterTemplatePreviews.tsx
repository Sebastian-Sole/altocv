import { cn } from "@/lib/utils";

interface TemplatePreviewProps {
	selected: boolean;
	onClick: () => void;
}

function PreviewCard({
	selected,
	onClick,
	children,
	label,
	description,
}: TemplatePreviewProps & {
	children: React.ReactNode;
	label: string;
	description: string;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"group flex flex-col items-center gap-2 rounded-lg p-2 text-left transition-all",
				"hover:bg-muted/50",
				selected && "ring-2 ring-primary ring-offset-2",
			)}
		>
			<div
				className={cn(
					"aspect-[210/297] w-full overflow-hidden rounded-md border bg-white shadow-sm transition-shadow",
					"group-hover:shadow-md",
					selected && "border-primary",
				)}
			>
				{children}
			</div>
			<div className="w-full min-w-0">
				<p className="truncate text-sm font-medium">{label}</p>
				<p className="truncate text-xs text-muted-foreground">
					{description}
				</p>
			</div>
		</button>
	);
}

/* ── Classic Letter Preview ── */
export function ClassicLetterPreview(props: TemplatePreviewProps) {
	return (
		<PreviewCard {...props} label="Classic" description="Traditional business letter">
			<div className="p-3">
				<p className="text-[5px] font-bold leading-tight" style={{ fontFamily: "serif" }}>
					John Anderson
				</p>
				<p className="text-[3px] text-gray-500" style={{ fontFamily: "serif" }}>
					john@email.com | +1 234 567
				</p>
				<div className="mt-2">
					<p className="text-[3px] text-gray-500" style={{ fontFamily: "serif" }}>March 8, 2026</p>
				</div>
				<div className="mt-1.5">
					<p className="text-[3px] text-gray-700" style={{ fontFamily: "serif" }}>Jane Smith</p>
					<p className="text-[3px] text-gray-700" style={{ fontFamily: "serif" }}>Acme Corp</p>
				</div>
				<p className="mt-1.5 text-[3.5px] font-bold" style={{ fontFamily: "serif" }}>
					Re: Software Engineer Position
				</p>
				<div className="mt-1 space-y-1">
					<div className="h-[3px] w-full rounded-full bg-gray-200" />
					<div className="h-[3px] w-11/12 rounded-full bg-gray-200" />
					<div className="h-[3px] w-full rounded-full bg-gray-200" />
					<div className="h-[3px] w-9/12 rounded-full bg-gray-200" />
					<div className="mt-1.5 h-[3px] w-full rounded-full bg-gray-200" />
					<div className="h-[3px] w-10/12 rounded-full bg-gray-200" />
					<div className="h-[3px] w-full rounded-full bg-gray-200" />
				</div>
				<div className="mt-2">
					<p className="text-[3px] text-gray-700" style={{ fontFamily: "serif" }}>Sincerely,</p>
					<p className="mt-1 text-[3.5px] font-bold" style={{ fontFamily: "serif" }}>John Anderson</p>
				</div>
			</div>
		</PreviewCard>
	);
}

/* ── Modern Letter Preview ── */
export function ModernLetterPreview(props: TemplatePreviewProps) {
	return (
		<PreviewCard {...props} label="Modern" description="Colored header bar">
			<div>
				<div className="bg-blue-600 p-3 pb-2">
					<p className="text-[5.5px] font-bold leading-tight text-white">
						John Anderson
					</p>
					<p className="text-[3px] text-blue-200">
						john@email.com | +1 234 567 | New York
					</p>
				</div>
				<div className="p-3 pt-2">
					<p className="text-[3px] text-gray-500">March 8, 2026</p>
					<p className="mt-1 text-[3px] text-gray-600">Jane Smith — Acme Corp</p>
					<p className="mt-1.5 border-b-[1px] border-blue-600 pb-1 text-[4px] font-bold text-blue-600">
						Software Engineer Position
					</p>
					<div className="mt-1.5 space-y-1">
						<div className="h-[3px] w-full rounded-full bg-gray-200" />
						<div className="h-[3px] w-11/12 rounded-full bg-gray-200" />
						<div className="h-[3px] w-full rounded-full bg-gray-200" />
						<div className="h-[3px] w-8/12 rounded-full bg-gray-200" />
						<div className="mt-1.5 h-[3px] w-full rounded-full bg-gray-200" />
						<div className="h-[3px] w-10/12 rounded-full bg-gray-200" />
					</div>
					<div className="mt-2">
						<p className="text-[3px] text-gray-600">Best regards,</p>
						<p className="mt-0.5 text-[3.5px] font-bold text-blue-600">John Anderson</p>
					</div>
				</div>
			</div>
		</PreviewCard>
	);
}

/* ── Formal Letter Preview ── */
export function FormalLetterPreview(props: TemplatePreviewProps) {
	return (
		<PreviewCard {...props} label="Formal" description="Centered letterhead">
			<div className="border-gray-300 p-3">
				<div className="border-b border-gray-300 pb-1.5 text-center">
					<p className="text-[5px] font-bold uppercase tracking-widest" style={{ fontFamily: "serif" }}>
						John Anderson
					</p>
					<p className="text-[3px] text-gray-500">
						john@email.com · +1 234 567 · New York
					</p>
				</div>
				<p className="mt-1.5 text-right text-[3px] text-gray-500" style={{ fontFamily: "serif" }}>
					March 8, 2026
				</p>
				<div className="mt-1">
					<p className="text-[3px] text-gray-700" style={{ fontFamily: "serif" }}>Jane Smith</p>
					<p className="text-[3px] text-gray-700" style={{ fontFamily: "serif" }}>Acme Corp</p>
				</div>
				<div className="mt-1.5 border-y border-gray-300 py-0.5 text-center">
					<p className="text-[3.5px] font-bold uppercase tracking-wide" style={{ fontFamily: "serif" }}>
						Software Engineer Position
					</p>
				</div>
				<div className="mt-1.5 space-y-1">
					<div className="h-[3px] w-full rounded-full bg-gray-200" />
					<div className="h-[3px] w-11/12 rounded-full bg-gray-200" />
					<div className="h-[3px] w-full rounded-full bg-gray-200" />
					<div className="h-[3px] w-9/12 rounded-full bg-gray-200" />
				</div>
				<div className="mt-2">
					<p className="text-[3px] text-gray-700" style={{ fontFamily: "serif" }}>Respectfully yours,</p>
					<p className="mt-1 text-[3.5px] font-bold" style={{ fontFamily: "serif" }}>John Anderson</p>
				</div>
			</div>
		</PreviewCard>
	);
}

/* ── Minimal Letter Preview ── */
export function MinimalLetterPreview(props: TemplatePreviewProps) {
	return (
		<PreviewCard {...props} label="Minimal" description="Maximum whitespace">
			<div className="p-4">
				<p className="text-[5px] font-bold leading-tight text-gray-900">
					John Anderson
				</p>
				<p className="text-[3px] text-gray-400">
					john@email.com · +1 234 567 · New York
				</p>
				<p className="mt-3 text-[3px] text-gray-400">March 8, 2026</p>
				<div className="mt-2">
					<p className="text-[3px] text-gray-500">Jane Smith</p>
					<p className="text-[3px] text-gray-500">Acme Corp</p>
				</div>
				<p className="mt-2 text-[3.5px] font-bold text-gray-900">
					Software Engineer Position
				</p>
				<div className="mt-1.5 space-y-1">
					<div className="h-[3px] w-full rounded-full bg-gray-100" />
					<div className="h-[3px] w-11/12 rounded-full bg-gray-100" />
					<div className="h-[3px] w-full rounded-full bg-gray-100" />
					<div className="h-[3px] w-8/12 rounded-full bg-gray-100" />
				</div>
				<div className="mt-3">
					<p className="text-[3px] text-gray-600">Kind regards,</p>
					<p className="mt-1 text-[3.5px] font-bold text-gray-900">John Anderson</p>
				</div>
			</div>
		</PreviewCard>
	);
}
