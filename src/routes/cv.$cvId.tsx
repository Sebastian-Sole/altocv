import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { FileText } from "lucide-react";
import { lazy, Suspense } from "react";
import { ExportButton } from "@/components/cv/pdf/ExportButton";
import { api } from "../../convex/_generated/api";

const PDFPreview = lazy(() =>
	import("@/components/cv/pdf/PDFPreview").then((m) => ({
		default: m.PDFPreview,
	})),
);

export const Route = createFileRoute("/cv/$cvId")({
	component: PublicCVPage,
});

function PublicCVPage() {
	const { cvId } = Route.useParams();
	const cv = useQuery(api.cvs.getPublic, { id: cvId as any });

	return (
		<div className="flex h-screen flex-col">
			{/* Minimal header */}
			<header className="flex h-14 shrink-0 items-center justify-between border-b bg-background px-4 sm:px-6">
				<Link to="/" className="flex items-center gap-2">
					<FileText className="h-5 w-5 text-primary" />
					<span className="font-bold">Alto CV</span>
				</Link>

				{cv && (
					<ExportButton
						title={cv.title}
						contactInfo={cv.contactInfo}
						sections={cv.sections}
						sectionOrder={cv.sectionOrder}
					/>
				)}
			</header>

			{/* Content */}
			<div className="min-h-0 flex-1">
				{cv === undefined ? (
					<div className="flex h-full items-center justify-center">
						<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
					</div>
				) : cv === null ? (
					<NotFound />
				) : (
					<Suspense
						fallback={
							<div className="flex h-full items-center justify-center">
								<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
							</div>
						}
					>
						<PDFPreview
							contactInfo={cv.contactInfo}
							sections={cv.sections}
							sectionOrder={cv.sectionOrder}
						/>
					</Suspense>
				)}
			</div>

			{/* Footer CTA */}
			{cv && (
				<footer className="shrink-0 border-t bg-muted/30 px-4 py-3 text-center text-sm text-muted-foreground sm:px-6">
					Created with{" "}
					<Link to="/" className="font-medium text-foreground underline-offset-4 hover:underline">
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
				<h1 className="text-xl font-semibold">CV not available</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					This CV is either private or doesn't exist.
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
