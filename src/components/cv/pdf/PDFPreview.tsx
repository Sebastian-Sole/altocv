import { pdf } from "@react-pdf/renderer";
import { Loader2 } from "lucide-react";
import * as pdfjs from "pdfjs-dist";
import pdfjsWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { useCallback, useEffect, useRef, useState } from "react";
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorkerUrl;

const DEBOUNCE_MS = 800;

interface PDFPreviewProps {
	document: React.ReactElement;
}

export function PDFPreview({ document: pdfDocument }: PDFPreviewProps) {
	const [pageDataUrls, setPageDataUrls] = useState<string[]>([]);
	const [rendering, setRendering] = useState(false);
	const lastSnapshotRef = useRef<string | null>(null);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const generatePdf = useCallback(
		async (doc: React.ReactElement) => {
			setRendering(true);
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
			} finally {
				setRendering(false);
			}
		},
		[],
	);

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
				) : (
					<div className="flex h-full items-center justify-center">
						<Loader2 className="size-6 animate-spin text-muted-foreground" />
					</div>
				)}
			</div>
		</div>
	);
}
