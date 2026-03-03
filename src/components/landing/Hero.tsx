import { Link } from "@tanstack/react-router";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
	return (
		<section className="px-4 py-24 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-4xl text-center">
				<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
					<FileText className="h-8 w-8 text-primary-foreground" />
				</div>
				<h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
					Build your perfect CV
					<br />
					<span className="text-muted-foreground">in minutes</span>
				</h1>
				<p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
					Create professional, ATS-friendly resumes with our intuitive editor.
					Real-time preview, multiple templates, and instant PDF export.
				</p>
				<div className="mt-10 flex items-center justify-center gap-4">
					<Button size="lg" asChild>
						<Link to="/sign-up">
							Get Started Free
							<ArrowRight className="ml-2 h-4 w-4" />
						</Link>
					</Button>
					<Button size="lg" variant="outline" asChild>
						<Link to="/sign-in">Sign In</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
