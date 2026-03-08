import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { CoverLetterTemplateProps } from "./coverLetterTemplates";
import { renderHtmlToReactPdf } from "./renderHtmlToReactPdf";

const ACCENT = "#2563eb";

const s = StyleSheet.create({
	page: {
		fontSize: 10,
		fontFamily: "Helvetica",
		color: "#1a1a1a",
	},
	headerBar: {
		backgroundColor: ACCENT,
		padding: "24 40",
		marginBottom: 30,
	},
	name: {
		fontSize: 22,
		fontFamily: "Helvetica-Bold",
		color: "#ffffff",
		marginBottom: 4,
	},
	contactRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
		fontSize: 9,
		color: "#dbeafe",
	},
	content: {
		paddingHorizontal: 40,
	},
	dateLine: {
		fontSize: 10,
		color: "#666",
		marginBottom: 16,
	},
	recipientBlock: {
		marginBottom: 16,
	},
	recipientLine: {
		fontSize: 10,
		color: "#444",
	},
	subject: {
		fontSize: 13,
		fontFamily: "Helvetica-Bold",
		color: ACCENT,
		marginBottom: 16,
		paddingBottom: 8,
		borderBottom: `2px solid ${ACCENT}`,
	},
	body: {
		fontSize: 10,
		lineHeight: 1.65,
		color: "#333",
	},
	closing: {
		marginTop: 24,
		fontSize: 10,
		color: "#333",
	},
	signature: {
		fontSize: 11,
		fontFamily: "Helvetica-Bold",
		color: ACCENT,
		marginTop: 28,
	},
});

export function ModernLetterTemplate({
	contactInfo,
	recipientInfo,
	date,
	subject,
	body,
	signOff,
}: CoverLetterTemplateProps) {
	const contactItems = [
		contactInfo.email,
		contactInfo.phone,
		contactInfo.location,
	].filter(Boolean);

	return (
		<Document>
			<Page size="A4" style={s.page}>
				<View style={s.headerBar}>
					<Text style={s.name}>
						{contactInfo.fullName || "Your Name"}
					</Text>
					{contactItems.length > 0 && (
						<View style={s.contactRow}>
							{contactItems.map((item, i) => (
								<Text key={item}>
									{i > 0 ? " | " : ""}
									{item}
								</Text>
							))}
						</View>
					)}
				</View>

				<View style={s.content}>
					{date && <Text style={s.dateLine}>{date}</Text>}

					{(recipientInfo.hiringManagerName ||
						recipientInfo.companyName ||
						recipientInfo.companyAddress) && (
						<View style={s.recipientBlock}>
							{recipientInfo.hiringManagerName && (
								<Text style={s.recipientLine}>
									{recipientInfo.hiringManagerName}
								</Text>
							)}
							{recipientInfo.companyName && (
								<Text style={s.recipientLine}>
									{recipientInfo.companyName}
								</Text>
							)}
							{recipientInfo.companyAddress && (
								<Text style={s.recipientLine}>
									{recipientInfo.companyAddress}
								</Text>
							)}
						</View>
					)}

					{subject && <Text style={s.subject}>{subject}</Text>}

					<View style={s.body}>
						{renderHtmlToReactPdf(body, {
							baseStyle: s.body,
							linkColor: ACCENT,
						})}
					</View>

					<View style={s.closing}>
						<Text>{signOff || "Sincerely,"}</Text>
						<Text style={s.signature}>
							{contactInfo.fullName || "Your Name"}
						</Text>
					</View>
				</View>
			</Page>
		</Document>
	);
}
