import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { TemplateProps } from "./templates";
import { hasContent, RichText } from "@/lib/rich-text-pdf";
import type { CVSections } from "@/types/cv";

const ACCENT = "#2563eb";

const s = StyleSheet.create({
	page: {
		padding: 40,
		fontSize: 10,
		fontFamily: "Helvetica",
		color: "#1a1a1a",
	},
	header: {
		marginBottom: 16,
	},
	name: {
		fontSize: 28,
		fontFamily: "Helvetica-Bold",
		color: ACCENT,
		marginBottom: 2,
	},
	contactRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 6,
		fontSize: 9,
		color: "#555",
		marginTop: 4,
	},
	contactSep: {
		color: "#ccc",
	},
	summary: {
		fontSize: 10,
		marginTop: 10,
		lineHeight: 1.5,
		color: "#444",
	},
	sectionTitle: {
		fontSize: 12,
		fontFamily: "Helvetica-Bold",
		color: ACCENT,
		marginTop: 18,
		marginBottom: 8,
		paddingLeft: 8,
		borderLeft: `3px solid ${ACCENT}`,
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
		fontFamily: "Helvetica-Bold",
	},
	itemSubtitle: {
		fontSize: 10,
		color: "#555",
		marginBottom: 2,
	},
	itemDate: {
		fontSize: 9,
		color: ACCENT,
		fontFamily: "Helvetica-Bold",
	},
	itemDescription: {
		fontSize: 9.5,
		lineHeight: 1.5,
		marginTop: 2,
		color: "#444",
	},
	badgeRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 5,
	},
	badge: {
		fontSize: 9,
		backgroundColor: "#eff6ff",
		color: ACCENT,
		padding: "3 10",
		borderRadius: 10,
	},
	interestBadge: {
		fontSize: 9,
		backgroundColor: "#f8fafc",
		color: "#555",
		padding: "3 10",
		borderRadius: 10,
		border: "1px solid #e2e8f0",
	},
});

export function ModernTemplate({
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
					<Text style={s.sectionTitle}>Work Experience</Text>
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
								{item.location ? ` · ${item.location}` : ""}
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
								{item.location ? ` · ${item.location}` : ""}
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
					<View style={s.badgeRow}>
						{data.map((item) => (
							<Text key={item.id} style={s.badge}>
								{item.name}
								{item.level ? ` · ${item.level}` : ""}
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
					<View style={s.badgeRow}>
						{data.map((item) => (
							<Text key={item.id} style={s.badge}>
								{item.name} — {item.proficiency}
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
					<View style={s.badgeRow}>
						{data.map((interest) => (
							<Text key={interest} style={s.interestBadge}>
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
									{i > 0 && <Text style={s.contactSep}> | </Text>}
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
