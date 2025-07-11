import { v } from "convex/values";
import { action, query } from "./_generated/server";
import { TMDB_CONFIG } from "./constants";

export const list = action({
	args: { query: v.string() },
	handler: async (ctx, args) => {
		const user = ctx.auth.getUserIdentity;

		if (!user) {
			throw new Error("Unauthorized: User must be logged in to fetch movies.");
		}

		const endpoint = args.query
			? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(args.query)}`
			: `${TMDB_CONFIG.BASE_URL}/discover/movies?sort_by=popularity.desc`;

		const response = await fetch(endpoint, {
			method: "GET",
			headers: TMDB_CONFIG.headers,
		});

		console.log(response);

		if (!response.ok) {
			// @ts-ignore
			throw new Error("Failed to fetch movies", response.statusText);
		}

		const data = await response.json();
		return data.results;
	},
});
