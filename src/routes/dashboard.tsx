import { SignedIn, SignedOut } from "@clerk/tanstack-react-start";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useMutation, useQuery } from "convex/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateCVDialog } from "@/components/cv/CreateCVDialog";
import { CVCard } from "@/components/cv/CVCard";
import { EmptyState } from "@/components/cv/EmptyState";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/dashboard")({
	component: DashboardPage,
});

function DashboardPage() {
	const [createDialogOpen, setCreateDialogOpen] = useState(false);
	const cvs = useQuery(api.cvs.list);
	const createCV = useMutation(api.cvs.create);
	const duplicateCV = useMutation(api.cvs.duplicate);
	const removeCV = useMutation(api.cvs.remove);

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
		<div className="flex min-h-screen flex-col">
			<Header />
			<SignedOut>
				<Navigate to="/sign-in" />
			</SignedOut>
			<SignedIn>
			<main className="flex-1">
				<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between">
						<h1 className="text-3xl font-bold">My CVs</h1>
						<Button onClick={() => setCreateDialogOpen(true)}>
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
						<EmptyState onCreateCV={() => setCreateDialogOpen(true)} />
					) : (
						<div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{cvs.map((cv) => (
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

				<CreateCVDialog
					open={createDialogOpen}
					onOpenChange={setCreateDialogOpen}
					onSubmit={handleCreate}
				/>
			</main>
			</SignedIn>
		</div>
	);
}
