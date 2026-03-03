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
				<p className="text-sm text-muted-foreground">
					&copy; {new Date().getFullYear()} Alto CV. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
