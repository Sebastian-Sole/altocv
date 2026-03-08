import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ContactInfo, CVSections } from "@/types/cv";
import { ClassicTemplate } from "./ClassicTemplate";

interface ExportButtonProps {
	title: string;
	contactInfo: ContactInfo;
	sections: CVSections;
	sectionOrder: string[];
}

export function ExportButton({
	title,
	contactInfo,
	sections,
	sectionOrder,
}: ExportButtonProps) {
	const fileName = `${title.replace(/\s+/g, "_")}.pdf`;

	return (
		<PDFDownloadLink
			document={
				<ClassicTemplate
					contactInfo={contactInfo}
					sections={sections}
					sectionOrder={sectionOrder}
				/>
			}
			fileName={fileName}
		>
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
