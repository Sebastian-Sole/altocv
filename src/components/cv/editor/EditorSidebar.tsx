import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ContactInfo, CVSections } from "@/types/cv";
import { AwardsForm } from "./AwardsForm";
import { CertificatesForm } from "./CertificatesForm";
import { ContactInfoForm } from "./ContactInfoForm";
import { EducationForm } from "./EducationForm";
import { InterestsForm } from "./InterestsForm";
import { LanguagesForm } from "./LanguagesForm";
import { PresentationsForm } from "./PresentationsForm";
import { SectionReorder } from "./SectionReorder";
import { SkillsForm } from "./SkillsForm";
import { VolunteerWorkForm } from "./VolunteerWorkForm";
import { WorkExperienceForm } from "./WorkExperienceForm";

interface EditorSidebarProps {
	contactInfo: ContactInfo;
	sections: CVSections;
	sectionOrder: string[];
	onContactInfoChange: (data: ContactInfo) => void;
	onSectionsChange: (data: CVSections) => void;
	onSectionOrderChange: (order: string[]) => void;
}

const sectionFormMap: Record<
	string,
	{
		component: React.ComponentType<{
			data: any;
			onChange: (data: any) => void;
		}>;
		key: keyof CVSections;
	}
> = {
	workExperience: { component: WorkExperienceForm, key: "workExperience" },
	education: { component: EducationForm, key: "education" },
	skills: { component: SkillsForm, key: "skills" },
	languages: { component: LanguagesForm, key: "languages" },
	certificates: { component: CertificatesForm, key: "certificates" },
	awards: { component: AwardsForm, key: "awards" },
	volunteerWork: { component: VolunteerWorkForm, key: "volunteerWork" },
	presentations: { component: PresentationsForm, key: "presentations" },
	interests: { component: InterestsForm, key: "interests" },
};

export function EditorSidebar({
	contactInfo,
	sections,
	sectionOrder,
	onContactInfoChange,
	onSectionsChange,
	onSectionOrderChange,
}: EditorSidebarProps) {
	function handleSectionChange(key: keyof CVSections, value: unknown) {
		onSectionsChange({ ...sections, [key]: value });
	}

	return (
		<div className="flex h-full w-full flex-col border-r">
			<Tabs defaultValue="edit" className="flex h-full flex-col">
				<TabsList className="mx-4 mt-2">
					<TabsTrigger value="edit">Edit</TabsTrigger>
					<TabsTrigger value="reorder">Reorder</TabsTrigger>
				</TabsList>
				<TabsContent value="edit" className="flex-1 overflow-hidden">
					<ScrollArea className="h-full">
						<div className="space-y-4 p-4">
							<ContactInfoForm
								data={contactInfo}
								onChange={onContactInfoChange}
							/>
							{sectionOrder.map((sectionId) => {
								const config = sectionFormMap[sectionId];
								if (!config) return null;
								const FormComponent = config.component;
								return (
									<FormComponent
										key={sectionId}
										data={sections[config.key]}
										onChange={(value: unknown) =>
											handleSectionChange(config.key, value)
										}
									/>
								);
							})}
						</div>
					</ScrollArea>
				</TabsContent>
				<TabsContent value="reorder" className="flex-1 overflow-hidden">
					<ScrollArea className="h-full">
						<div className="p-4">
							<SectionReorder
								sectionOrder={sectionOrder}
								onReorder={onSectionOrderChange}
							/>
						</div>
					</ScrollArea>
				</TabsContent>
			</Tabs>
		</div>
	);
}
