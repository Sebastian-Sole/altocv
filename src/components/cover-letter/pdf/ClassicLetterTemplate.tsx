import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { CoverLetterTemplateProps } from "./coverLetterTemplates";
import { renderHtmlToReactPdf } from "./renderHtmlToReactPdf";

const s = StyleSheet.create({
	page: {
		padding: 60,
		fontSize: 11,
		fontFamily: "Times-Roman",
		color: "#1a1a1a",
		lineHeight: 1.6,
	},
	senderBlock: {
		marginBottom: 24,
	},
	senderName: {
		fontSize: 14,
		fontFamily: "Times-Bold",
		marginBottom: 2,
	},
	senderDetail: {
		fontSize: 10,
		color: "#555",
	},
	recipientBlock: {
		marginBottom: 20,
	},
	recipientLine: {
		fontSize: 11,
	},
	dateLine: {
		marginBottom: 20,
		fontSize: 11,
	},
	subject: {
		fontSize: 12,
		fontFamily: "Times-Bold",
		marginBottom: 16,
	},
	body: {
		fontSize: 11,
		lineHeight: 1.6,
	},
	closing: {
		marginTop: 24,
	},
	signature: {
		fontSize: 11,
		fontFamily: "Times-Bold",
		marginTop: 30,
	},
});

export function ClassicLetterTemplate({
	contactInfo,
	recipientInfo,
	date,
	subject,
	body,
	signOff,
}: CoverLetterTemplateProps) {
	const contactLines = [
		contactInfo.email,
		contactInfo.phone,
		contactInfo.location,
	].filter(Boolean);

	return (
		<Document>
			<Page size="A4" style={s.page}>
				<View style={s.senderBlock}>
					<Text style={s.senderName}>
						{contactInfo.fullName || "Your Name"}
					</Text>
					{contactLines.map((line) => (
						<Text key={line} style={s.senderDetail}>
							{line}
						</Text>
					))}
				</View>

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

				{subject && <Text style={s.subject}>Re: {subject}</Text>}

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
