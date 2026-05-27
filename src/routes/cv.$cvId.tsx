import { createFileRoute, Link } from "@tanstack/react-router";
import { ConvexHttpClient } from "convex/browser";
import { useQuery } from "convex/react";
import { FileText } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { ExportButton } from "@/components/cv/pdf/ExportButton";
import { loadTemplate } from "@/components/cv/pdf/templates";
import { api } from "../../convex/_generated/api";

const PDFPreview = lazy(() =>
	import("@/components/cv/pdf/PDFPreview").then((m) => ({
		default: m.PDFPreview,
	})),
);

const SITE_DEFAULT_DESCRIPTION =
	"Alto CV — a modern CV and cover letter builder.";

export const Route = createFileRoute("/cv/$cvId")({
	loader: async ({ params }) => {
		const url = import.meta.env.VITE_CONVEX_URL as string | undefined;
		if (!url) {
			return { meta: null as null | { title: string; ownerName: string } };
		}
		try {
			const client = new ConvexHttpClient(url);
			const cv = await client.query(api.cvs.getPublic, {
				id: params.cvId as any,
			});
			if (!cv) {
				return { meta: null };
			}
			return {
				meta: {
					title: cv.title as string,
					ownerName: (cv.contactInfo?.fullName as string) ?? "",
				},
			};
		} catch {
			return { meta: null };
		}
	},
	head: ({ loaderData }) => {
		const meta = loaderData?.meta;
		if (!meta) {
			return {
				meta: [
					{ title: "Shared CV — Alto CV" },
					{ name: "description", content: SITE_DEFAULT_DESCRIPTION },
					{ name: "robots", content: "noindex" },
				],
			};
		}
		const pageTitle = `${meta.title} — Alto CV`;
		const description = meta.ownerName
			? `${meta.ownerName}'s CV, built with Alto CV.`
			: `A CV built with Alto CV.`;
		return {
			meta: [
				{ title: pageTitle },
				{ name: "description", content: description },
				{ property: "og:title", content: pageTitle },
				{ property: "og:description", content: description },
				{ property: "og:type", content: "profile" },
				{ name: "twitter:title", content: pageTitle },
				{ name: "twitter:description", content: description },
			],
		};
	},
	component: PublicCVPage,
});

function PublicCVPage() {
	const { cvId } = Route.useParams();
	const cv = useQuery(api.cvs.getPublic, { id: cvId as any });
	const [Template, setTemplate] = useState<React.ComponentType<any> | null>(null);

	const templateId = cv?.templateId ?? "classic";

	useEffect(() => {
		loadTemplate(templateId).then((T) => setTemplate(() => T));
	}, [templateId]);

	const templateDocument = cv && Template ? (
		<Template
			contactInfo={cv.contactInfo}
			sections={cv.sections}
			sectionOrder={cv.sectionOrder}
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
						fileName={`${cv!.title.replace(/\s+/g, "_")}.pdf`}
					/>
				)}
			</header>

			<div className="min-h-0 flex-1">
				{cv === undefined ? (
					<div className="flex h-full items-center justify-center">
						<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
					</div>
				) : cv === null ? (
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
