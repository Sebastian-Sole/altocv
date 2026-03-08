import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import {
	requireAuth,
	requireCoverLetterOwnership,
} from "./model/authorization";

export const list = query({
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) return [];
		return await ctx.db
			.query("coverLetters")
			.withIndex("by_user", (q) => q.eq("userId", identity.subject))
			.order("desc")
			.collect();
	},
});

export const get = query({
	args: { id: v.id("coverLetters") },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) return null;
		const cl = await ctx.db.get(args.id);
		if (!cl || cl.userId !== identity.subject) return null;
		return cl;
	},
});

export const create = mutation({
	args: {
		title: v.string(),
		language: v.optional(v.string()),
		templateId: v.optional(v.string()),
		linkedCvId: v.optional(v.id("cvs")),
	},
	handler: async (ctx, args) => {
		const identity = await requireAuth(ctx);
		const now = Date.now();

		let contactInfo = { fullName: "", email: "" };

		if (args.linkedCvId) {
			const cv = await ctx.db.get(args.linkedCvId);
			if (cv && cv.userId === identity.subject) {
				contactInfo = {
					fullName: cv.contactInfo.fullName,
					email: cv.contactInfo.email,
					...(cv.contactInfo.phone && { phone: cv.contactInfo.phone }),
					...(cv.contactInfo.location && {
						location: cv.contactInfo.location,
					}),
				};
			}
		}

		return await ctx.db.insert("coverLetters", {
			userId: identity.subject,
			title: args.title,
			language: args.language ?? "en",
			templateId: args.templateId ?? "classic-letter",
			linkedCvId: args.linkedCvId,
			contactInfo,
			recipientInfo: {},
			date: new Date().toISOString().split("T")[0],
			subject: "",
			body: "",
			createdAt: now,
			updatedAt: now,
		});
	},
});

export const update = mutation({
	args: {
		id: v.id("coverLetters"),
		title: v.optional(v.string()),
		language: v.optional(v.string()),
		templateId: v.optional(v.string()),
		contactInfo: v.optional(
			v.object({
				fullName: v.string(),
				email: v.string(),
				phone: v.optional(v.string()),
				location: v.optional(v.string()),
			}),
		),
		recipientInfo: v.optional(
			v.object({
				companyName: v.optional(v.string()),
				hiringManagerName: v.optional(v.string()),
				companyAddress: v.optional(v.string()),
			}),
		),
		date: v.optional(v.string()),
		subject: v.optional(v.string()),
		body: v.optional(v.string()),
		signOff: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		await requireCoverLetterOwnership(ctx, args.id);
		const { id, ...updates } = args;
		await ctx.db.patch(id, {
			...updates,
			updatedAt: Date.now(),
		});
	},
});

export const remove = mutation({
	args: { id: v.id("coverLetters") },
	handler: async (ctx, args) => {
		await requireCoverLetterOwnership(ctx, args.id);
		await ctx.db.delete(args.id);
	},
});

export const duplicate = mutation({
	args: { id: v.id("coverLetters") },
	handler: async (ctx, args) => {
		const { coverLetter: cl } = await requireCoverLetterOwnership(
			ctx,
			args.id,
		);
		const now = Date.now();
		return await ctx.db.insert("coverLetters", {
			userId: cl.userId,
			title: `${cl.title} (Copy)`,
			language: cl.language,
			templateId: cl.templateId,
			linkedCvId: cl.linkedCvId,
			contactInfo: cl.contactInfo,
			recipientInfo: cl.recipientInfo,
			date: cl.date,
			subject: cl.subject,
			body: cl.body,
			signOff: cl.signOff,
			isPublic: cl.isPublic,
			createdAt: now,
			updatedAt: now,
		});
	},
});

export const getPublic = query({
	args: { id: v.id("coverLetters") },
	handler: async (ctx, args) => {
		const cl = await ctx.db.get(args.id);
		if (!cl || !cl.isPublic) return null;
		return cl;
	},
});

export const setPublic = mutation({
	args: { id: v.id("coverLetters"), isPublic: v.boolean() },
	handler: async (ctx, args) => {
		await requireCoverLetterOwnership(ctx, args.id);
		await ctx.db.patch(args.id, { isPublic: args.isPublic });
	},
});
