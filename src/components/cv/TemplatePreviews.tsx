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
				<p className="truncate text-xs text-muted-foreground">{description}</p>
			</div>
		</button>
	);
}

/* Miniature text used to simulate real CV content */
const T = {
	name: (text: string, className?: string) => (
		<p className={cn("truncate font-bold leading-none", className)}>{text}</p>
	),
	contact: (className?: string) => (
		<p className={cn("truncate leading-none", className)}>
			<span className="text-[3.5px] text-gray-400">
				john@email.com | +1 234 567 | New York
			</span>
		</p>
	),
	sectionTitle: (text: string, className?: string) => (
		<p className={cn("truncate font-bold uppercase leading-none", className)}>
			{text}
		</p>
	),
	line: (text: string, className?: string) => (
		<p className={cn("truncate leading-tight", className)}>{text}</p>
	),
	entry: (
		title: string,
		sub: string,
		date: string,
		dateClass?: string,
	) => (
		<div className="mt-[2px]">
			<div className="flex items-baseline justify-between gap-1">
				<p className="truncate text-[3.5px] font-semibold leading-tight text-gray-700">
					{title}
				</p>
				<p
					className={cn(
						"shrink-0 text-[3px] leading-tight text-gray-400",
						dateClass,
					)}
				>
					{date}
				</p>
			</div>
			<p className="truncate text-[3px] leading-tight text-gray-400">{sub}</p>
			<p className="mt-[1px] text-[3px] leading-tight text-gray-300">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do.
			</p>
		</div>
	),
};

/* ── Classic ── */
export function ClassicPreview(props: TemplatePreviewProps) {
	return (
		<PreviewCard
			{...props}
			label="Classic"
			description="Traditional single-column"
		>
			<div className="flex h-full flex-col p-[8px]">
				{T.name("John Anderson", "text-[6px] text-gray-800")}
				{T.contact("mt-[2px]")}
				<p className="mt-[2px] text-[3px] leading-tight text-gray-400">
					Experienced software engineer with 8+ years building scalable
					applications.
				</p>
				<div
					className="mt-[4px]"
					style={{ borderBottom: "1px solid #ccc" }}
				/>

				{T.sectionTitle("Work Experience", "mt-[4px] text-[4px] text-gray-700")}
				<div
					className="mt-[1px]"
					style={{ borderBottom: "0.5px solid #e5e5e5" }}
				/>
				{T.entry(
					"Senior Software Engineer",
					"Acme Corp, San Francisco",
					"2020 — Present",
				)}
				{T.entry(
					"Software Engineer",
					"StartupXYZ, New York",
					"2017 — 2020",
				)}

				{T.sectionTitle("Skills", "mt-[4px] text-[4px] text-gray-700")}
				<div
					className="mt-[1px]"
					style={{ borderBottom: "0.5px solid #e5e5e5" }}
				/>
				<div className="mt-[2px] flex flex-wrap gap-[2px]">
					{["React", "TypeScript", "Node.js", "Python"].map((s) => (
						<span
							key={s}
							className="rounded-[1px] bg-gray-100 px-[3px] py-[1px] text-[3px] text-gray-600"
						>
							{s}
						</span>
					))}
				</div>
			</div>
		</PreviewCard>
	);
}

