import { Document, Page } from "@react-pdf/renderer";
import type { ContactInfo, CVSections } from "@/types/cv";
import { AwardsSection } from "./sections/AwardsSection";
import { CertificatesSection } from "./sections/CertificatesSection";
import { EducationSection } from "./sections/EducationSection";
import { HeaderSection } from "./sections/HeaderSection";
import { InterestsSection } from "./sections/InterestsSection";
import { LanguagesSection } from "./sections/LanguagesSection";
import { PresentationsSection } from "./sections/PresentationsSection";
import { SkillsSection } from "./sections/SkillsSection";
import { VolunteerSection } from "./sections/VolunteerSection";
import { WorkExperienceSection } from "./sections/WorkExperienceSection";
import { styles } from "./styles";

interface ClassicTemplateProps {
	contactInfo: ContactInfo;
	sections: CVSections;
	sectionOrder: string[];
}

const sectionComponents: Record<string, React.ComponentType<{ data: any }>> = {
	workExperience: WorkExperienceSection,
	education: EducationSection,
	skills: SkillsSection,
	languages: LanguagesSection,
	certificates: CertificatesSection,
	awards: AwardsSection,
	volunteerWork: VolunteerSection,
	presentations: PresentationsSection,
	interests: InterestsSection,
};

export function ClassicTemplate({
	contactInfo,
	sections,
	sectionOrder,
}: ClassicTemplateProps) {
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<HeaderSection data={contactInfo} />
				{sectionOrder.map((sectionId) => {
					const Component = sectionComponents[sectionId];
					if (!Component) return null;
					const key = sectionId as keyof CVSections;
					return <Component key={sectionId} data={sections[key]} />;
				})}
			</Page>
		</Document>
	);
}
