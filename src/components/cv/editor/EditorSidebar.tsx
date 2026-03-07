import {
	closestCenter,
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	SortableContext,
	sortableKeyboardCoordinates,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { DragHandleProvider } from "./SectionWrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ContactInfo, CVSections } from "@/types/cv";
import { AwardsForm } from "./AwardsForm";
import { CertificatesForm } from "./CertificatesForm";
import { ContactInfoForm } from "./ContactInfoForm";
import { EducationForm } from "./EducationForm";
import { InterestsForm } from "./InterestsForm";
import { LanguagesForm } from "./LanguagesForm";
import { PresentationsForm } from "./PresentationsForm";
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

function SortableSection({
	id,
	children,
}: { id: string; children: React.ReactNode }) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
		useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const handle = (
		<button
			type="button"
			className="cursor-grab touch-none pl-3 text-muted-foreground hover:text-foreground"
			{...attributes}
			{...listeners}
		>
			<GripVertical className="h-4 w-4" />
		</button>
	);

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={isDragging ? "z-50 opacity-80" : ""}
		>
			<DragHandleProvider handle={handle}>{children}</DragHandleProvider>
		</div>
	);
}

export function EditorSidebar({
	contactInfo,
	sections,
	sectionOrder,
	onContactInfoChange,
	onSectionsChange,
	onSectionOrderChange,
}: EditorSidebarProps) {
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	function handleSectionChange(key: keyof CVSections, value: unknown) {
		onSectionsChange({ ...sections, [key]: value });
	}

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		if (over && active.id !== over.id) {
			const oldIndex = sectionOrder.indexOf(active.id as string);
			const newIndex = sectionOrder.indexOf(over.id as string);
			const newOrder = [...sectionOrder];
			newOrder.splice(oldIndex, 1);
			newOrder.splice(newIndex, 0, active.id as string);
			onSectionOrderChange(newOrder);
		}
	}

	return (
		<div className="flex h-full w-full flex-col border-r">
			<ScrollArea className="h-full">
				<div className="space-y-4 p-4">
					<ContactInfoForm
						data={contactInfo}
						onChange={onContactInfoChange}
					/>
					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd}
					>
						<SortableContext
							items={sectionOrder}
							strategy={verticalListSortingStrategy}
						>
							{sectionOrder.map((sectionId) => {
								const config = sectionFormMap[sectionId];
								if (!config) return null;
								const FormComponent = config.component;
								return (
									<SortableSection key={sectionId} id={sectionId}>
										<FormComponent
											data={sections[config.key]}
											onChange={(value: unknown) =>
												handleSectionChange(config.key, value)
											}
										/>
									</SortableSection>
								);
							})}
						</SortableContext>
					</DndContext>
				</div>
			</ScrollArea>
		</div>
	);
}
