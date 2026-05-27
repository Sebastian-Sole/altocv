import { pdf } from "@react-pdf/renderer";
import { AlertTriangle, Loader2, RefreshCw } from "lucide-react";
import * as pdfjs from "pdfjs-dist";
import pdfjsWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorkerUrl;

const DEBOUNCE_MS = 800;

interface PDFPreviewProps {
	document: React.ReactElement;
}

export function PDFPreview({ document: pdfDocument }: PDFPreviewProps) {
	const [pageDataUrls, setPageDataUrls] = useState<string[]>([]);
	const [rendering, setRendering] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const lastSnapshotRef = useRef<string | null>(null);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const generatePdf = useCallback(
		async (doc: React.ReactElement) => {
			setRendering(true);
			setError(null);
			try {
				const blob = await pdf(doc as any).toBlob();

				const arrayBuffer = await blob.arrayBuffer();
				const pdfDoc = await pdfjs.getDocument({ data: arrayBuffer }).promise;
				const urls: string[] = [];

				for (let i = 1; i <= pdfDoc.numPages; i++) {
					const page = await pdfDoc.getPage(i);
					const scale = 6;
					const viewport = page.getViewport({ scale });

					const canvas = document.createElement("canvas");
					canvas.width = viewport.width;
					canvas.height = viewport.height;
					const ctx = canvas.getContext("2d")!;

					await page.render({ canvasContext: ctx, viewport }).promise;
					urls.push(canvas.toDataURL("image/png"));
				}

				setPageDataUrls(urls);
			} catch (err) {
				console.error("PDF generation failed:", err);
				setError(err instanceof Error ? err : new Error(String(err)));
			} finally {
				setRendering(false);
			}
		},
		[],
	);

	const retry = useCallback(() => {
		generatePdf(pdfDocument);
	}, [generatePdf, pdfDocument]);

	// Debounced auto-update when props change
	useEffect(() => {
		const snapshot = JSON.stringify(pdfDocument.props);
		if (snapshot === lastSnapshotRef.current) {
			return;
		}

		const isFirstRender = lastSnapshotRef.current === null;
		lastSnapshotRef.current = snapshot;

		if (isFirstRender) {
			generatePdf(pdfDocument);
			return;
		}

		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
		}

		debounceRef.current = setTimeout(() => {
			generatePdf(pdfDocument);
		}, DEBOUNCE_MS);
	}, [pdfDocument, generatePdf]);

	return (
		<div className="flex h-full w-full flex-col">
			<div className="min-h-0 flex-1 overflow-y-auto bg-muted/30 p-6">
				{pageDataUrls.length > 0 ? (
					<div className="relative mx-auto flex flex-col items-center gap-4">
						{rendering && (
							<div className="absolute inset-x-0 top-2 flex justify-center">
								<div className="flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-xs text-muted-foreground shadow-sm backdrop-blur">
									<Loader2 className="size-3 animate-spin" />
									Updating…
								</div>
							</div>
						)}
						{pageDataUrls.map((url, i) => (
							<img
								key={i}
								src={url}
								alt={`Page ${i + 1}`}
								className="w-full rounded-sm shadow-md"
							/>
						))}
					</div>
				) : error ? (
					<div className="flex h-full flex-col items-center justify-center gap-4 text-center">
						<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10">
							<AlertTriangle className="h-6 w-6 text-destructive" />
						</div>
						<div className="space-y-1">
							<p className="text-sm font-medium">Couldn't render preview</p>
							<p className="mx-auto max-w-sm text-xs text-muted-foreground">
								Something went wrong generating the PDF. You can try again.
							</p>
							{import.meta.env.DEV && error.message ? (
								<pre className="mx-auto mt-2 max-w-md overflow-x-auto rounded-md bg-muted px-3 py-2 text-left text-[11px] text-muted-foreground">
									{error.message}
								</pre>
							) : null}
						</div>
						<Button
							variant="outline"
							size="sm"
							onClick={retry}
							disabled={rendering}
						>
							<RefreshCw className="mr-2 h-3.5 w-3.5" />
							Try again
						</Button>
					</div>
				) : (
					<div className="flex h-full items-center justify-center">
						<Loader2 className="size-6 animate-spin text-muted-foreground" />
					</div>
				)}
			</div>
		</div>
	);
}
