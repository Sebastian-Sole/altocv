import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EditorHeaderProps {
	title: string;
	onTitleChange: (title: string) => void;
	saving: boolean;
	children?: React.ReactNode;
}

export function EditorHeader({
	title,
	onTitleChange,
	saving,
	children,
}: EditorHeaderProps) {
	return (
		<header className="flex h-14 items-center gap-3 border-b bg-background px-4">
			<Button variant="ghost" size="icon" asChild>
				<Link to="/dashboard">
					<ArrowLeft className="h-4 w-4" />
				</Link>
			</Button>
			<Input
				value={title}
				onChange={(e) => onTitleChange(e.target.value)}
				className="h-8 max-w-xs border-none bg-transparent text-lg font-semibold shadow-none focus-visible:ring-0"
			/>
			<div className="flex items-center gap-1 text-xs text-muted-foreground">
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
			<div className="ml-auto flex items-center gap-2">{children}</div>
		</header>
	);
}
