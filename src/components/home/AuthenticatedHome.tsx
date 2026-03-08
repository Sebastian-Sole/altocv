import { useUser } from "@clerk/tanstack-react-start";
import { Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery } from "convex/react";
import {
	BarChart3,
	BrainCircuit,
	FileText,
	Globe,
	Layout,
	Link2,
	Mail,
	Plus,
	Sparkles,
} from "lucide-react";
import { useState } from "react";
import { CreateCVDialog } from "@/components/cv/CreateCVDialog";
import { CreateCoverLetterDialog } from "@/components/cover-letter/CreateCoverLetterDialog";
import { CVCard } from "@/components/cv/CVCard";
import { CoverLetterCard } from "@/components/cover-letter/CoverLetterCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState("cvs");
	const [createCVDialogOpen, setCreateCVDialogOpen] = useState(false);
	const [createCLDialogOpen, setCreateCLDialogOpen] = useState(false);

	const cvs = useQuery(api.cvs.list);
	const coverLetters = useQuery(api.coverLetters.list);

	const createCV = useMutation(api.cvs.create);
	const duplicateCV = useMutation(api.cvs.duplicate);
	const removeCV = useMutation(api.cvs.remove);

	const createCL = useMutation(api.coverLetters.create);
	const duplicateCL = useMutation(api.coverLetters.duplicate);
	const removeCL = useMutation(api.coverLetters.remove);

	const firstName = user?.firstName ?? "there";

	async function handleCreateCV(data: { title: string; language: string }) {
		const id = await createCV(data);
		setCreateCVDialogOpen(false);
		navigate({ to: "/editor/$cvId", params: { cvId: id } });
	}

	async function handleCreateCL(data: {
		title: string;
		language: string;
		templateId: string;
		linkedCvId?: string;
	}) {
		const id = await createCL({
			...data,
			linkedCvId: data.linkedCvId as any,
		});
		setCreateCLDialogOpen(false);
		navigate({ to: "/editor/cover-letter/$clId", params: { clId: id } });
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
						<div className="flex flex-col gap-2 sm:flex-row">
							<Button
								size="lg"
								onClick={() => setCreateCVDialogOpen(true)}
								className="w-full sm:w-auto"
							>
								<Plus className="mr-2 h-4 w-4" />
								New CV
							</Button>
							<Button
								size="lg"
								variant="outline"
								onClick={() => setCreateCLDialogOpen(true)}
								className="w-full sm:w-auto"
							>
								<Plus className="mr-2 h-4 w-4" />
								New Cover Letter
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Documents list */}
			<section className="px-4 py-10 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
					<Tabs value={activeTab} onValueChange={setActiveTab}>
						<div className="mb-6 flex items-center justify-between">
							<TabsList>
								<TabsTrigger value="cvs" className="gap-1.5">
									<FileText className="h-4 w-4" />
									CVs
								</TabsTrigger>
								<TabsTrigger value="cover-letters" className="gap-1.5">
									<Mail className="h-4 w-4" />
									Cover Letters
								</TabsTrigger>
							</TabsList>
							{activeTab === "cvs" && cvs && cvs.length > 0 && (
								<Button variant="ghost" size="sm" asChild>
									<Link to="/dashboard" search={{ tab: undefined }}>
										View all
									</Link>
								</Button>
							)}
							{activeTab === "cover-letters" &&
								coverLetters &&
								coverLetters.length > 0 && (
									<Button variant="ghost" size="sm" asChild>
										<Link
											to="/dashboard"
											search={{ tab: "cover-letters" }}
										>
											View all
										</Link>
									</Button>
								)}
						</div>

						<TabsContent value="cvs" className="mt-0">
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
								<EmptyState
									icon={
										<FileText className="h-12 w-12 text-muted-foreground" />
									}
									title="No CVs yet"
									description="Create your first CV and start building your professional resume."
									actionLabel="Create your first CV"
									onAction={() => setCreateCVDialogOpen(true)}
								/>
							) : (
								<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
									{cvs.slice(0, 6).map((cv) => (
										<CVCard
											key={cv._id}
											id={cv._id}
											title={cv.title}
											updatedAt={cv.updatedAt}
											language={cv.language}
											onDuplicate={(id) =>
												duplicateCV({ id: id as any })
											}
											onDelete={(id) =>
												removeCV({ id: id as any })
											}
										/>
									))}
								</div>
							)}
						</TabsContent>

						<TabsContent value="cover-letters" className="mt-0">
							{coverLetters === undefined ? (
								<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
									{Array.from({ length: 3 }).map((_, i) => (
										<div
											key={`skeleton-${i}`}
											className="h-28 animate-pulse rounded-lg bg-muted"
										/>
									))}
								</div>
							) : coverLetters.length === 0 ? (
								<EmptyState
									icon={
										<Mail className="h-12 w-12 text-muted-foreground" />
									}
									title="No cover letters yet"
									description="Create your first cover letter to accompany your CV applications."
									actionLabel="Create your first cover letter"
									onAction={() => setCreateCLDialogOpen(true)}
								/>
							) : (
								<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
									{coverLetters.slice(0, 6).map((cl) => (
										<CoverLetterCard
											key={cl._id}
											id={cl._id}
											title={cl.title}
											updatedAt={cl.updatedAt}
											language={cl.language}
											onDuplicate={(id) =>
												duplicateCL({ id: id as any })
											}
											onDelete={(id) =>
												removeCL({ id: id as any })
											}
										/>
									))}
								</div>
							)}
						</TabsContent>
					</Tabs>
				</div>
			</section>

			{/* Premium features */}
			<section className="border-t bg-muted/30 px-4 py-16 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
					<div className="mb-2 flex items-center justify-center gap-2">
						<Sparkles className="h-5 w-5 text-primary" />
						<Badge
							variant="secondary"
							className="text-xs font-medium uppercase tracking-wider"
						>
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
										<Badge
											variant="outline"
											className="text-xs text-muted-foreground"
										>
											{feature.badge}
										</Badge>
									</div>
									<CardTitle className="text-base">
										{feature.title}
									</CardTitle>
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
				open={createCVDialogOpen}
				onOpenChange={setCreateCVDialogOpen}
				onSubmit={handleCreateCV}
			/>
			<CreateCoverLetterDialog
				open={createCLDialogOpen}
				onOpenChange={setCreateCLDialogOpen}
				onSubmit={handleCreateCL}
			/>
		</main>
	);
}

function EmptyState({
	icon,
	title,
	description,
	actionLabel,
	onAction,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
	actionLabel: string;
	onAction: () => void;
}) {
	return (
		<div className="flex flex-col items-center justify-center py-24 text-center">
			<div className="rounded-full bg-muted p-6">{icon}</div>
			<h2 className="mt-6 text-2xl font-semibold">{title}</h2>
			<p className="mt-2 max-w-sm text-muted-foreground">{description}</p>
			<button
				type="button"
				onClick={onAction}
				className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
			>
				{actionLabel}
			</button>
		</div>
	);
}
