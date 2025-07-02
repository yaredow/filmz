import { v } from "convex/values";
import { query } from "./_generated/server";
import { TMDB_CONFIG } from "./constants";

export const movies = query({
	args: { query: v.string() },
	handler: async (_, args) => {
		const endpoint = args.query
			? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(args.query)}`
			: `${TMDB_CONFIG.BASE_URL}/discover/movies?sort_by=popularity.desc`;

		const response = await fetch(endpoint, {
			method: "GET",
			headers: TMDB_CONFIG.headers,
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch movies: ${response.statusText}`);
		}

		const data = await response.json();
		return data.results;
	},
});
