import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { TemplateProps } from "./templates";
import { hasContent, RichText } from "@/lib/rich-text-pdf";
import type { CVSections } from "@/types/cv";

const s = StyleSheet.create({
	page: {
		padding: 50,
		fontSize: 10,
		fontFamily: "Times-Roman",
		color: "#222",
	},
	header: {
		marginBottom: 20,
		alignItems: "center",
	},
	name: {
		fontSize: 28,
		fontFamily: "Times-Bold",
		letterSpacing: 3,
		textTransform: "uppercase",
		marginBottom: 6,
	},
	dividerThick: {
		borderBottom: "1.5px solid #222",
		width: "100%",
		marginBottom: 4,
	},
	dividerThin: {
		borderBottom: "0.5px solid #222",
		width: "100%",
	},
	contactRow: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 16,
		fontSize: 9,
		color: "#555",
		marginTop: 6,
		fontFamily: "Times-Roman",
	},
	summary: {
		fontSize: 10,
		marginTop: 12,
		lineHeight: 1.6,
		color: "#333",
		textAlign: "center",
		fontFamily: "Times-Italic",
	},
	sectionTitle: {
		fontSize: 10,
		fontFamily: "Times-Bold",
		letterSpacing: 2.5,
		textTransform: "uppercase",
		color: "#333",
		marginTop: 20,
		marginBottom: 4,
		textAlign: "center",
	},
	sectionDivider: {
		borderBottom: "0.5px solid #999",
		marginBottom: 8,
	},
	itemContainer: {
		marginBottom: 10,
	},
	itemHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 1,
	},
	itemTitle: {
		fontSize: 11,
		fontFamily: "Times-Bold",
	},
	itemSubtitle: {
		fontSize: 10,
		color: "#555",
		fontFamily: "Times-Italic",
		marginBottom: 2,
	},
	itemDate: {
		fontSize: 9,
		color: "#777",
		fontFamily: "Times-Roman",
	},
	itemDescription: {
		fontSize: 9.5,
		lineHeight: 1.6,
		marginTop: 2,
		color: "#444",
	},
	tagRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
		justifyContent: "center",
	},
	tag: {
		fontSize: 9,
		color: "#444",
	},
	tagSep: {
		color: "#bbb",
	},
});