/* ── Modern ── */
export function ModernPreview(props: TemplatePreviewProps) {
	return (
		<PreviewCard {...props} label="Modern" description="Bold accent colors">
			<div className="flex h-full flex-col p-[8px]">
				{T.name("John Anderson", "text-[7px] text-blue-600")}
				<p className="mt-[2px] text-[3.5px] text-gray-400">
					john@email.com | +1 234 567 | New York
				</p>
				<p className="mt-[2px] text-[3px] leading-tight text-gray-400">
					Experienced software engineer with 8+ years building scalable
					applications.
				</p>

				{/* Section with accent border */}
				<div className="mt-[5px] flex items-center gap-[2px]">
					<div className="h-[6px] w-[1.5px] rounded-full bg-blue-600" />
					<p className="text-[4px] font-bold text-blue-600">
						Work Experience
					</p>
				</div>
				{T.entry(
					"Senior Software Engineer",
					"Acme Corp · San Francisco",
					"2020 — Present",
					"font-bold text-blue-600",
				)}
				{T.entry(
					"Software Engineer",
					"StartupXYZ · New York",
					"2017 — 2020",
					"font-bold text-blue-600",
				)}

				<div className="mt-[5px] flex items-center gap-[2px]">
					<div className="h-[6px] w-[1.5px] rounded-full bg-blue-600" />
					<p className="text-[4px] font-bold text-blue-600">Skills</p>
				</div>
				<div className="mt-[2px] flex flex-wrap gap-[2px]">
					{["React", "TypeScript", "Node.js", "Python"].map((s) => (
						<span
							key={s}
							className="rounded-full bg-blue-50 px-[3px] py-[1px] text-[3px] text-blue-600"
						>
							{s}
						</span>
					))}
				</div>
			</div>
		</PreviewCard>
	);
}

/* ── Minimal ── */
export function MinimalPreview(props: TemplatePreviewProps) {
	return (
		<PreviewCard {...props} label="Minimal" description="Clean and spacious">
			<div className="flex h-full flex-col items-center p-[10px] pt-[14px]">
				<p className="text-[5px] font-bold uppercase tracking-[1.5px] text-gray-800">
					John Anderson
				</p>
				<p className="mt-[3px] text-[3px] text-gray-400">
					john@email.com · +1 234 567 · New York
				</p>

				<div
					className="mt-[6px] w-full"
					style={{ borderBottom: "0.5px solid #eee" }}
				/>

				<div className="mt-[4px] w-full">
					<p className="text-[3px] font-bold uppercase tracking-[1px] text-gray-400">
						Experience
					</p>
					{T.entry(
						"Senior Software Engineer",
						"Acme Corp, San Francisco",
						"2020 — Present",
					)}
				</div>

				<div
					className="mt-[4px] w-full"
					style={{ borderBottom: "0.5px solid #eee" }}
				/>

				<div className="mt-[4px] w-full">
					<p className="text-[3px] font-bold uppercase tracking-[1px] text-gray-400">
						Education
					</p>
					{T.entry(
						"B.S. Computer Science",
						"MIT, Cambridge",
						"2013 — 2017",
					)}
				</div>

				<div
					className="mt-[4px] w-full"
					style={{ borderBottom: "0.5px solid #eee" }}
				/>

				<div className="mt-[4px] w-full">
					<p className="text-[3px] font-bold uppercase tracking-[1px] text-gray-400">
						Skills
					</p>
					<p className="mt-[2px] text-[3px] text-gray-500">
						React · TypeScript · Node.js · Python · AWS
					</p>
				</div>
			</div>
		</PreviewCard>
	);
}

/* ── Executive ── */
export function ExecutivePreview(props: TemplatePreviewProps) {
	return (
		<PreviewCard
			{...props}
			label="Executive"
			description="Serif, formal elegance"
		>
			<div className="flex h-full flex-col items-center p-[10px] pt-[12px]" style={{ fontFamily: "Georgia, serif" }}>
				<p className="text-[6px] font-bold uppercase tracking-[2px] text-gray-800" style={{ fontFamily: "Georgia, serif" }}>
					John Anderson
				</p>
				<div className="mt-[3px] w-full" style={{ borderBottom: "1px solid #222" }} />
				<div className="mt-[1px] w-full" style={{ borderBottom: "0.5px solid #222" }} />
				<p className="mt-[3px] text-[3px] text-gray-500">
					john@email.com &nbsp;&nbsp; +1 234 567 &nbsp;&nbsp; New York
				</p>
				<p className="mt-[3px] text-center text-[3px] italic leading-tight text-gray-400">
					Senior executive with 15+ years of leadership experience in global markets.
				</p>

				<p className="mt-[6px] text-center text-[3.5px] font-bold uppercase tracking-[1.5px] text-gray-600" style={{ fontFamily: "Georgia, serif" }}>
					Professional Experience
				</p>
				<div className="mt-[1px] w-full" style={{ borderBottom: "0.5px solid #999" }} />
				{T.entry("Vice President of Engineering", "GlobalTech Inc., London", "2018 — Present")}
				{T.entry("Director of Operations", "Fortune Corp., New York", "2012 — 2018")}

				<p className="mt-[5px] text-center text-[3.5px] font-bold uppercase tracking-[1.5px] text-gray-600" style={{ fontFamily: "Georgia, serif" }}>
					Education
				</p>
				<div className="mt-[1px] w-full" style={{ borderBottom: "0.5px solid #999" }} />
				{T.entry("MBA, Business Administration", "Harvard Business School", "2010 — 2012")}
			</div>
		</PreviewCard>
	);
}

