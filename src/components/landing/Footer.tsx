import { Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
	return (
		<footer className="border-t px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<div className="flex items-center gap-2">
					<FileText className="h-5 w-5 text-primary" />
					<span className="font-semibold">Alto CV</span>
				</div>
				<Separator className="my-6" />
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<p className="text-sm text-muted-foreground">
						&copy; {new Date().getFullYear()} Alto CV. All rights reserved.
					</p>
					<nav className="flex items-center gap-4 text-sm">
						<Link
							to="/terms"
							className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
						>
							Terms
						</Link>
						<Link
							to="/privacy"
							className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
						>
							Privacy
						</Link>
					</nav>
				</div>
			</div>
		</footer>
	);
}
