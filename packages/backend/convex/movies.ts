import { v } from "convex/values";

import { action } from "./_generated/server";
import { TMDB_CONFIG } from "./constants";

export const list = action({
	args: { query: v.string() },
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();

		if (!user) {
			return new Error(
				"User not authenticated. Please sign in to access this feature.",
			);
		}

		const endpoint = args.query
			? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(args.query)}`
			: `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

		const response = await fetch(endpoint, {
			method: "GET",
			headers: TMDB_CONFIG.headers,
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch movies: ${response.statusText}`);
		}

		const data = await response.json();

		if (!data || !data.results) {
			throw new Error("No movies found or invalid response format.");
		}

		return data.results;
	},
});
