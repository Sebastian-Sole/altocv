import { pdf } from "@react-pdf/renderer";
import { Loader2, RefreshCw } from "lucide-react";
import * as pdfjs from "pdfjs-dist";
import pdfjsWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ContactInfo, CVSections } from "@/types/cv";
import { Button } from "@/components/ui/button";
import { ClassicTemplate } from "./ClassicTemplate";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorkerUrl;

interface PDFPreviewProps {
	contactInfo: ContactInfo;
	sections: CVSections;
	sectionOrder: string[];
}

export function PDFPreview({
	contactInfo,
	sections,
	sectionOrder,
}: PDFPreviewProps) {
	const [pageDataUrls, setPageDataUrls] = useState<string[]>([]);
	const [rendering, setRendering] = useState(false);
	const dataRef = useRef({ contactInfo, sections, sectionOrder });
	dataRef.current = { contactInfo, sections, sectionOrder };

	const generatePdf = useCallback(
		async (data: {
			contactInfo: ContactInfo;
			sections: CVSections;
			sectionOrder: string[];
		}) => {
			setRendering(true);
			try {
				const blob = await pdf(
					<ClassicTemplate
						contactInfo={data.contactInfo}
						sections={data.sections}
						sectionOrder={data.sectionOrder}
					/>,
				).toBlob();

				const arrayBuffer = await blob.arrayBuffer();
				const pdfDoc = await pdfjs.getDocument({ data: arrayBuffer }).promise;
				const urls: string[] = [];

				for (let i = 1; i <= pdfDoc.numPages; i++) {
					const page = await pdfDoc.getPage(i);
					const scale = 2;
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

	// Generate PDF on initial mount
	useEffect(() => {
		generatePdf(dataRef.current);
	}, [generatePdf]);

	const handleRecompile = useCallback(() => {
		generatePdf(dataRef.current);
	}, [generatePdf]);

	return (
		<div className="flex h-full w-full flex-col">
			<div className="flex items-center justify-center border-b bg-muted/50 py-2">
				<Button
					variant="outline"
					size="sm"
					onClick={handleRecompile}
					disabled={rendering}
				>
					{rendering ? (
						<Loader2 className="size-3.5 animate-spin" />
					) : (
						<RefreshCw className="size-3.5" />
					)}
					{rendering ? "Compiling…" : "Recompile"}
				</Button>
			</div>
			<div className="min-h-0 flex-1 overflow-y-auto bg-muted/30 p-6">
				{pageDataUrls.length > 0 ? (
					<div className="mx-auto flex flex-col items-center gap-4">
						{pageDataUrls.map((url, i) => (
							<img
								key={i}
								src={url}
								alt={`Page ${i + 1}`}
								className="w-full max-w-[595px] rounded-sm shadow-md"
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