export function ExecutiveTemplate({
	contactInfo,
	sections,
	sectionOrder,
}: TemplateProps) {
	const contactItems = [
		contactInfo.email,
		contactInfo.phone,
		contactInfo.location,
		contactInfo.linkedin,
		contactInfo.website,
	].filter(Boolean);

	const sectionRenderers: Record<
		string,
		(data: any) => React.ReactNode | null
	> = {
		workExperience: (data: CVSections["workExperience"]) => {
			if (data.length === 0) return null;
			return (
				<View key="workExperience">
					<Text style={s.sectionTitle}>Professional Experience</Text>
					<View style={s.sectionDivider} />
					{data.map((item) => (
						<View key={item.id} style={s.itemContainer}>
							<View style={s.itemHeader}>
								<Text style={s.itemTitle}>{item.position}</Text>
								<Text style={s.itemDate}>
									{item.startDate} — {item.current ? "Present" : item.endDate}
								</Text>
							</View>
							<Text style={s.itemSubtitle}>
								{item.company}
								{item.location ? `, ${item.location}` : ""}
							</Text>
							{hasContent(item.description) && (
								<RichText
									content={item.description}
									style={s.itemDescription}
								/>
							)}
						</View>
					))}
				</View>
			);
		},
		education: (data: CVSections["education"]) => {
			if (data.length === 0) return null;
			return (
				<View key="education">
					<Text style={s.sectionTitle}>Education</Text>
					<View style={s.sectionDivider} />
					{data.map((item) => (
						<View key={item.id} style={s.itemContainer}>
							<View style={s.itemHeader}>
								<Text style={s.itemTitle}>
									{item.degree} in {item.field}
								</Text>
								<Text style={s.itemDate}>
									{item.startDate} — {item.current ? "Present" : item.endDate}
								</Text>
							</View>
							<Text style={s.itemSubtitle}>
								{item.institution}
								{item.location ? `, ${item.location}` : ""}
							</Text>
							{hasContent(item.description) && (
								<RichText
									content={item.description!}
									style={s.itemDescription}
								/>
							)}
						</View>
					))}
				</View>
			);
		},
		skills: (data: CVSections["skills"]) => {
			if (data.length === 0) return null;
			return (
				<View key="skills">
					<Text style={s.sectionTitle}>Skills</Text>
					<View style={s.sectionDivider} />
					<View style={s.tagRow}>
						{data.map((item, i) => (
							<Text key={item.id} style={s.tag}>
								{i > 0 && <Text style={s.tagSep}> · </Text>}
								{item.name}
							</Text>
						))}
					</View>
				</View>
			);
		},
		languages: (data: CVSections["languages"]) => {
			if (data.length === 0) return null;
			return (
				<View key="languages">
					<Text style={s.sectionTitle}>Languages</Text>
					<View style={s.sectionDivider} />
					<View style={s.tagRow}>
						{data.map((item, i) => (
							<Text key={item.id} style={s.tag}>
								{i > 0 && <Text style={s.tagSep}> · </Text>}
								{item.name} ({item.proficiency})
							</Text>
						))}
					</View>
				</View>
			);
		},
		certificates: (data: CVSections["certificates"]) => {
			if (data.length === 0) return null;
			return (
				<View key="certificates">
					<Text style={s.sectionTitle}>Certificates</Text>
					<View style={s.sectionDivider} />
					{data.map((item) => (
						<View key={item.id} style={s.itemContainer}>
							<View style={s.itemHeader}>
								<Text style={s.itemTitle}>{item.name}</Text>
								{item.date && <Text style={s.itemDate}>{item.date}</Text>}
							</View>
							<Text style={s.itemSubtitle}>{item.issuer}</Text>
						</View>
					))}
				</View>
			);
		},
		awards: (data: CVSections["awards"]) => {
			if (data.length === 0) return null;
			return (
				<View key="awards">
					<Text style={s.sectionTitle}>Awards</Text>
					<View style={s.sectionDivider} />
					{data.map((item) => (
						<View key={item.id} style={s.itemContainer}>
							<View style={s.itemHeader}>
								<Text style={s.itemTitle}>{item.title}</Text>
								{item.date && <Text style={s.itemDate}>{item.date}</Text>}
							</View>
							<Text style={s.itemSubtitle}>{item.issuer}</Text>
							{hasContent(item.description) && (
								<RichText
									content={item.description!}
									style={s.itemDescription}
								/>
							)}
						</View>
					))}
				</View>
			);
		},
		volunteerWork: (data: CVSections["volunteerWork"]) => {
			if (data.length === 0) return null;
			return (
				<View key="volunteerWork">
					<Text style={s.sectionTitle}>Volunteer Work</Text>
					<View style={s.sectionDivider} />
					{data.map((item) => (
						<View key={item.id} style={s.itemContainer}>
							<View style={s.itemHeader}>
								<Text style={s.itemTitle}>{item.role}</Text>
								<Text style={s.itemDate}>
									{item.startDate} — {item.current ? "Present" : item.endDate}
								</Text>
							</View>
							<Text style={s.itemSubtitle}>{item.organization}</Text>
							{hasContent(item.description) && (
								<RichText
									content={item.description!}
									style={s.itemDescription}
								/>
							)}
						</View>
					))}
				</View>
			);
		},
		presentations: (data: CVSections["presentations"]) => {
			if (data.length === 0) return null;
			return (
				<View key="presentations">
					<Text style={s.sectionTitle}>Presentations</Text>
					<View style={s.sectionDivider} />
					{data.map((item) => (
						<View key={item.id} style={s.itemContainer}>
							<View style={s.itemHeader}>
								<Text style={s.itemTitle}>{item.title}</Text>
								{item.date && <Text style={s.itemDate}>{item.date}</Text>}
							</View>
							<Text style={s.itemSubtitle}>{item.event}</Text>
							{hasContent(item.description) && (
								<RichText
									content={item.description!}
									style={s.itemDescription}
								/>
							)}
						</View>
					))}
				</View>
			);
		},
		interests: (data: CVSections["interests"]) => {
			if (data.length === 0) return null;
			return (
				<View key="interests">
					<Text style={s.sectionTitle}>Interests</Text>
					<View style={s.sectionDivider} />
					<View style={s.tagRow}>
						{data.map((interest, i) => (
							<Text key={interest} style={s.tag}>
								{i > 0 && <Text style={s.tagSep}> · </Text>}
								{interest}
							</Text>
						))}
					</View>
				</View>
			);
		},
	};

	return (
		<Document>
			<Page size="A4" style={s.page}>
				<View style={s.header}>
					<Text style={s.name}>
						{contactInfo.fullName || "Your Name"}
					</Text>
					<View style={s.dividerThick} />
					<View style={s.dividerThin} />
					{contactItems.length > 0 && (
						<View style={s.contactRow}>
							{contactItems.map((item) => (
								<Text key={item}>{item}</Text>
							))}
						</View>
					)}
					{hasContent(contactInfo.summary) && (
						<RichText content={contactInfo.summary!} style={s.summary} />
					)}
				</View>
				{sectionOrder.map((sectionId) => {
					const render = sectionRenderers[sectionId];
					if (!render) return null;
					const key = sectionId as keyof CVSections;
					return render(sections[key]);
				})}
			</Page>
		</Document>
	);
}
