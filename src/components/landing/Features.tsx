import { Eye, Globe, Zap } from "lucide-react";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const features = [
	{
		icon: Eye,
		title: "Live Preview",
		description:
			"See your CV update in real-time as you type. No more guessing how your resume will look.",
	},
	{
		icon: Zap,
		title: "Instant PDF Export",
		description:
			"Download your CV as a pixel-perfect PDF with one click. Ready for any application.",
	},
	{
		icon: Globe,
		title: "AI Translation",
		description:
			"Translate your CV into any language with AI. Apply to jobs worldwide without the hassle.",
	},
];

export function Features() {
	return (
		<section className="border-t bg-muted/50 px-4 py-24 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<h2 className="text-center text-3xl font-bold">
					Everything you need to land the job
				</h2>
				<p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
					Powerful features that make CV building effortless.
				</p>
				<div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{features.map((feature) => (
						<Card key={feature.title}>
							<CardHeader>
								<div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
									<feature.icon className="h-5 w-5 text-primary-foreground" />
								</div>
								<CardTitle>{feature.title}</CardTitle>
								<CardDescription>{feature.description}</CardDescription>
							</CardHeader>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
