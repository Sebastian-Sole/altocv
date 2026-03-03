import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAuth, requireCVOwnership } from "./model/authorization";

export const list = query({
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) return [];
		return await ctx.db
			.query("cvs")
			.withIndex("by_user", (q) => q.eq("userId", identity.subject))
			.order("desc")
			.collect();
	},
});

export const get = query({
	args: { id: v.id("cvs") },
	handler: async (ctx, args) => {
		const { cv } = await requireCVOwnership(ctx, args.id);
		return cv;
	},
});

export const create = mutation({
	args: {
		title: v.string(),
		language: v.optional(v.string()),
		templateId: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const identity = await requireAuth(ctx);
		const now = Date.now();
		return await ctx.db.insert("cvs", {
			userId: identity.subject,
			title: args.title,
			language: args.language ?? "en",
			templateId: args.templateId ?? "classic",
			sectionOrder: [
				"workExperience",
				"education",
				"skills",
				"languages",
				"certificates",
				"awards",
				"volunteerWork",
				"presentations",
				"interests",
			],
			contactInfo: {
				fullName: "",
				email: "",
			},
			sections: {
				workExperience: [],
				education: [],
				skills: [],
				languages: [],
				certificates: [],
				awards: [],
				volunteerWork: [],
				presentations: [],
				interests: [],
			},
			createdAt: now,
			updatedAt: now,
		});
	},
});

export const update = mutation({
	args: {
		id: v.id("cvs"),
		title: v.optional(v.string()),
		language: v.optional(v.string()),
		templateId: v.optional(v.string()),
		contactInfo: v.optional(
			v.object({
				fullName: v.string(),
				email: v.string(),
				phone: v.optional(v.string()),
				location: v.optional(v.string()),
				linkedin: v.optional(v.string()),
				website: v.optional(v.string()),
				summary: v.optional(v.string()),
			}),
		),
		sections: v.optional(
			v.object({
				workExperience: v.array(
					v.object({
						id: v.string(),
						company: v.string(),
						position: v.string(),
						location: v.optional(v.string()),
						startDate: v.string(),
						endDate: v.optional(v.string()),
						current: v.boolean(),
						description: v.string(),
					}),
				),
				education: v.array(
					v.object({
						id: v.string(),
						institution: v.string(),
						degree: v.string(),
						field: v.string(),
						location: v.optional(v.string()),
						startDate: v.string(),
						endDate: v.optional(v.string()),
						current: v.boolean(),
						description: v.optional(v.string()),
					}),
				),
				skills: v.array(
					v.object({
						id: v.string(),
						name: v.string(),
						level: v.optional(
							v.union(
								v.literal("beginner"),
								v.literal("intermediate"),
								v.literal("advanced"),
								v.literal("expert"),
							),
						),
					}),
				),
				languages: v.array(
					v.object({
						id: v.string(),
						name: v.string(),
						proficiency: v.union(
							v.literal("native"),
							v.literal("fluent"),
							v.literal("advanced"),
							v.literal("intermediate"),
							v.literal("beginner"),
						),
					}),
				),
				certificates: v.array(
					v.object({
						id: v.string(),
						name: v.string(),
						issuer: v.string(),
						date: v.optional(v.string()),
						url: v.optional(v.string()),
					}),
				),
				awards: v.array(
					v.object({
						id: v.string(),
						title: v.string(),
						issuer: v.string(),
						date: v.optional(v.string()),
						description: v.optional(v.string()),
					}),
				),
				volunteerWork: v.array(
					v.object({
						id: v.string(),
						organization: v.string(),
						role: v.string(),
						startDate: v.string(),
						endDate: v.optional(v.string()),
						current: v.boolean(),
						description: v.optional(v.string()),
					}),
				),
				presentations: v.array(
					v.object({
						id: v.string(),
						title: v.string(),
						event: v.string(),
						date: v.optional(v.string()),
						url: v.optional(v.string()),
						description: v.optional(v.string()),
					}),
				),
				interests: v.array(v.string()),
			}),
		),
	},
	handler: async (ctx, args) => {
		await requireCVOwnership(ctx, args.id);
		const { id, ...updates } = args;
		await ctx.db.patch(id, {
			...updates,
			updatedAt: Date.now(),
		});
	},
});

export const updateSectionOrder = mutation({
	args: {
		id: v.id("cvs"),
		sectionOrder: v.array(v.string()),
	},
	handler: async (ctx, args) => {
		await requireCVOwnership(ctx, args.id);
		await ctx.db.patch(args.id, {
			sectionOrder: args.sectionOrder,
			updatedAt: Date.now(),
		});
	},
});

export const remove = mutation({
	args: { id: v.id("cvs") },
	handler: async (ctx, args) => {
		await requireCVOwnership(ctx, args.id);
		await ctx.db.delete(args.id);
	},
});

export const duplicate = mutation({
	args: { id: v.id("cvs") },
	handler: async (ctx, args) => {
		const { cv } = await requireCVOwnership(ctx, args.id);
		const now = Date.now();
		const { _id, _creationTime, ...rest } = cv;
		return await ctx.db.insert("cvs", {
			...rest,
			title: `${cv.title} (Copy)`,
			createdAt: now,
			updatedAt: now,
		});
	},
});
