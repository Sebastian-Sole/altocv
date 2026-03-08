import type { ComponentType } from "react";
import type { ContactInfo, CVSections } from "@/types/cv";

export interface TemplateProps {
	contactInfo: ContactInfo;
	sections: CVSections;
	sectionOrder: string[];
}

export interface TemplateMeta {
	id: string;
	name: string;
	description: string;
}

export const TEMPLATES: TemplateMeta[] = [
	{
		id: "classic",
		name: "Classic",
		description: "Traditional single-column layout with clean lines",
	},
	{
		id: "modern",
		name: "Modern",
		description: "Bold accent colors with a contemporary feel",
	},
	{
		id: "minimal",
		name: "Minimal",
		description: "Clean and spacious with subtle typography",
	},
	{
		id: "professional",
		name: "Professional",
		description: "Two-column layout with a dark sidebar",
	},
	{
		id: "executive",
		name: "Executive",
		description: "Serif typography with formal elegance",
	},
	{
		id: "creative",
		name: "Creative",
		description: "Colored sidebar with skill visualizations",
	},
	{
		id: "compact",
		name: "Compact",
		description: "Dense layout to maximize content per page",
	},
	{
		id: "bold",
		name: "Bold",
		description: "Dramatic header with vibrant accents",
	},
];

const templateModules: Record<
	string,
	() => Promise<{ default: ComponentType<TemplateProps> }>
> = {
	classic: () =>
		import("./ClassicTemplate").then((m) => ({ default: m.ClassicTemplate })),
	modern: () =>
		import("./ModernTemplate").then((m) => ({ default: m.ModernTemplate })),
	minimal: () =>
		import("./MinimalTemplate").then((m) => ({ default: m.MinimalTemplate })),
	professional: () =>
		import("./ProfessionalTemplate").then((m) => ({
			default: m.ProfessionalTemplate,
		})),
	executive: () =>
		import("./ExecutiveTemplate").then((m) => ({
			default: m.ExecutiveTemplate,
		})),
	creative: () =>
		import("./CreativeTemplate").then((m) => ({
			default: m.CreativeTemplate,
		})),
	compact: () =>
		import("./CompactTemplate").then((m) => ({
			default: m.CompactTemplate,
		})),
	bold: () =>
		import("./BoldTemplate").then((m) => ({ default: m.BoldTemplate })),
};

// Eagerly loaded map (populated on first use)
const loadedTemplates: Record<string, ComponentType<TemplateProps>> = {};

export async function loadTemplate(
	templateId: string,
): Promise<ComponentType<TemplateProps>> {
	if (loadedTemplates[templateId]) return loadedTemplates[templateId];
	const loader = templateModules[templateId] ?? templateModules.classic;
	const mod = await loader();
	loadedTemplates[templateId] = mod.default;
	return mod.default;
}

// Synchronous getter after template has been loaded
export function getLoadedTemplate(
	templateId: string,
): ComponentType<TemplateProps> | null {
	return loadedTemplates[templateId] ?? null;
}
