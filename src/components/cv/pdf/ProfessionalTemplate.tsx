import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { TemplateProps } from "./templates";
import { hasContent, RichText } from "@/lib/rich-text-pdf";

const DARK = "#1e293b";
const ACCENT = "#334155";
const LIGHT_BG = "#f1f5f9";

const s = StyleSheet.create({
	page: {
		fontSize: 10,
		fontFamily: "Helvetica",
		color: "#1a1a1a",
	},
	headerBg: {
		backgroundColor: DARK,
		padding: "30 40 24 40",
		color: "#fff",
	},
	name: {
		fontSize: 26,
		fontFamily: "Helvetica-Bold",
		color: "#fff",
		marginBottom: 4,
	},
	headerContact: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 6,
		fontSize: 9,
		color: "#cbd5e1",
	},
	headerSep: {
		color: "#64748b",
	},
	summaryWrap: {
		backgroundColor: ACCENT,
		padding: "10 40",
	},
	summary: {
		fontSize: 9.5,
		lineHeight: 1.5,
		color: "#e2e8f0",
	},
	body: {
		flexDirection: "row",
		flex: 1,
	},
	sidebar: {
		width: 180,
		backgroundColor: LIGHT_BG,
		padding: "20 20 40 20",
	},
	main: {
		flex: 1,
		padding: "20 40 40 24",
	},
	sidebarSectionTitle: {
		fontSize: 9,
		fontFamily: "Helvetica-Bold",
		textTransform: "uppercase",
		letterSpacing: 1.5,
		color: DARK,
		marginTop: 14,
		marginBottom: 6,
		borderBottom: `1px solid #cbd5e1`,
		paddingBottom: 3,
	},
	sidebarItem: {
		fontSize: 9,
		marginBottom: 3,
		color: "#475569",
	},
	sidebarItemBold: {
		fontSize: 9,
		fontFamily: "Helvetica-Bold",
		marginBottom: 1,
		color: "#334155",
	},
	sidebarItemSub: {
		fontSize: 8,
		color: "#64748b",
		marginBottom: 4,
	},
	mainSectionTitle: {
		fontSize: 12,
		fontFamily: "Helvetica-Bold",
		color: DARK,
		marginTop: 14,
		marginBottom: 8,
		paddingBottom: 3,
		borderBottom: `1.5px solid ${DARK}`,
		textTransform: "uppercase",
		letterSpacing: 1,
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
		color: "#64748b",
	},
	itemDescription: {
		fontSize: 9.5,
		lineHeight: 1.5,
		marginTop: 2,
		color: "#444",
	},
});

// Sections that go in the sidebar
const SIDEBAR_SECTIONS = new Set([
	"skills",
	"languages",
	"certificates",
	"interests",
]);

