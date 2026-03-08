interface EditorLayoutProps {
	sidebar: React.ReactNode;
	preview: React.ReactNode;
}

export function EditorLayout({ sidebar, preview }: EditorLayoutProps) {
	return (
		<div className="flex flex-col lg:h-[calc(100vh-3.5rem)] lg:flex-row lg:overflow-hidden">
			<div className="w-full lg:w-[480px] lg:shrink-0 lg:overflow-y-auto lg:border-r">
				{sidebar}
			</div>
			<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:bg-muted/50 lg:p-8">
				{preview}
			</div>
		</div>
	);
}
