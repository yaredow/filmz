export const TMDB_CONFIG = {
	BASE_URL: "https://api.themoviedb.org/3",
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
	},
};
