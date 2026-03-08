import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { TemplateProps } from "./templates";
import { hasContent, RichText } from "@/lib/rich-text-pdf";
import type { CVSections } from "@/types/cv";

const ACCENT = "#475569";

const s = StyleSheet.create({
	page: {
		padding: "28 32",
		fontSize: 8.5,
		fontFamily: "Helvetica",
		color: "#222",
	},
	header: {
		marginBottom: 10,
		borderBottom: "1.5px solid #222",
		paddingBottom: 8,
	},
	name: {
		fontSize: 18,
		fontFamily: "Helvetica-Bold",
		marginBottom: 2,
	},
	contactRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 4,
		fontSize: 7.5,
		color: "#666",
	},
	contactSep: {
		color: "#bbb",
	},
	summary: {
		fontSize: 8,
		lineHeight: 1.4,
		color: "#555",
		marginTop: 4,
	},
	twoCol: {
		flexDirection: "row",
		gap: 16,
	},
	colNarrow: {
		width: 150,
	},
	colWide: {
		flex: 1,
	},
	sectionTitle: {
		fontSize: 8,
		fontFamily: "Helvetica-Bold",
		textTransform: "uppercase",
		letterSpacing: 1.2,
		color: ACCENT,
		marginTop: 10,
		marginBottom: 4,
		borderBottom: `0.5px solid ${ACCENT}`,
		paddingBottom: 2,
	},
	itemContainer: {
		marginBottom: 6,
	},
	itemRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 0.5,
	},
	itemTitle: {
		fontSize: 9,
		fontFamily: "Helvetica-Bold",
	},
	itemSubtitle: {
		fontSize: 8,
		color: "#666",
		marginBottom: 1,
	},
	itemDate: {
		fontSize: 7.5,
		color: "#888",
	},
	itemDescription: {
		fontSize: 8,
		lineHeight: 1.4,
		marginTop: 1,
		color: "#444",
	},
	compactItem: {
		marginBottom: 3,
	},
	compactTitle: {
		fontSize: 8.5,
		fontFamily: "Helvetica-Bold",
	},
	compactSub: {
		fontSize: 7.5,
		color: "#666",
	},
	tagWrap: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 3,
	},
	tag: {
		fontSize: 7.5,
		backgroundColor: "#f1f5f9",
		padding: "2 5",
		borderRadius: 2,
		color: ACCENT,
	},
});

export function CompactTemplate({
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

	// Narrow-column sections
	const NARROW_KEYS = new Set([
		"skills",
		"languages",
		"certificates",
		"interests",
	]);
	const narrowOrder = sectionOrder.filter((id) => NARROW_KEYS.has(id));
	const wideOrder = sectionOrder.filter((id) => !NARROW_KEYS.has(id));

	function renderNarrow(sectionId: string): React.ReactNode | null {
		switch (sectionId) {
			case "skills": {
				if (sections.skills.length === 0) return null;
				return (
					<View key="skills">
						<Text style={s.sectionTitle}>Skills</Text>
						<View style={s.tagWrap}>
							{sections.skills.map((item) => (
								<Text key={item.id} style={s.tag}>
									{item.name}
								</Text>
							))}
						</View>
					</View>
				);
			}
			case "languages": {
				if (sections.languages.length === 0) return null;
				return (
					<View key="languages">
						<Text style={s.sectionTitle}>Languages</Text>
						{sections.languages.map((item) => (
							<View key={item.id} style={s.compactItem}>
								<Text style={s.compactTitle}>{item.name}</Text>
								<Text style={s.compactSub}>{item.proficiency}</Text>
							</View>
						))}
					</View>
				);
			}
			case "certificates": {
				if (sections.certificates.length === 0) return null;
				return (
					<View key="certificates">
						<Text style={s.sectionTitle}>Certificates</Text>
						{sections.certificates.map((item) => (
							<View key={item.id} style={s.compactItem}>
								<Text style={s.compactTitle}>{item.name}</Text>
								<Text style={s.compactSub}>
									{item.issuer}
									{item.date ? ` · ${item.date}` : ""}
								</Text>
							</View>
						))}
					</View>
				);
			}
			case "interests": {
				if (sections.interests.length === 0) return null;
				return (
					<View key="interests">
						<Text style={s.sectionTitle}>Interests</Text>
						<View style={s.tagWrap}>
							{sections.interests.map((interest) => (
								<Text key={interest} style={s.tag}>
									{interest}
								</Text>
							))}
						</View>
					</View>
				);
			}
			default:
				return null;
		}
	}

	const mainRenderers: Record<
		string,
		(data: any) => React.ReactNode | null
	> = {
		workExperience: (data: CVSections["workExperience"]) => {
			if (data.length === 0) return null;
			return (
				<View key="workExperience">
					<Text style={s.sectionTitle}>Experience</Text>
					{data.map((item) => (
						<View key={item.id} style={s.itemContainer}>
							<View style={s.itemRow}>
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
					{data.map((item) => (
						<View key={item.id} style={s.itemContainer}>
							<View style={s.itemRow}>
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
		awards: (data: CVSections["awards"]) => {
			if (data.length === 0) return null;
			return (
				<View key="awards">
					<Text style={s.sectionTitle}>Awards</Text>
					{data.map((item) => (
						<View key={item.id} style={s.itemContainer}>
							<View style={s.itemRow}>
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
							<View style={s.itemRow}>
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
							<View style={s.itemRow}>
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
	};

	const hasNarrow = narrowOrder.some((id) => {
		switch (id) {
			case "skills":
				return sections.skills.length > 0;
			case "languages":
				return sections.languages.length > 0;
			case "certificates":
				return sections.certificates.length > 0;
			case "interests":
				return sections.interests.length > 0;
			default:
				return false;
		}
	});

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
				<View style={s.twoCol}>
					<View style={s.colWide}>
						{wideOrder.map((sectionId) => {
							const render = mainRenderers[sectionId];
							if (!render) return null;
							const key = sectionId as keyof CVSections;
							return render(sections[key]);
						})}
					</View>
					{hasNarrow && (
						<View style={s.colNarrow}>
							{narrowOrder.map((id) => renderNarrow(id))}
						</View>
					)}
				</View>
			</Page>
		</Document>
	);
}
