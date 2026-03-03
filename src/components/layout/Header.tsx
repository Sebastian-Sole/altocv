import { SignedIn, SignedOut, UserButton } from "@clerk/tanstack-react-start";
import { Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
	return (
		<header className="border-b border-border bg-background">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<Link to="/" className="flex items-center gap-2">
					<FileText className="h-6 w-6 text-primary" />
					<span className="text-xl font-bold">Alto CV</span>
				</Link>

				<nav className="flex items-center gap-4">
					<SignedOut>
						<Button variant="ghost" asChild>
							<Link to="/sign-in">Sign In</Link>
						</Button>
						<Button asChild>
							<Link to="/sign-up">Get Started</Link>
						</Button>
					</SignedOut>
					<SignedIn>
						<Button variant="ghost" asChild>
							<Link to="/dashboard">Dashboard</Link>
						</Button>
						<UserButton />
					</SignedIn>
				</nav>
			</div>
		</header>
	);
}
