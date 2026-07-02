import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/brand/Logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Hero() {
	return (
		<section className="relative overflow-hidden px-4 py-28 sm:px-6 lg:px-8">
			{/* warm ambient glow behind the headline */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-72 max-w-3xl rounded-full bg-brand/10 blur-3xl"
			/>
			<div className="relative mx-auto max-w-3xl text-center">
				<div className="mx-auto mb-8 w-fit">
					<LogoMark size={64} className="drop-shadow-sm" />
				</div>
				<Badge variant="brand" className="mb-6 px-3 py-1 text-sm">
					Crafted for the shortlist
				</Badge>
				<h1 className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
					Your career,
					<br />
					<span className="text-brand">beautifully composed.</span>
				</h1>
				<p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
					Turn your experience into a document worth reading. Alto gives you
					considered templates, real-time preview, and one-click PDF export —
					no design skills required.
				</p>
				<div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
					<Button size="lg" variant="accent" asChild>
						<Link to="/sign-up">
							Start building free
							<ArrowRight className="ml-1 h-4 w-4" />
						</Link>
					</Button>
					<Button size="lg" variant="outline" asChild>
						<Link to="/sign-in">Sign in</Link>
					</Button>
				</div>
				<p className="mt-5 text-sm text-muted-foreground">
					Free to start · No credit card · ATS-friendly
				</p>
			</div>
		</section>
	);
}
