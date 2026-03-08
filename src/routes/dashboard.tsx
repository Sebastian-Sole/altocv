import { SignedIn, SignedOut } from "@clerk/tanstack-react-start";
import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery } from "convex/react";
import { FileText, Mail, Plus } from "lucide-react";
import { useState } from "react";
import { CreateCVDialog } from "@/components/cv/CreateCVDialog";
import { CVCard } from "@/components/cv/CVCard";
import { CoverLetterCard } from "@/components/cover-letter/CoverLetterCard";
import { CreateCoverLetterDialog } from "@/components/cover-letter/CreateCoverLetterDialog";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/dashboard")({
	component: DashboardPage,
	validateSearch: (search: Record<string, unknown>) => ({
		tab: search.tab === "cover-letters" ? ("cover-letters" as const) : undefined,
	}),
});

function DashboardPage() {
	const { tab: searchTab } = Route.useSearch();
	const tab = searchTab ?? "cvs";
	const [createCVDialogOpen, setCreateCVDialogOpen] = useState(false);
	const [createCLDialogOpen, setCreateCLDialogOpen] = useState(false);
	const navigate = useNavigate();

	const cvs = useQuery(api.cvs.list);
	const coverLetters = useQuery(api.coverLetters.list);

	const createCV = useMutation(api.cvs.create);
	const duplicateCV = useMutation(api.cvs.duplicate);
	const removeCV = useMutation(api.cvs.remove);

	const createCL = useMutation(api.coverLetters.create);
	const duplicateCL = useMutation(api.coverLetters.duplicate);
	const removeCL = useMutation(api.coverLetters.remove);

	async function handleCreateCV(data: {
		title: string;
		language: string;
		templateId: string;
	}) {
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
		<div className="flex min-h-screen flex-col">
			<Header />
			<SignedOut>
				<Navigate to="/sign-in" />
			</SignedOut>
			<SignedIn>
				<main className="flex-1">
					<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
						<Tabs
						value={tab}
						onValueChange={(value) =>
							navigate({
								to: "/dashboard",
								search: {
									tab:
										value === "cover-letters"
											? ("cover-letters" as const)
											: undefined,
								},
								replace: true,
							})
						}
					>
							<div className="flex items-center justify-between">
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
							</div>

							<TabsContent value="cvs">
								<div className="mt-4 flex items-center justify-between">
									<h2 className="text-2xl font-bold">My CVs</h2>
									<Button onClick={() => setCreateCVDialogOpen(true)}>
										<Plus className="mr-2 h-4 w-4" />
										New CV
									</Button>
								</div>

								{cvs === undefined ? (
									<div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
										{Array.from({ length: 3 }).map((_, i) => (
											<div
												key={`skeleton-${i}`}
												className="h-32 animate-pulse rounded-lg bg-muted"
											/>
										))}
									</div>
								) : cvs.length === 0 ? (
									<EmptyState
										icon={<FileText className="h-12 w-12 text-muted-foreground" />}
										title="No CVs yet"
										description="Create your first CV and start building your professional resume."
										actionLabel="Create your first CV"
										onAction={() => setCreateCVDialogOpen(true)}
									/>
								) : (
									<div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
										{cvs.map((cv) => (
											<CVCard
												key={cv._id}
												id={cv._id}
												title={cv.title}
												updatedAt={cv.updatedAt}
												language={cv.language}
												onDuplicate={(id) => duplicateCV({ id: id as any })}
												onDelete={(id) => removeCV({ id: id as any })}
											/>
										))}
									</div>
								)}
							</TabsContent>

							<TabsContent value="cover-letters">
								<div className="mt-4 flex items-center justify-between">
									<h2 className="text-2xl font-bold">My Cover Letters</h2>
									<Button onClick={() => setCreateCLDialogOpen(true)}>
										<Plus className="mr-2 h-4 w-4" />
										New Cover Letter
									</Button>
								</div>

								{coverLetters === undefined ? (
									<div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
										{Array.from({ length: 3 }).map((_, i) => (
											<div
												key={`skeleton-${i}`}
												className="h-32 animate-pulse rounded-lg bg-muted"
											/>
										))}
									</div>
								) : coverLetters.length === 0 ? (
									<EmptyState
										icon={<Mail className="h-12 w-12 text-muted-foreground" />}
										title="No cover letters yet"
										description="Create your first cover letter to accompany your CV applications."
										actionLabel="Create your first cover letter"
										onAction={() => setCreateCLDialogOpen(true)}
									/>
								) : (
									<div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
										{coverLetters.map((cl) => (
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
			</SignedIn>
		</div>
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
