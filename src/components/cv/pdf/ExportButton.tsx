import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExportButtonProps {
	document: React.ReactElement;
	fileName: string;
}

export function ExportButton({ document: pdfDocument, fileName }: ExportButtonProps) {
	return (
		<PDFDownloadLink document={pdfDocument as any} fileName={fileName}>
			{({ loading }) => (
				<Button variant="outline" size="sm" disabled={loading}>
					<Download className="h-4 w-4 sm:mr-2" />
					<span className="hidden sm:inline">
						{loading ? "Generating..." : "Export PDF"}
					</span>
				</Button>
			)}
		</PDFDownloadLink>
	);
}
