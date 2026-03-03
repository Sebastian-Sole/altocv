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
	cvId: string,
) {
	const identity = await requireAuth(ctx);
	const cv = await ctx.db.get(cvId as any);
	if (!cv) {
		throw new Error("CV not found");
	}
	if (cv.userId !== identity.subject) {
		throw new Error("Not authorized");
	}
	return { identity, cv };
}
