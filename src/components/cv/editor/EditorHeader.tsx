import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Eye, Loader2, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EditorHeaderProps {
	title: string;
	onTitleChange: (title: string) => void;
	saving: boolean;
	preview?: React.ReactNode;
	children?: React.ReactNode;
}

export function EditorHeader({
	title,
	onTitleChange,
	saving,
	preview,
	children,
}: EditorHeaderProps) {
	const [showPreview, setShowPreview] = useState(false);

	return (
		<>
			<header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
				<Button variant="ghost" size="icon" className="shrink-0" asChild>
					<Link to="/dashboard">
						<ArrowLeft className="h-4 w-4" />
					</Link>
				</Button>
				<Input
					value={title}
					onChange={(e) => onTitleChange(e.target.value)}
					className="h-8 min-w-0 flex-1 border-none bg-transparent text-lg font-semibold shadow-none focus-visible:ring-0 sm:max-w-xs sm:flex-none"
				/>
				<div className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
					{saving ? (
						<>
							<Loader2 className="h-3 w-3 animate-spin" />
							Saving...
						</>
					) : (
						<>
							<Check className="h-3 w-3" />
							Saved
						</>
					)}
				</div>
				<div className="ml-auto flex shrink-0 items-center gap-1.5">
					{preview && (
						<Button
							variant="outline"
							size="sm"
							className="lg:hidden"
							onClick={() => setShowPreview(true)}
						>
							<Eye className="h-4 w-4" />
							<span className="hidden sm:inline">Preview</span>
						</Button>
					)}
					{children}
				</div>
			</header>

			{showPreview && preview && (
				<div className="fixed inset-0 z-50 flex flex-col bg-background lg:hidden">
					<div className="flex h-14 shrink-0 items-center justify-between border-b px-4">
						<h2 className="text-lg font-semibold">Preview</h2>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setShowPreview(false)}
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
					<div className="flex-1 overflow-y-auto">{preview}</div>
				</div>
			)}
		</>
	);
}