/* ── Creative ── */
export function CreativePreview(props: TemplatePreviewProps) {
	return (
		<PreviewCard
			{...props}
			label="Creative"
			description="Colored sidebar, skill dots"
		>
			<div className="flex h-full">
				{/* Teal sidebar */}
				<div className="w-[33%] rounded-l-[inherit] bg-teal-700 p-[5px] pt-[8px]">
					<p className="text-[5px] font-bold leading-tight text-white">
						John Anderson
					</p>
					<p className="mt-[2px] text-[2.5px] leading-relaxed text-teal-200">
						john@email.com
						<br />
						+1 234 567
						<br />
						New York
					</p>

					<p className="mt-[5px] text-[3px] font-bold uppercase tracking-[0.5px] text-teal-200">
						Skills
					</p>
					<div className="mt-[1px]" style={{ borderBottom: "0.5px solid rgba(255,255,255,0.2)" }} />
					{["React", "TypeScript", "Node.js"].map((skill) => (
						<div key={skill} className="mt-[2px] flex items-center justify-between">
							<p className="text-[2.5px] text-teal-50">{skill}</p>
							<div className="flex gap-[1px]">
								{[1, 2, 3, 4].map((d) => (
									<div
										key={d}
										className="rounded-full"
										style={{
											width: 2.5,
											height: 2.5,
											backgroundColor: d <= 3 ? "#bbf7d0" : "rgba(255,255,255,0.2)",
										}}
									/>
								))}
							</div>
						</div>
					))}

					<p className="mt-[4px] text-[3px] font-bold uppercase tracking-[0.5px] text-teal-200">
						Languages
					</p>
					<div className="mt-[1px]" style={{ borderBottom: "0.5px solid rgba(255,255,255,0.2)" }} />
					<p className="mt-[2px] text-[2.5px] font-bold text-teal-50">English</p>
					<p className="text-[2px] text-teal-300">Native</p>
					<p className="mt-[1px] text-[2.5px] font-bold text-teal-50">Spanish</p>
					<p className="text-[2px] text-teal-300">Fluent</p>
				</div>

				{/* Main content */}
				<div className="flex-1 p-[6px] pt-[8px]">
					<p className="text-[3px] leading-tight text-gray-400">
						Creative engineer with a passion for design systems and UX.
					</p>

					<p className="mt-[4px] text-[4px] font-bold uppercase tracking-[0.5px] text-teal-700">
						Experience
					</p>
					<div className="mt-[1px]" style={{ borderBottom: "1px solid #0d9488" }} />
					{T.entry("Senior Software Engineer", "Acme Corp · SF", "2020 — Pres.", "font-bold text-teal-600")}
					{T.entry("Software Engineer", "StartupXYZ · NY", "2017 — 2020", "font-bold text-teal-600")}

					<p className="mt-[4px] text-[4px] font-bold uppercase tracking-[0.5px] text-teal-700">
						Education
					</p>
					<div className="mt-[1px]" style={{ borderBottom: "1px solid #0d9488" }} />
					{T.entry("B.S. Computer Science", "MIT, Cambridge", "2013 — 2017", "font-bold text-teal-600")}
				</div>
			</div>
		</PreviewCard>
	);
}

