import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { FileText } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { ExportButton } from "@/components/cv/pdf/ExportButton";
import { loadCoverLetterTemplate } from "@/components/cover-letter/pdf/coverLetterTemplates";
import { api } from "../../convex/_generated/api";

const PDFPreview = lazy(() =>
	import("@/components/cv/pdf/PDFPreview").then((m) => ({
		default: m.PDFPreview,
	})),
);

export const Route = createFileRoute("/cover-letter/$clId")({
	component: PublicCoverLetterPage,
});

function PublicCoverLetterPage() {
	const { clId } = Route.useParams();
	const cl = useQuery(api.coverLetters.getPublic, { id: clId as any });
	const [Template, setTemplate] = useState<React.ComponentType<any> | null>(
		null,
	);

	const templateId = cl?.templateId ?? "classic-letter";

	useEffect(() => {
		loadCoverLetterTemplate(templateId).then((T) => setTemplate(() => T));
	}, [templateId]);

	const templateDocument =
		cl && Template ? (
			<Template
				contactInfo={cl.contactInfo}
				recipientInfo={cl.recipientInfo}
				date={cl.date}
				subject={cl.subject}
				body={cl.body}
				signOff={cl.signOff}
			/>
		) : null;

	return (
		<div className="flex h-screen flex-col">
			<header className="flex h-14 shrink-0 items-center justify-between border-b bg-background px-4 sm:px-6">
				<Link to="/" className="flex items-center gap-2">
					<FileText className="h-5 w-5 text-primary" />
					<span className="font-bold">Alto CV</span>
				</Link>

				{templateDocument && (
					<ExportButton
						document={templateDocument}
						fileName={`${cl!.title.replace(/\s+/g, "_")}.pdf`}
					/>
				)}
			</header>

			<div className="min-h-0 flex-1">
				{cl === undefined ? (
					<div className="flex h-full items-center justify-center">
						<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
					</div>
				) : cl === null ? (
					<NotFound />
				) : templateDocument ? (
					<Suspense
						fallback={
							<div className="flex h-full items-center justify-center">
								<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
							</div>
						}
					>
						<PDFPreview document={templateDocument} />
					</Suspense>
				) : (
					<div className="flex h-full items-center justify-center">
						<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
					</div>
				)}
			</div>

			{cl && (
				<footer className="shrink-0 border-t bg-muted/30 px-4 py-3 text-center text-sm text-muted-foreground sm:px-6">
					Created with{" "}
					<Link
						to="/"
						className="font-medium text-foreground underline-offset-4 hover:underline"
					>
						Alto CV
					</Link>{" "}
					— build your own professional CV for free.
				</footer>
			)}
		</div>
	);
}

function NotFound() {
	return (
		<div className="flex h-full flex-col items-center justify-center gap-4 px-4 text-center">
			<FileText className="h-12 w-12 text-muted-foreground/40" />
			<div>
				<h1 className="text-xl font-semibold">Cover letter not available</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					This cover letter is either private or doesn't exist.
				</p>
			</div>
			<Link
				to="/"
				className="text-sm font-medium underline-offset-4 hover:underline"
			>
				Go to Alto CV
			</Link>
		</div>
	);
}
