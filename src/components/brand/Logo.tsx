import { cn } from "@/lib/utils";

/**
 * Alto CV brand mark — an ink tile with a serif "A" and the signature
 * coral dot. Rendered as an inline SVG so it stays crisp at any size and
 * inherits theme colors (adapts to light/dark via `fill-*` utilities).
 */
export function LogoMark({
	size = 32,
	className,
}: {
	size?: number;
	className?: string;
}) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 32 32"
			fill="none"
			role="img"
			aria-label="Alto CV"
			className={cn("shrink-0", className)}
		>
			<rect width="32" height="32" rx="7.5" className="fill-foreground" />
			<text
				x="15.5"
				y="23.5"
				textAnchor="middle"
				className="fill-background"
				style={{
					fontFamily: '"Fraunces", Georgia, "Times New Roman", serif',
					fontSize: "22px",
					fontWeight: 600,
				}}
			>
				A
			</text>
			<circle cx="24.5" cy="8.5" r="2.6" className="fill-brand" />
		</svg>
	);
}

/** Mark + "Alto" (serif) + "CV" (muted sans) lockup for headers/footers. */
export function Wordmark({
	markSize = 30,
	className,
	textClassName,
}: {
	markSize?: number;
	className?: string;
	textClassName?: string;
}) {
	return (
		<span className={cn("inline-flex items-center gap-2.5", className)}>
			<LogoMark size={markSize} />
			<span
				className={cn(
					"font-serif text-xl font-semibold leading-none tracking-tight text-foreground",
					textClassName,
				)}
			>
				Alto
				<span className="ml-1 font-sans text-base font-medium text-muted-foreground">
					CV
				</span>
			</span>
		</span>
	);
}
