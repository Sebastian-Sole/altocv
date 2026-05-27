import { Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFound() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
			<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
				<FileText className="h-8 w-8 text-muted-foreground" />
			</div>
			<div className="space-y-2">
				<p className="text-sm font-medium text-muted-foreground">404</p>
				<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
					Page not found
				</h1>
				<p className="mx-auto max-w-md text-sm text-muted-foreground">
					The page you're looking for doesn't exist or has been moved.
				</p>
			</div>
			<Button asChild>
				<Link to="/">Go back home</Link>
			</Button>
		</div>
	);
}
