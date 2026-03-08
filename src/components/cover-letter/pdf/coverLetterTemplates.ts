import type { ComponentType } from "react";
import type {
	CoverLetterContactInfo,
	RecipientInfo,
} from "@/types/coverLetter";

export interface CoverLetterTemplateProps {
	contactInfo: CoverLetterContactInfo;
	recipientInfo: RecipientInfo;
	date: string;
	subject: string;
	body: string;
	signOff?: string;
}

export interface CoverLetterTemplateMeta {
	id: string;
	name: string;
	description: string;
}

export const COVER_LETTER_TEMPLATES: CoverLetterTemplateMeta[] = [
	{
		id: "classic-letter",
		name: "Classic",
		description: "Traditional business letter with serif font",
	},
	{
		id: "modern-letter",
		name: "Modern",
		description: "Colored header bar with sans-serif styling",
	},
	{
		id: "formal-letter",
		name: "Formal",
		description: "Centered letterhead with small caps and thin border",
	},
	{
		id: "minimal-letter",
		name: "Minimal",
		description: "Maximum whitespace with minimal decoration",
	},
];

const templateModules: Record<
	string,
	() => Promise<{ default: ComponentType<CoverLetterTemplateProps> }>
> = {
	"classic-letter": () =>
		import("./ClassicLetterTemplate").then((m) => ({
			default: m.ClassicLetterTemplate,
		})),
	"modern-letter": () =>
		import("./ModernLetterTemplate").then((m) => ({
			default: m.ModernLetterTemplate,
		})),
	"formal-letter": () =>
		import("./FormalLetterTemplate").then((m) => ({
			default: m.FormalLetterTemplate,
		})),
	"minimal-letter": () =>
		import("./MinimalLetterTemplate").then((m) => ({
			default: m.MinimalLetterTemplate,
		})),
};

const loadedTemplates: Record<
	string,
	ComponentType<CoverLetterTemplateProps>
> = {};

export async function loadCoverLetterTemplate(
	templateId: string,
): Promise<ComponentType<CoverLetterTemplateProps>> {
	if (loadedTemplates[templateId]) return loadedTemplates[templateId];
	const loader =
		templateModules[templateId] ?? templateModules["classic-letter"];
	const mod = await loader();
	loadedTemplates[templateId] = mod.default;
	return mod.default;
}

export function getLoadedCoverLetterTemplate(
	templateId: string,
): ComponentType<CoverLetterTemplateProps> | null {
	return loadedTemplates[templateId] ?? null;
}
