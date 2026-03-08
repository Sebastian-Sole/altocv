import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "convex/react";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { EditorHeader } from "@/components/cv/editor/EditorHeader";
import { EditorLayout } from "@/components/cv/editor/EditorLayout";
import { CoverLetterSidebar } from "@/components/cover-letter/editor/CoverLetterSidebar";
import { ShareDialog } from "@/components/cv/ShareDialog";
import { ExportButton } from "@/components/cv/pdf/ExportButton";
import { loadCoverLetterTemplate } from "@/components/cover-letter/pdf/coverLetterTemplates";
import { useAutoSave } from "@/hooks/useAutoSave";
import type { CoverLetterContactInfo, RecipientInfo } from "@/types/coverLetter";
import { api } from "../../convex/_generated/api";

const PDFPreview = lazy(() =>
	import("@/components/cv/pdf/PDFPreview").then((m) => ({
		default: m.PDFPreview,
	})),
);

export const Route = createFileRoute("/editor/cover-letter/$clId")({
	component: CoverLetterEditorPage,
});

function CoverLetterEditorPage() {
	const { clId } = Route.useParams();
	const cl = useQuery(api.coverLetters.get, { id: clId as any });
	const updateCL = useMutation(api.coverLetters.update);
	const [saving, setSaving] = useState(false);

	const [localTitle, setLocalTitle] = useState<string | null>(null);
	const [localContactInfo, setLocalContactInfo] =
		useState<CoverLetterContactInfo | null>(null);
	const [localRecipientInfo, setLocalRecipientInfo] =
		useState<RecipientInfo | null>(null);
	const [localDate, setLocalDate] = useState<string | null>(null);
	const [localSubject, setLocalSubject] = useState<string | null>(null);
	const [localBody, setLocalBody] = useState<string | null>(null);
	const [localSignOff, setLocalSignOff] = useState<string | null>(null);

	const templateId = cl?.templateId ?? "classic-letter";
	const [Template, setTemplate] = useState<React.ComponentType<any> | null>(
		null,
	);

	useEffect(() => {
		loadCoverLetterTemplate(templateId).then((T) => setTemplate(() => T));
	}, [templateId]);

	const title = localTitle ?? cl?.title ?? "";
	const contactInfo = localContactInfo ??
		cl?.contactInfo ?? { fullName: "", email: "" };
	const recipientInfo = localRecipientInfo ?? cl?.recipientInfo ?? {};
	const date = localDate ?? cl?.date ?? "";
	const subject = localSubject ?? cl?.subject ?? "";
	const body = localBody ?? cl?.body ?? "";
	const signOff = localSignOff ?? cl?.signOff ?? "";

	const saveContent = useCallback(
		async (data: {
			title: string;
			contactInfo: CoverLetterContactInfo;
			recipientInfo: RecipientInfo;
			date: string;
			subject: string;
			body: string;
			signOff: string;
		}) => {
			setSaving(true);
			try {
				await updateCL({
					id: clId as any,
					title: data.title,
					contactInfo: data.contactInfo,
					recipientInfo: data.recipientInfo,
					date: data.date,
					subject: data.subject,
					body: data.body,
					signOff: data.signOff,
				});
			} finally {
				setSaving(false);
			}
		},
		[clId, updateCL],
	);

	useAutoSave(
		{ title, contactInfo, recipientInfo, date, subject, body, signOff },
		saveContent,
	);

	if (cl === undefined) {
		return (
			<div className="flex h-screen items-center justify-center">
				<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
			</div>
		);
	}

	if (cl === null) {
		return (
			<div className="flex h-screen items-center justify-center">
				<p className="text-muted-foreground">Cover letter not found</p>
			</div>
		);
	}

	const templateDocument = Template ? (
		<Template
			contactInfo={contactInfo}
			recipientInfo={recipientInfo}
			date={date}
			subject={subject}
			body={body}
			signOff={signOff}
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
				<ShareDialog
					id={clId}
					isPublic={cl.isPublic ?? false}
					setPublicMutation={api.coverLetters.setPublic}
					basePath="/cover-letter"
					label="Cover Letter"
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
					<CoverLetterSidebar
						contactInfo={contactInfo}
						recipientInfo={recipientInfo}
						date={date}
						subject={subject}
						body={body}
						signOff={signOff}
						onContactInfoChange={setLocalContactInfo}
						onRecipientInfoChange={setLocalRecipientInfo}
						onDateChange={setLocalDate}
						onSubjectChange={setLocalSubject}
						onBodyChange={setLocalBody}
						onSignOffChange={setLocalSignOff}
					/>
				}
				preview={pdfPreview}
			/>
		</div>
	);
}
