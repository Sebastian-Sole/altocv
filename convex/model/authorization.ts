import type { Id } from "../_generated/dataModel";
import type { MutationCtx, QueryCtx } from "../_generated/server";

export async function requireAuth(ctx: QueryCtx | MutationCtx) {
	const identity = await ctx.auth.getUserIdentity();
	if (!identity) {
		throw new Error("Not authenticated");
	}
	return identity;
}

export async function requireCVOwnership(
	ctx: QueryCtx | MutationCtx,
	cvId: Id<"cvs">,
) {
	const identity = await requireAuth(ctx);
	const cv = await ctx.db.get(cvId);
	if (!cv) {
		throw new Error("CV not found");
	}
	if (cv.userId !== identity.subject) {
		throw new Error("Not authorized");
	}
	return { identity, cv };
}

export async function requireCoverLetterOwnership(
	ctx: QueryCtx | MutationCtx,
	coverLetterId: Id<"coverLetters">,
) {
	const identity = await requireAuth(ctx);
	const coverLetter = await ctx.db.get(coverLetterId);
	if (!coverLetter) {
		throw new Error("Cover letter not found");
	}
	if (coverLetter.userId !== identity.subject) {
		throw new Error("Not authorized");
	}
	return { identity, coverLetter };
}
