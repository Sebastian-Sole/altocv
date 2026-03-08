import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { CoverLetterTemplateProps } from "./coverLetterTemplates";
import { renderHtmlToReactPdf } from "./renderHtmlToReactPdf";

const s = StyleSheet.create({
	page: {
		padding: 50,
		fontSize: 10,
		fontFamily: "Times-Roman",
		color: "#1a1a1a",
		border: "1px solid #d4d4d4",
		margin: 20,
	},
	letterhead: {
		alignItems: "center",
		marginBottom: 24,
		paddingBottom: 16,
		borderBottom: "1px solid #d4d4d4",
	},
	name: {
		fontSize: 18,
		fontFamily: "Times-Bold",
		letterSpacing: 2,
		textTransform: "uppercase",
		marginBottom: 4,
	},
	contactRow: {
		flexDirection: "row",
		gap: 10,
		fontSize: 9,
		color: "#666",
	},
	dateLine: {
		fontSize: 10,
		textAlign: "right",
		marginBottom: 20,
		color: "#555",
	},
	recipientBlock: {
		marginBottom: 20,
	},
	recipientLine: {
		fontSize: 10,
	},
	subject: {
		fontSize: 11,
		fontFamily: "Times-Bold",
		textAlign: "center",
		textTransform: "uppercase",
		letterSpacing: 1,
		marginBottom: 18,
		paddingVertical: 6,
		borderTop: "1px solid #d4d4d4",
		borderBottom: "1px solid #d4d4d4",
	},
	body: {
		fontSize: 10.5,
		lineHeight: 1.7,
		color: "#222",
	},
	closing: {
		marginTop: 28,
		fontSize: 10.5,
	},
	signature: {
		fontSize: 11,
		fontFamily: "Times-Bold",
		marginTop: 32,
	},
});

export function FormalLetterTemplate({
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
				<View style={s.letterhead}>
					<Text style={s.name}>
						{contactInfo.fullName || "Your Name"}
					</Text>
					{contactItems.length > 0 && (
						<View style={s.contactRow}>
							{contactItems.map((item, i) => (
								<Text key={item}>
									{i > 0 ? " · " : ""}
									{item}
								</Text>
							))}
						</View>
					)}
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