/* ── Compact ── */
export function CompactPreview(props: TemplatePreviewProps) {
	return (
		<PreviewCard
			{...props}
			label="Compact"
			description="Dense, maximizes content"
		>
			<div className="flex h-full flex-col p-[6px]">
				{/* Header */}
				<p className="text-[5px] font-bold leading-none text-gray-800">John Anderson</p>
				<p className="mt-[1px] text-[2.5px] text-gray-400">
					john@email.com | +1 234 567 | New York | linkedin.com/in/john
				</p>
				<p className="mt-[1px] text-[2.5px] leading-tight text-gray-400">
					Full-stack engineer. 8+ years experience in distributed systems and web apps.
				</p>
				<div className="mt-[3px]" style={{ borderBottom: "1px solid #222" }} />

				{/* Two-column body */}
				<div className="mt-[3px] flex gap-[6px]">
					{/* Wide col */}
					<div className="flex-1">
						<p className="text-[3px] font-bold uppercase tracking-[0.8px] text-slate-500">
							Experience
						</p>
						<div className="mt-[1px]" style={{ borderBottom: "0.5px solid #94a3b8" }} />
						<div className="mt-[2px]">
							<div className="flex justify-between">
								<p className="text-[3px] font-bold text-gray-700">Sr. Software Engineer</p>
								<p className="text-[2.5px] text-gray-400">2020—Pres.</p>
							</div>
							<p className="text-[2.5px] text-gray-400">Acme Corp</p>
							<p className="text-[2.5px] text-gray-300">Built microservices platform serving 10M users.</p>
						</div>
						<div className="mt-[2px]">
							<div className="flex justify-between">
								<p className="text-[3px] font-bold text-gray-700">Software Engineer</p>
								<p className="text-[2.5px] text-gray-400">2017—2020</p>
							</div>
							<p className="text-[2.5px] text-gray-400">StartupXYZ</p>
							<p className="text-[2.5px] text-gray-300">Led frontend architecture migration to React.</p>
						</div>
						<div className="mt-[2px]">
							<div className="flex justify-between">
								<p className="text-[3px] font-bold text-gray-700">Junior Developer</p>
								<p className="text-[2.5px] text-gray-400">2015—2017</p>
							</div>
							<p className="text-[2.5px] text-gray-400">TechCo</p>
						</div>

						<p className="mt-[3px] text-[3px] font-bold uppercase tracking-[0.8px] text-slate-500">
							Education
						</p>
						<div className="mt-[1px]" style={{ borderBottom: "0.5px solid #94a3b8" }} />
						<div className="mt-[2px] flex justify-between">
							<p className="text-[3px] font-bold text-gray-700">B.S. Computer Science</p>
							<p className="text-[2.5px] text-gray-400">2013—2017</p>
						</div>
						<p className="text-[2.5px] text-gray-400">MIT</p>
					</div>

					{/* Narrow col */}
					<div className="w-[32%]">
						<p className="text-[3px] font-bold uppercase tracking-[0.8px] text-slate-500">
							Skills
						</p>
						<div className="mt-[1px]" style={{ borderBottom: "0.5px solid #94a3b8" }} />
						<div className="mt-[2px] flex flex-wrap gap-[1.5px]">
							{["React", "TS", "Node", "Python", "AWS", "Docker"].map((s) => (
								<span
									key={s}
									className="rounded-[1px] bg-slate-100 px-[2px] py-[0.5px] text-[2.5px] text-slate-600"
								>
									{s}
								</span>
							))}
						</div>

						<p className="mt-[3px] text-[3px] font-bold uppercase tracking-[0.8px] text-slate-500">
							Languages
						</p>
						<div className="mt-[1px]" style={{ borderBottom: "0.5px solid #94a3b8" }} />
						<p className="mt-[1px] text-[2.5px] font-bold text-gray-600">English</p>
						<p className="text-[2px] text-gray-400">Native</p>
						<p className="mt-[1px] text-[2.5px] font-bold text-gray-600">Spanish</p>
						<p className="text-[2px] text-gray-400">Fluent</p>
					</div>
				</div>
			</div>
		</PreviewCard>
	);
}