export function ProfessionalTemplate({
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

	const sidebarOrder = sectionOrder.filter((id) => SIDEBAR_SECTIONS.has(id));
	const mainOrder = sectionOrder.filter((id) => !SIDEBAR_SECTIONS.has(id));

	function renderSidebar(sectionId: string): React.ReactNode | null {
		switch (sectionId) {
			case "skills": {
				if (sections.skills.length === 0) return null;
				return (
					<View key="skills">
						<Text style={s.sidebarSectionTitle}>Skills</Text>
						{sections.skills.map((item) => (
							<Text key={item.id} style={s.sidebarItem}>
								{item.name}
								{item.level ? ` — ${item.level}` : ""}
							</Text>
						))}
					</View>
				);
			}
			case "languages": {
				if (sections.languages.length === 0) return null;
				return (
					<View key="languages">
						<Text style={s.sidebarSectionTitle}>Languages</Text>
						{sections.languages.map((item) => (
							<View key={item.id}>
								<Text style={s.sidebarItemBold}>{item.name}</Text>
								<Text style={s.sidebarItemSub}>{item.proficiency}</Text>
							</View>
						))}
					</View>
				);
			}
			case "certificates": {
				if (sections.certificates.length === 0) return null;
				return (
					<View key="certificates">
						<Text style={s.sidebarSectionTitle}>Certificates</Text>
						{sections.certificates.map((item) => (
							<View key={item.id}>
								<Text style={s.sidebarItemBold}>{item.name}</Text>
								<Text style={s.sidebarItemSub}>
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
						<Text style={s.sidebarSectionTitle}>Interests</Text>
						<Text style={s.sidebarItem}>
							{sections.interests.join(", ")}
						</Text>
					</View>
				);
			}
			default:
				return null;
		}
	}

	function renderMain(sectionId: string): React.ReactNode | null {
		switch (sectionId) {
			case "workExperience": {
				if (sections.workExperience.length === 0) return null;
				return (
					<View key="workExperience">
						<Text style={s.mainSectionTitle}>Experience</Text>
						{sections.workExperience.map((item) => (
							<View key={item.id} style={s.itemContainer}>
								<View style={s.itemHeader}>
									<Text style={s.itemTitle}>{item.position}</Text>
									<Text style={s.itemDate}>
										{item.startDate} —{" "}
										{item.current ? "Present" : item.endDate}
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
			}
			case "education": {
				if (sections.education.length === 0) return null;
				return (
					<View key="education">
						<Text style={s.mainSectionTitle}>Education</Text>
						{sections.education.map((item) => (
							<View key={item.id} style={s.itemContainer}>
								<View style={s.itemHeader}>
									<Text style={s.itemTitle}>
										{item.degree} in {item.field}
									</Text>
									<Text style={s.itemDate}>
										{item.startDate} —{" "}
										{item.current ? "Present" : item.endDate}
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
			}
			case "awards": {
				if (sections.awards.length === 0) return null;
				return (
					<View key="awards">
						<Text style={s.mainSectionTitle}>Awards</Text>
						{sections.awards.map((item) => (
							<View key={item.id} style={s.itemContainer}>
								<View style={s.itemHeader}>
									<Text style={s.itemTitle}>{item.title}</Text>
									{item.date && (
										<Text style={s.itemDate}>{item.date}</Text>
									)}
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
			}
			case "volunteerWork": {
				if (sections.volunteerWork.length === 0) return null;
				return (
					<View key="volunteerWork">
						<Text style={s.mainSectionTitle}>Volunteer Work</Text>
						{sections.volunteerWork.map((item) => (
							<View key={item.id} style={s.itemContainer}>
								<View style={s.itemHeader}>
									<Text style={s.itemTitle}>{item.role}</Text>
									<Text style={s.itemDate}>
										{item.startDate} —{" "}
										{item.current ? "Present" : item.endDate}
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
			}
			case "presentations": {
				if (sections.presentations.length === 0) return null;
				return (
					<View key="presentations">
						<Text style={s.mainSectionTitle}>Presentations</Text>
						{sections.presentations.map((item) => (
							<View key={item.id} style={s.itemContainer}>
								<View style={s.itemHeader}>
									<Text style={s.itemTitle}>{item.title}</Text>
									{item.date && (
										<Text style={s.itemDate}>{item.date}</Text>
									)}
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
			}
			default:
				return null;
		}
	}

	return (
		<Document>
			<Page size="A4" style={s.page}>
				<View style={s.headerBg}>
					<Text style={s.name}>
						{contactInfo.fullName || "Your Name"}
					</Text>
					{contactItems.length > 0 && (
						<View style={s.headerContact}>
							{contactItems.map((item, i) => (
								<Text key={item}>
									{i > 0 && <Text style={s.headerSep}> | </Text>}
									{item}
								</Text>
							))}
						</View>
					)}
				</View>
				{hasContent(contactInfo.summary) && (
					<View style={s.summaryWrap}>
						<RichText content={contactInfo.summary!} style={s.summary} />
					</View>
				)}
				<View style={s.body}>
					<View style={s.sidebar}>
						{sidebarOrder.map((id) => renderSidebar(id))}
					</View>
					<View style={s.main}>
						{mainOrder.map((id) => renderMain(id))}
					</View>
				</View>
			</Page>
		</Document>
	);
}
