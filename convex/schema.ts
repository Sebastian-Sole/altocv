import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const contactInfoValidator = v.object({
	fullName: v.string(),
	email: v.string(),
	phone: v.optional(v.string()),
	location: v.optional(v.string()),
	linkedin: v.optional(v.string()),
	website: v.optional(v.string()),
	summary: v.optional(v.string()),
});

const workExperienceValidator = v.object({
	id: v.string(),
	company: v.string(),
	position: v.string(),
	location: v.optional(v.string()),
	startDate: v.string(),
	endDate: v.optional(v.string()),
	current: v.boolean(),
	description: v.string(),
});

const educationValidator = v.object({
	id: v.string(),
	institution: v.string(),
	degree: v.string(),
	field: v.string(),
	location: v.optional(v.string()),
	startDate: v.string(),
	endDate: v.optional(v.string()),
	current: v.boolean(),
	description: v.optional(v.string()),
});

const skillValidator = v.object({
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
});

const languageValidator = v.object({
	id: v.string(),
	name: v.string(),
	proficiency: v.union(
		v.literal("native"),
		v.literal("fluent"),
		v.literal("advanced"),
		v.literal("intermediate"),
		v.literal("beginner"),
	),
});

const certificateValidator = v.object({
	id: v.string(),
	name: v.string(),
	issuer: v.string(),
	date: v.optional(v.string()),
	url: v.optional(v.string()),
});

const awardValidator = v.object({
	id: v.string(),
	title: v.string(),
	issuer: v.string(),
	date: v.optional(v.string()),
	description: v.optional(v.string()),
});

const volunteerWorkValidator = v.object({
	id: v.string(),
	organization: v.string(),
	role: v.string(),
	startDate: v.string(),
	endDate: v.optional(v.string()),
	current: v.boolean(),
	description: v.optional(v.string()),
});

const presentationValidator = v.object({
	id: v.string(),
	title: v.string(),
	event: v.string(),
	date: v.optional(v.string()),
	url: v.optional(v.string()),
	description: v.optional(v.string()),
});

const sectionsValidator = v.object({
	workExperience: v.array(workExperienceValidator),
	education: v.array(educationValidator),
	skills: v.array(skillValidator),
	languages: v.array(languageValidator),
	certificates: v.array(certificateValidator),
	awards: v.array(awardValidator),
	volunteerWork: v.array(volunteerWorkValidator),
	presentations: v.array(presentationValidator),
	interests: v.array(v.string()),
});

const coverLetterContactInfoValidator = v.object({
	fullName: v.string(),
	email: v.string(),
	phone: v.optional(v.string()),
	location: v.optional(v.string()),
});

const recipientInfoValidator = v.object({
	companyName: v.optional(v.string()),
	hiringManagerName: v.optional(v.string()),
	companyAddress: v.optional(v.string()),
});

export default defineSchema({
	cvs: defineTable({
		userId: v.string(),
		title: v.string(),
		language: v.string(),
		templateId: v.string(),
		sectionOrder: v.array(v.string()),
		contactInfo: contactInfoValidator,
		sections: sectionsValidator,
		isPublic: v.optional(v.boolean()),
		createdAt: v.number(),
		updatedAt: v.number(),
	}).index("by_user", ["userId"]),

	coverLetters: defineTable({
		userId: v.string(),
		title: v.string(),
		language: v.string(),
		templateId: v.string(),
		linkedCvId: v.optional(v.id("cvs")),
		contactInfo: coverLetterContactInfoValidator,
		recipientInfo: recipientInfoValidator,
		date: v.string(),
		subject: v.string(),
		body: v.string(),
		signOff: v.optional(v.string()),
		isPublic: v.optional(v.boolean()),
		createdAt: v.number(),
		updatedAt: v.number(),
	}).index("by_user", ["userId"]),
});
