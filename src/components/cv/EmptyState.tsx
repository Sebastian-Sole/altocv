import { FileText } from "lucide-react";

interface EmptyStateProps {
	onCreateCV: () => void;
}

export function EmptyState({ onCreateCV }: EmptyStateProps) {
	return (
		<div className="flex flex-col items-center justify-center py-24 text-center">
			<div className="rounded-full bg-muted p-6">
				<FileText className="h-12 w-12 text-muted-foreground" />
			</div>
			<h2 className="mt-6 text-2xl font-semibold">No CVs yet</h2>
			<p className="mt-2 max-w-sm text-muted-foreground">
				Create your first CV and start building your professional resume.
			</p>
			<button
				type="button"
				onClick={onCreateCV}
				className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
			>
				Create your first CV
			</button>
		</div>
	);
}