/* ── Bold ── */
export function BoldPreview(props: TemplatePreviewProps) {
	return (
		<PreviewCard
			{...props}
			label="Bold"
			description="Dramatic header, vibrant"
		>
			<div className="flex h-full flex-col">
				{/* Dark header with accent */}
				<div className="rounded-t-[inherit] px-[7px] py-[7px]" style={{ backgroundColor: "#1a1a2e" }}>
					<div className="mb-[3px] rounded-full" style={{ width: 12, height: 1.5, backgroundColor: "#e67e22" }} />
					<p className="text-[7px] font-bold leading-none text-white">
						John Anderson
					</p>
					<p className="mt-[2px] text-[3px] text-slate-400">
						john@email.com &nbsp; +1 234 567 &nbsp; New York
					</p>
				</div>

				{/* Body */}
				<div className="flex-1 p-[7px]">
					<p className="text-[3px] leading-tight text-gray-400">
						Results-driven engineer building products that scale.
					</p>

					<p className="mt-[4px] text-[4px] font-bold" style={{ color: "#1a1a2e" }}>
						Work Experience
					</p>
					<div className="mb-[3px] rounded-full" style={{ width: 10, height: 1.5, backgroundColor: "#e67e22" }} />
					{T.entry("Senior Software Engineer", "Acme Corp, San Francisco", "2020 — Present", "font-bold text-orange-500")}
					{T.entry("Software Engineer", "StartupXYZ, New York", "2017 — 2020", "font-bold text-orange-500")}

					<p className="mt-[4px] text-[4px] font-bold" style={{ color: "#1a1a2e" }}>
						Skills
					</p>
					<div className="mb-[3px] rounded-full" style={{ width: 10, height: 1.5, backgroundColor: "#e67e22" }} />
					<div className="mt-[1px] flex flex-wrap gap-[2px]">
						{["React", "TypeScript", "Node.js", "Python"].map((s) => (
							<span
								key={s}
								className="rounded-[1px] px-[3px] py-[0.5px] text-[3px]"
								style={{ backgroundColor: "#fef3e2", color: "#c2410c" }}
							>
								{s}
							</span>
						))}
					</div>
				</div>
			</div>
		</PreviewCard>
	);
}

/* ── Professional ── */
export function ProfessionalPreview(props: TemplatePreviewProps) {
	return (
		<PreviewCard
			{...props}
			label="Professional"
			description="Two-column, dark header"
		>
			<div className="flex h-full flex-col">
				{/* Dark header */}
				<div className="rounded-t-[inherit] bg-slate-800 px-[6px] py-[6px]">
					<p className="text-[6px] font-bold leading-none text-white">
						John Anderson
					</p>
					<p className="mt-[2px] text-[3px] leading-none text-slate-400">
						john@email.com | +1 234 567 | New York
					</p>
				</div>

				{/* Two columns */}
				<div className="flex flex-1 overflow-hidden">
					{/* Sidebar */}
					<div className="w-[35%] bg-slate-50 p-[5px]">
						<p className="text-[3px] font-bold uppercase tracking-[0.5px] text-slate-700">
							Skills
						</p>
						<div
							className="mt-[1px]"
							style={{ borderBottom: "0.5px solid #cbd5e1" }}
						/>
						<p className="mt-[2px] text-[3px] leading-relaxed text-slate-500">
							React
							<br />
							TypeScript
							<br />
							Node.js
							<br />
							Python
						</p>

						<p className="mt-[4px] text-[3px] font-bold uppercase tracking-[0.5px] text-slate-700">
							Languages
						</p>
						<div
							className="mt-[1px]"
							style={{ borderBottom: "0.5px solid #cbd5e1" }}
						/>
						<p className="mt-[2px] text-[3px] leading-relaxed text-slate-500">
							English
							<br />
							Spanish
						</p>
					</div>

					{/* Main */}
					<div className="flex-1 p-[5px]">
						<p className="text-[3.5px] font-bold uppercase tracking-[0.5px] text-slate-800">
							Experience
						</p>
						<div
							className="mt-[1px]"
							style={{ borderBottom: "1px solid #1e293b" }}
						/>
						{T.entry(
							"Senior Software Engineer",
							"Acme Corp, San Francisco",
							"2020 — Present",
							"text-slate-400",
						)}
						{T.entry(
							"Software Engineer",
							"StartupXYZ, New York",
							"2017 — 2020",
							"text-slate-400",
						)}
					</div>
				</div>
			</div>
		</PreviewCard>
	);
}
