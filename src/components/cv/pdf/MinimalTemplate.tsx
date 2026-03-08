import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { TemplateProps } from "./templates";
import { hasContent, RichText } from "@/lib/rich-text-pdf";
import type { CVSections } from "@/types/cv";

const s = StyleSheet.create({
	page: {
		padding: 50,
		fontSize: 10,
		fontFamily: "Helvetica",
		color: "#2d2d2d",
	},
	header: {
		marginBottom: 24,
		alignItems: "center",
	},
	name: {
		fontSize: 22,
		fontFamily: "Helvetica-Bold",
		letterSpacing: 2,
		textTransform: "uppercase",
		marginBottom: 6,
	},
	contactRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		gap: 4,
		fontSize: 8.5,
		color: "#888",
	},
	contactSep: {
		color: "#ccc",
		marginHorizontal: 4,
	},
	summary: {
		fontSize: 9.5,
		marginTop: 12,
		lineHeight: 1.6,
		color: "#555",
		textAlign: "center",
		maxWidth: 420,
	},
	divider: {
		borderBottom: "0.5px solid #ddd",
		marginVertical: 12,
	},
	sectionTitle: {
		fontSize: 9,
		fontFamily: "Helvetica-Bold",
		letterSpacing: 2,
		textTransform: "uppercase",
		color: "#999",
		marginTop: 16,
		marginBottom: 8,
	},
	itemContainer: {
		marginBottom: 8,
	},
	itemHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 1,
	},
	itemTitle: {
		fontSize: 10.5,
		fontFamily: "Helvetica-Bold",
	},
	itemSubtitle: {
		fontSize: 9.5,
		color: "#666",
		marginBottom: 2,
	},
	itemDate: {
		fontSize: 8.5,
		color: "#999",
	},
	itemDescription: {
		fontSize: 9,
		lineHeight: 1.6,
		marginTop: 2,
		color: "#555",
	},
	tagRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 6,
	},
	tag: {
		fontSize: 8.5,
		color: "#666",
		padding: "2 0",
	},
	tagSep: {
		color: "#ccc",
	},
});

export function MinimalTemplate({
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
					<View style={s.divider} />
					<Text style={s.sectionTitle}>Experience</Text>
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
					<View style={s.divider} />
					<Text style={s.sectionTitle}>Education</Text>
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
					<View style={s.divider} />
					<Text style={s.sectionTitle}>Skills</Text>
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
					<View style={s.divider} />
					<Text style={s.sectionTitle}>Languages</Text>
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
					<View style={s.divider} />
					<Text style={s.sectionTitle}>Certificates</Text>
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
					<View style={s.divider} />
					<Text style={s.sectionTitle}>Awards</Text>
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
					<View style={s.divider} />
					<Text style={s.sectionTitle}>Volunteer Work</Text>
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
					<View style={s.divider} />
					<Text style={s.sectionTitle}>Presentations</Text>
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
					<View style={s.divider} />
					<Text style={s.sectionTitle}>Interests</Text>
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
					{contactItems.length > 0 && (
						<View style={s.contactRow}>
							{contactItems.map((item, i) => (
								<Text key={item}>
									{i > 0 && <Text style={s.contactSep}>·</Text>}
									{item}
								</Text>
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
