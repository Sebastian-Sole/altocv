import { Link } from "@tanstack/react-router";
import { Copy, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CoverLetterCardProps {
	id: string;
	title: string;
	updatedAt: number;
	language: string;
	onDuplicate: (id: string) => void;
	onDelete: (id: string) => void;
}

export function CoverLetterCard({
	id,
	title,
	updatedAt,
	language,
	onDuplicate,
	onDelete,
}: CoverLetterCardProps) {
	const formattedDate = new Date(updatedAt).toLocaleDateString(undefined, {
		year: "numeric",
		month: "short",
		day: "numeric",
	});

	return (
		<Card className="group relative transition-shadow hover:shadow-md">
			<Link
				to="/editor/cover-letter/$clId"
				params={{ clId: id }}
				className="absolute inset-0 z-0"
			>
				<span className="sr-only">Edit {title}</span>
			</Link>
			<CardHeader className="flex flex-row items-start justify-between space-y-0">
				<div className="space-y-1">
					<CardTitle className="text-lg">{title}</CardTitle>
					<CardDescription>
						{formattedDate} &middot; {language.toUpperCase()}
					</CardDescription>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="relative z-10 h-8 w-8"
						>
							<MoreVertical className="h-4 w-4" />
							<span className="sr-only">Actions</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem asChild>
							<Link
								to="/editor/cover-letter/$clId"
								params={{ clId: id }}
							>
								<Pencil className="mr-2 h-4 w-4" />
								Edit
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => onDuplicate(id)}>
							<Copy className="mr-2 h-4 w-4" />
							Duplicate
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => onDelete(id)}
							className="text-destructive"
						>
							<Trash2 className="mr-2 h-4 w-4" />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</CardHeader>
		</Card>
	);
}
