import { query } from "./_generated/server";

export const list = query({
	args: {},
	handler: async (ctx) => {
		const auth = await ctx.auth.getUserIdentity();

		return {
			email: auth?.email,
		};
	},
});
