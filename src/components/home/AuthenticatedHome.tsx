import { useUser } from "@clerk/tanstack-react-start";
import { Link } from "@tanstack/react-router";
import { useMutation, useQuery } from "convex/react";
import {
	BarChart3,
	BrainCircuit,
	FileText,
	Globe,
	Layout,
	Link2,
	Plus,
	Sparkles,
} from "lucide-react";
import { useState } from "react";
import { CreateCVDialog } from "@/components/cv/CreateCVDialog";
import { CVCard } from "@/components/cv/CVCard";
import { EmptyState } from "@/components/cv/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { api } from "../../../convex/_generated/api";

const premiumFeatures = [
	{
		icon: Layout,
		title: "More Templates",
		description:
			"Access a library of professionally designed templates tailored for every industry and career level.",
		badge: "Coming Soon",
	},
	{
		icon: BrainCircuit,
		title: "AI Content Assistant",
		description:
			"Get real-time suggestions to strengthen your bullet points, highlight key achievements, and beat ATS filters.",
		badge: "Coming Soon",
	},
	{
		icon: Globe,
		title: "Shareable CV Link",
		description:
			"Publish your CV online with a custom URL. Share a live link with recruiters instead of a static file.",
		badge: "Coming Soon",
	},
	{
		icon: BarChart3,
		title: "CV Analytics",
		description:
			"See how many times your CV was viewed, by whom, and for how long — so you can follow up at the right time.",
		badge: "Coming Soon",
	},
	{
		icon: FileText,
		title: "Cover Letter Generator",
		description:
			"Instantly generate a tailored cover letter that matches your CV and the job description.",
		badge: "Coming Soon",
	},
	{
		icon: Link2,
		title: "LinkedIn Import",
		description:
			"Import your work history, education, and skills directly from your LinkedIn profile in one click.",
		badge: "Coming Soon",
	},
];

export function AuthenticatedHome() {
	const { user } = useUser();
	const [createDialogOpen, setCreateDialogOpen] = useState(false);
	const cvs = useQuery(api.cvs.list);
	const createCV = useMutation(api.cvs.create);
	const duplicateCV = useMutation(api.cvs.duplicate);
	const removeCV = useMutation(api.cvs.remove);

	const firstName = user?.firstName ?? "there";

	async function handleCreate(data: { title: string; language: string }) {
		await createCV(data);
		setCreateDialogOpen(false);
	}

	async function handleDuplicate(id: string) {
		await duplicateCV({ id: id as any });
	}

	async function handleDelete(id: string) {
		await removeCV({ id: id as any });
	}

	return (
		<main className="flex-1">
			{/* Welcome hero */}
			<section className="border-b bg-muted/30 px-4 py-10 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
					<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<h1 className="text-3xl font-bold tracking-tight">
								Welcome back, {firstName}
							</h1>
							<p className="mt-1 text-muted-foreground">
								Pick up where you left off or start something new.
							</p>
						</div>
						<Button
							size="lg"
							onClick={() => setCreateDialogOpen(true)}
							className="w-full sm:w-auto"
						>
							<Plus className="mr-2 h-4 w-4" />
							New CV
						</Button>
					</div>
				</div>
			</section>

			{/* CV list */}
			<section className="px-4 py-10 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
					<div className="mb-6 flex items-center justify-between">
						<h2 className="text-xl font-semibold">My CVs</h2>
						{cvs && cvs.length > 0 && (
							<Button
								variant="ghost"
								size="sm"
								asChild
							>
								<Link to="/dashboard">View all</Link>
							</Button>
						)}
					</div>

					{cvs === undefined ? (
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{Array.from({ length: 3 }).map((_, i) => (
								<div
									key={`skeleton-${i}`}
									className="h-28 animate-pulse rounded-lg bg-muted"
								/>
							))}
						</div>
					) : cvs.length === 0 ? (
						<EmptyState onCreateCV={() => setCreateDialogOpen(true)} />
					) : (
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{cvs.slice(0, 6).map((cv) => (
								<CVCard
									key={cv._id}
									id={cv._id}
									title={cv.title}
									updatedAt={cv.updatedAt}
									language={cv.language}
									onDuplicate={handleDuplicate}
									onDelete={handleDelete}
								/>
							))}
						</div>
					)}
				</div>
			</section>

			{/* Premium features */}
			<section className="border-t bg-muted/30 px-4 py-16 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
					<div className="mb-2 flex items-center justify-center gap-2">
						<Sparkles className="h-5 w-5 text-primary" />
						<Badge variant="secondary" className="text-xs font-medium uppercase tracking-wider">
							Premium
						</Badge>
					</div>
					<h2 className="mt-3 text-center text-3xl font-bold">
						Supercharge your job search
					</h2>
					<p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
						We're building powerful tools to help you stand out and land the role
						faster. Be the first to know when they launch.
					</p>

					<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{premiumFeatures.map((feature) => (
							<Card
								key={feature.title}
								className="relative overflow-hidden transition-shadow hover:shadow-md"
							>
								<CardHeader>
									<div className="mb-1 flex items-center justify-between">
										<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
											<feature.icon className="h-5 w-5 text-primary" />
										</div>
										<Badge variant="outline" className="text-xs text-muted-foreground">
											{feature.badge}
										</Badge>
									</div>
									<CardTitle className="text-base">{feature.title}</CardTitle>
									<CardDescription className="text-sm leading-relaxed">
										{feature.description}
									</CardDescription>
								</CardHeader>
							</Card>
						))}
					</div>

					<div className="mt-10 flex justify-center">
						<Button size="lg" variant="outline" className="gap-2">
							<Sparkles className="h-4 w-4" />
							Notify me when Premium launches
						</Button>
					</div>
				</div>
			</section>

			<CreateCVDialog
				open={createDialogOpen}
				onOpenChange={setCreateDialogOpen}
				onSubmit={handleCreate}
			/>
		</main>
	);
}
