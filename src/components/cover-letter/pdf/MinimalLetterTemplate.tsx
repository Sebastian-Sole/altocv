import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { CoverLetterTemplateProps } from "./coverLetterTemplates";
import { renderHtmlToReactPdf } from "./renderHtmlToReactPdf";

const s = StyleSheet.create({
	page: {
		padding: 70,
		fontSize: 10,
		fontFamily: "Helvetica",
		color: "#333",
		lineHeight: 1.7,
	},
	name: {
		fontSize: 16,
		fontFamily: "Helvetica-Bold",
		color: "#111",
		marginBottom: 4,
	},
	contactLine: {
		fontSize: 9,
		color: "#888",
		marginBottom: 30,
	},
	dateLine: {
		fontSize: 10,
		color: "#888",
		marginBottom: 24,
	},
	recipientBlock: {
		marginBottom: 24,
	},
	recipientLine: {
		fontSize: 10,
		color: "#555",
	},
	subject: {
		fontSize: 11,
		fontFamily: "Helvetica-Bold",
		color: "#111",
		marginBottom: 20,
	},
	body: {
		fontSize: 10,
		lineHeight: 1.7,
		color: "#333",
	},
	closing: {
		marginTop: 30,
		fontSize: 10,
		color: "#333",
	},
	signature: {
		fontSize: 10,
		fontFamily: "Helvetica-Bold",
		color: "#111",
		marginTop: 24,
	},
});

export function MinimalLetterTemplate({
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
				<Text style={s.name}>
					{contactInfo.fullName || "Your Name"}
				</Text>
				{contactItems.length > 0 && (
					<Text style={s.contactLine}>
						{contactItems.join(" · ")}
					</Text>
				)}

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
					{renderHtmlToReactPdf(body, { baseStyle: s.body })}
				</View>

				<View style={s.closing}>
					<Text>{signOff || "Sincerely,"}</Text>
					<Text style={s.signature}>
						{contactInfo.fullName || "Your Name"}
					</Text>
				</View>
			</Page>
		</Document>
	);
}
