import { useQuery } from "@tanstack/react-query";

type Props = {
	query?: string;
	fetchMovies: (args: { query: string }) => Promise<any>;
};

export const useFetchMovies = ({ query, fetchMovies }: Props) => {
	const {
		data: movies,
		isPending,
		refetch,
	} = useQuery({
		queryKey: ["movies", query],
		queryFn: async () => {
			const data = await fetchMovies({ query: query || "" });

			if (!data) {
				throw new Error("Failed to fetch movies");
			}

			return data;
		},
	});

	return { movies, isPending, refetch };
};
