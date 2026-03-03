"use node";

import Anthropic from "@anthropic-ai/sdk";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { action, internalAction } from "./_generated/server";
import { internal } from "./_generated/api";

// Re-export as a public action that delegates to the internal one
export const translateCV = action({
	args: {
		cvId: v.id("cvs"),
		targetLanguage: v.string(),
	},
	handler: async (ctx, args): Promise<Id<"cvs">> => {
		return await ctx.runAction(internal.translate.translateCVInternal, args);
	},
});

export const translateCVInternal = internalAction({
	args: {
		cvId: v.id("cvs"),
		targetLanguage: v.string(),
	},
	handler: async (ctx, args): Promise<Id<"cvs">> => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Not authenticated");

		if (!process.env.ANTHROPIC_API_KEY) {
			throw new Error(
				"Translation is not available. Set the ANTHROPIC_API_KEY environment variable in your Convex dashboard.",
			);
		}

		const { api } = await import("./_generated/api");

		const cv = await ctx.runQuery(api.cvs.get, { id: args.cvId });
		if (!cv) throw new Error("CV not found");

		const translatableContent = {
			contactInfo: {
				summary: cv.contactInfo.summary,
			},
			sections: {
				workExperience: cv.sections.workExperience.map(
					(w: { position: string; description: string }) => ({
						position: w.position,
						description: w.description,
					}),
				),
				education: cv.sections.education.map(
					(e: { degree: string; field: string; description?: string }) => ({
						degree: e.degree,
						field: e.field,
						description: e.description,
					}),
				),
				skills: cv.sections.skills.map((s: { name: string }) => ({
					name: s.name,
				})),
				certificates: cv.sections.certificates.map(
					(c: { name: string }) => ({ name: c.name }),
				),
				awards: cv.sections.awards.map(
					(a: { title: string; description?: string }) => ({
						title: a.title,
						description: a.description,
					}),
				),
				volunteerWork: cv.sections.volunteerWork.map(
					(vw: { role: string; description?: string }) => ({
						role: vw.role,
						description: vw.description,
					}),
				),
				presentations: cv.sections.presentations.map(
					(p: { title: string; description?: string }) => ({
						title: p.title,
						description: p.description,
					}),
				),
				interests: cv.sections.interests,
			},
		};

		const client = new Anthropic();
		const response = await client.messages.create({
			model: "claude-sonnet-4-20250514",
			max_tokens: 4096,
			messages: [
				{
					role: "user",
					content: `Translate the following CV content from ${cv.language} to ${args.targetLanguage}. Return ONLY valid JSON with the exact same structure. Do not translate proper nouns (company names, institution names, people names). Translate job titles, descriptions, skill names, and other descriptive text.

${JSON.stringify(translatableContent, null, 2)}`,
				},
			],
		});

		const textBlock = response.content.find(
			(b: { type: string }) => b.type === "text",
		);
		if (!textBlock || textBlock.type !== "text") {
			throw new Error("No translation response");
		}

		// biome-ignore lint/suspicious/noExplicitAny: dynamic JSON from API
		const translated: any = JSON.parse(textBlock.text);

		const translatedSections = { ...cv.sections };

		translatedSections.workExperience = cv.sections.workExperience.map(
			// biome-ignore lint/suspicious/noExplicitAny: Convex doc type
			(w: any, i: number) => ({
				...w,
				position: translated.sections.workExperience[i]?.position ?? w.position,
				description:
					translated.sections.workExperience[i]?.description ?? w.description,
			}),
		);

		translatedSections.education = cv.sections.education.map(
			// biome-ignore lint/suspicious/noExplicitAny: Convex doc type
			(e: any, i: number) => ({
				...e,
				degree: translated.sections.education[i]?.degree ?? e.degree,
				field: translated.sections.education[i]?.field ?? e.field,
				description:
					translated.sections.education[i]?.description ?? e.description,
			}),
		);

		translatedSections.skills = cv.sections.skills.map(
			// biome-ignore lint/suspicious/noExplicitAny: Convex doc type
			(s: any, i: number) => ({
				...s,
				name: translated.sections.skills[i]?.name ?? s.name,
			}),
		);

		translatedSections.certificates = cv.sections.certificates.map(
			// biome-ignore lint/suspicious/noExplicitAny: Convex doc type
			(c: any, i: number) => ({
				...c,
				name: translated.sections.certificates[i]?.name ?? c.name,
			}),
		);

		translatedSections.awards = cv.sections.awards.map(
			// biome-ignore lint/suspicious/noExplicitAny: Convex doc type
			(a: any, i: number) => ({
				...a,
				title: translated.sections.awards[i]?.title ?? a.title,
				description:
					translated.sections.awards[i]?.description ?? a.description,
			}),
		);

		translatedSections.volunteerWork = cv.sections.volunteerWork.map(
			// biome-ignore lint/suspicious/noExplicitAny: Convex doc type
			(vw: any, i: number) => ({
				...vw,
				role: translated.sections.volunteerWork[i]?.role ?? vw.role,
				description:
					translated.sections.volunteerWork[i]?.description ?? vw.description,
			}),
		);

		translatedSections.presentations = cv.sections.presentations.map(
			// biome-ignore lint/suspicious/noExplicitAny: Convex doc type
			(p: any, i: number) => ({
				...p,
				title: translated.sections.presentations[i]?.title ?? p.title,
				description:
					translated.sections.presentations[i]?.description ?? p.description,
			}),
		);

		translatedSections.interests =
			translated.sections.interests ?? cv.sections.interests;

		const newCvId = await ctx.runMutation(api.cvs.create, {
			title: `${cv.title} (${args.targetLanguage.toUpperCase()})`,
			language: args.targetLanguage,
			templateId: cv.templateId,
		});

		await ctx.runMutation(api.cvs.update, {
			id: newCvId,
			contactInfo: {
				...cv.contactInfo,
				summary: translated.contactInfo?.summary ?? cv.contactInfo.summary,
			},
			sections: translatedSections,
		});

		return newCvId;
	},
});
