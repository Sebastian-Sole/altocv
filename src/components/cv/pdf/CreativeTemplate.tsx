import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { TemplateProps } from "./templates";
import { hasContent, RichText } from "@/lib/rich-text-pdf";

const ACCENT = "#0d9488";
const SIDEBAR_BG = "#0f766e";
const SIDEBAR_W = 170;

const s = StyleSheet.create({
	page: {
		fontSize: 10,
		fontFamily: "Helvetica",
		color: "#1a1a1a",
		flexDirection: "row",
	},
	/* ── Sidebar ── */
	sidebar: {
		width: SIDEBAR_W,
		backgroundColor: SIDEBAR_BG,
		padding: "32 18 40 18",
		color: "#fff",
	},
	sidebarName: {
		fontSize: 18,
		fontFamily: "Helvetica-Bold",
		color: "#fff",
		marginBottom: 4,
	},
	sidebarContact: {
		fontSize: 8,
		color: "#bbf7d0",
		marginBottom: 2,
	},
	sidebarSection: {
		marginTop: 18,
	},
	sidebarSectionTitle: {
		fontSize: 9,
		fontFamily: "Helvetica-Bold",
		textTransform: "uppercase",
		letterSpacing: 1.5,
		color: "#bbf7d0",
		marginBottom: 6,
		borderBottom: "0.5px solid rgba(255,255,255,0.3)",
		paddingBottom: 3,
	},
	sidebarItem: {
		fontSize: 8.5,
		color: "#ecfdf5",
		marginBottom: 2,
	},
	skillRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 4,
	},
	skillName: {
		fontSize: 8.5,
		color: "#ecfdf5",
	},
	skillDots: {
		flexDirection: "row",
		gap: 2,
	},
	dotFilled: {
		width: 5,
		height: 5,
		borderRadius: 2.5,
		backgroundColor: "#bbf7d0",
	},
	dotEmpty: {
		width: 5,
		height: 5,
		borderRadius: 2.5,
		backgroundColor: "rgba(255,255,255,0.2)",
	},
	langRow: {
		marginBottom: 3,
	},
	langName: {
		fontSize: 8.5,
		fontFamily: "Helvetica-Bold",
		color: "#ecfdf5",
	},
	langLevel: {
		fontSize: 7.5,
		color: "#bbf7d0",
	},
	interestItem: {
		fontSize: 8.5,
		color: "#ecfdf5",
		marginBottom: 1,
	},
	/* ── Main ── */
	main: {
		flex: 1,
		padding: "32 36 40 28",
	},
	summary: {
		fontSize: 9.5,
		lineHeight: 1.6,
		color: "#555",
		marginBottom: 6,
	},
	mainSectionTitle: {
		fontSize: 12,
		fontFamily: "Helvetica-Bold",
		color: ACCENT,
		marginTop: 14,
		marginBottom: 6,
		borderBottom: `1.5px solid ${ACCENT}`,
		paddingBottom: 3,
		textTransform: "uppercase",
		letterSpacing: 0.8,
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
		fontSize: 10.5,
		fontFamily: "Helvetica-Bold",
	},
	itemSubtitle: {
		fontSize: 9.5,
		color: "#555",
		marginBottom: 2,
	},
	itemDate: {
		fontSize: 8.5,
		color: ACCENT,
		fontFamily: "Helvetica-Bold",
	},
	itemDescription: {
		fontSize: 9,
		lineHeight: 1.5,
		marginTop: 2,
		color: "#444",
	},
});

const SKILL_LEVELS: Record<string, number> = {
	beginner: 1,
	intermediate: 2,
	advanced: 3,
	expert: 4,
};

const LANG_LEVELS: Record<string, number> = {
	beginner: 1,
	intermediate: 2,
	advanced: 3,
	fluent: 4,
	native: 5,
};

function SkillDots({ level }: { level?: string }) {
	const filled = SKILL_LEVELS[level ?? ""] ?? 2;
	return (
		<View style={s.skillDots}>
			{Array.from({ length: 4 }).map((_, i) => (
				<View key={i} style={i < filled ? s.dotFilled : s.dotEmpty} />
			))}
		</View>
	);
}

function LangDots({ level }: { level: string }) {
	const filled = LANG_LEVELS[level] ?? 2;
	return (
		<View style={s.skillDots}>
			{Array.from({ length: 5 }).map((_, i) => (
				<View key={i} style={i < filled ? s.dotFilled : s.dotEmpty} />
			))}
		</View>
	);
}

export function CreativeTemplate({
	contactInfo,
	sections,
	sectionOrder,
}: TemplateProps) {
	const contactItems = [
		contactInfo.email && { label: contactInfo.email },
		contactInfo.phone && { label: contactInfo.phone },
		contactInfo.location && { label: contactInfo.location },
		contactInfo.linkedin && { label: contactInfo.linkedin },
		contactInfo.website && { label: contactInfo.website },
	].filter(Boolean) as { label: string }[];

	// Sidebar sections
	const SIDEBAR_KEYS = new Set([
		"skills",
		"languages",
		"certificates",
		"interests",
	]);
	const sidebarOrder = sectionOrder.filter((id) => SIDEBAR_KEYS.has(id));
	const mainOrder = sectionOrder.filter((id) => !SIDEBAR_KEYS.has(id));

	function renderSidebar(sectionId: string): React.ReactNode | null {
		switch (sectionId) {
			case "skills": {
				if (sections.skills.length === 0) return null;
				return (
					<View key="skills" style={s.sidebarSection}>
						<Text style={s.sidebarSectionTitle}>Skills</Text>
						{sections.skills.map((item) => (
							<View key={item.id} style={s.skillRow}>
								<Text style={s.skillName}>{item.name}</Text>
								<SkillDots level={item.level} />
							</View>
						))}
					</View>
				);
			}
			case "languages": {
				if (sections.languages.length === 0) return null;
				return (
					<View key="languages" style={s.sidebarSection}>
						<Text style={s.sidebarSectionTitle}>Languages</Text>
						{sections.languages.map((item) => (
							<View key={item.id} style={s.skillRow}>
								<Text style={s.langName}>{item.name}</Text>
								<LangDots level={item.proficiency} />
							</View>
						))}
					</View>
				);
			}
			case "certificates": {
				if (sections.certificates.length === 0) return null;
				return (
					<View key="certificates" style={s.sidebarSection}>
						<Text style={s.sidebarSectionTitle}>Certificates</Text>
						{sections.certificates.map((item) => (
							<View key={item.id} style={s.langRow}>
								<Text style={s.langName}>{item.name}</Text>
								<Text style={s.langLevel}>
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
					<View key="interests" style={s.sidebarSection}>
						<Text style={s.sidebarSectionTitle}>Interests</Text>
						{sections.interests.map((interest) => (
							<Text key={interest} style={s.interestItem}>
								{interest}
							</Text>
						))}
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
				<View style={s.sidebar}>
					<Text style={s.sidebarName}>
						{contactInfo.fullName || "Your Name"}
					</Text>
					{contactItems.map((c) => (
						<Text key={c.label} style={s.sidebarContact}>
							{c.label}
						</Text>
					))}
					{sidebarOrder.map((id) => renderSidebar(id))}
				</View>
				<View style={s.main}>
					{hasContent(contactInfo.summary) && (
						<RichText content={contactInfo.summary!} style={s.summary} />
					)}
					{mainOrder.map((id) => renderMain(id))}
				</View>
			</Page>
		</Document>
	);
}
