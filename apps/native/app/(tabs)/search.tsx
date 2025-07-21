import { api } from "@filmz/backend/convex/_generated/api";
import { useAction } from "convex/react";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import MovieCard from "@/components/movie-card";
import { images } from "@/constants/images";
import { useFetchMovies } from "@/hooks/use-fetch-movies";

const search = () => {
	const router = useRouter();
	const fetchMovies = useAction(api.movies.list);
	const { movies, isPending, error, refetch } = useFetchMovies({
		fetchMovies,
		query: "",
	});

	if (isPending) {
		return <ActivityIndicator size="large" color="#0000ff" />;
	}

	return (
		<View className="flex-1 bg-primary">
			<Image
				source={images.bg}
				className="absolute z-0 w-full flex-1"
				resizeMode="cover"
			/>

			<FlatList
				data={movies}
				renderItem={({ item }) => <MovieCard {...item} />}
				keyExtractor={(item) => item.id}
				className="px-5"
				numColumns={3}
			/>
		</View>
	);
};

export default search;
