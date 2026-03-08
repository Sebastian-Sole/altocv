import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "convex/react";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { EditorHeader } from "@/components/cv/editor/EditorHeader";
import { EditorLayout } from "@/components/cv/editor/EditorLayout";
import { EditorSidebar } from "@/components/cv/editor/EditorSidebar";
import { TranslateDialog } from "@/components/cv/editor/TranslateDialog";
import { ShareDialog } from "@/components/cv/ShareDialog";
import { ExportButton } from "@/components/cv/pdf/ExportButton";
import { loadTemplate } from "@/components/cv/pdf/templates";
import { useAutoSave } from "@/hooks/useAutoSave";
import type { ContactInfo, CVSections } from "@/types/cv";
import { api } from "../../convex/_generated/api";

const PDFPreview = lazy(() =>
	import("@/components/cv/pdf/PDFPreview").then((m) => ({
		default: m.PDFPreview,
	})),
);

export const Route = createFileRoute("/editor/$cvId")({
	component: EditorPage,
});

function EditorPage() {
	const { cvId } = Route.useParams();
	const cv = useQuery(api.cvs.get, { id: cvId as any });
	const updateCV = useMutation(api.cvs.update);
	const updateSectionOrder = useMutation(api.cvs.updateSectionOrder);
	const [saving, setSaving] = useState(false);

	const [localTitle, setLocalTitle] = useState<string | null>(null);
	const [localContactInfo, setLocalContactInfo] = useState<ContactInfo | null>(
		null,
	);
	const [localSections, setLocalSections] = useState<CVSections | null>(null);
	const [localSectionOrder, setLocalSectionOrder] = useState<string[] | null>(
		null,
	);

	const templateId = cv?.templateId ?? "classic";
	const [Template, setTemplate] = useState<React.ComponentType<any> | null>(null);

	useEffect(() => {
		loadTemplate(templateId).then((T) => setTemplate(() => T));
	}, [templateId]);

	const title = localTitle ?? cv?.title ?? "";
	const contactInfo = localContactInfo ??
		cv?.contactInfo ?? { fullName: "", email: "" };
	const sections = localSections ??
		cv?.sections ?? {
			workExperience: [],
			education: [],
			skills: [],
			languages: [],
			certificates: [],
			awards: [],
			volunteerWork: [],
			presentations: [],
			interests: [],
		};
	const sectionOrder = localSectionOrder ?? cv?.sectionOrder ?? [];

	const saveContent = useCallback(
		async (data: {
			title: string;
			contactInfo: ContactInfo;
			sections: CVSections;
		}) => {
			setSaving(true);
			try {
				await updateCV({
					id: cvId as any,
					title: data.title,
					contactInfo: data.contactInfo,
					sections: data.sections,
				});
			} finally {
				setSaving(false);
			}
		},
		[cvId, updateCV],
	);

	useAutoSave({ title, contactInfo, sections }, saveContent);

	function handleSectionOrderChange(newOrder: string[]) {
		setLocalSectionOrder(newOrder);
		updateSectionOrder({ id: cvId as any, sectionOrder: newOrder });
	}

	if (cv === undefined) {
		return (
			<div className="flex h-screen items-center justify-center">
				<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
			</div>
		);
	}

	if (cv === null) {
		return (
			<div className="flex h-screen items-center justify-center">
				<p className="text-muted-foreground">CV not found</p>
			</div>
		);
	}

	const templateDocument = Template ? (
		<Template
			contactInfo={contactInfo}
			sections={sections}
			sectionOrder={sectionOrder}
		/>
	) : null;

	const pdfPreview = templateDocument ? (
		<Suspense
			fallback={
				<div className="flex h-full w-full items-center justify-center">
					<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
				</div>
			}
		>
			<PDFPreview document={templateDocument} />
		</Suspense>
	) : (
		<div className="flex h-full w-full items-center justify-center">
			<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
		</div>
	);

	return (
		<div className="flex h-screen flex-col">
			<EditorHeader
				title={title}
				onTitleChange={setLocalTitle}
				saving={saving}
				preview={pdfPreview}
			>
				<TranslateDialog cvId={cvId} currentLanguage={cv.language} />
				<ShareDialog
					id={cvId}
					isPublic={cv.isPublic ?? false}
					setPublicMutation={api.cvs.setPublic}
					basePath="/cv"
				/>
				{templateDocument && (
					<ExportButton
						document={templateDocument}
						fileName={`${title.replace(/\s+/g, "_")}.pdf`}
					/>
				)}
			</EditorHeader>
			<EditorLayout
				sidebar={
					<EditorSidebar
						contactInfo={contactInfo}
						sections={sections}
						sectionOrder={sectionOrder}
						onContactInfoChange={setLocalContactInfo}
						onSectionsChange={setLocalSections}
						onSectionOrderChange={handleSectionOrderChange}
					/>
				}
				preview={pdfPreview}
			/>
		</div>
	);
}
