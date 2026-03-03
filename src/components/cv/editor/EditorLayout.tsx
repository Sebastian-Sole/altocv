interface EditorLayoutProps {
	sidebar: React.ReactNode;
	preview: React.ReactNode;
}

export function EditorLayout({ sidebar, preview }: EditorLayoutProps) {
	return (
		<div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
			<div className="w-full max-w-lg shrink-0 overflow-hidden lg:w-[480px]">
				{sidebar}
			</div>
			<div className="flex flex-1 items-center justify-center bg-muted/50 p-8">
				{preview}
			</div>
		</div>
	);
}
