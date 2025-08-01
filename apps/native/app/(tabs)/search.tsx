import { api } from "@filmz/backend/convex/_generated/api";
import { useAction } from "convex/react";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Image,
	SafeAreaView,
	Text,
	View,
} from "react-native";
import MovieCard from "@/components/movie-card";
import SearchBar from "@/components/search-bar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useFetchMovies } from "@/hooks/use-fetch-movies";

const search = () => {
	const [searchQuery, setSearchQuery] = useState("");

	const fetchMovies = useAction(api.movies.list);
	const { movies, isPending, error, refetch } = useFetchMovies({
		fetchMovies,
		query: searchQuery,
	});

	useEffect(() => {
		const timeOutId = setTimeout(async () => {
			if (searchQuery.trim()) {
				await refetch();
			}
		}, 500);

		return () => clearTimeout(timeOutId);
	}, [searchQuery, refetch]);

	return (
		<SafeAreaView className="flex-1 bg-primary">
			<View className="flex-1">
				<Image
					source={images.bg}
					className="absolute z-0 h-full w-full"
					resizeMode="cover"
				/>

				<FlatList
					data={movies}
					renderItem={({ item }) => <MovieCard {...item} />}
					keyExtractor={(item) => item.id}
					className="px-5"
					numColumns={3}
					columnWrapperStyle={{
						justifyContent: "center",
						gap: 16,
						marginVertical: 16,
					}}
					contentContainerStyle={{ paddingBottom: 100 }}
					ListEmptyComponent={
						!isPending && !error ? (
							<View className="mt-10 px-5">
								<Text className="text-center text-gray-500">
									{searchQuery.trim() ? "No movies found" : "Search for movies"}
								</Text>
							</View>
						) : null
					}
					ListHeaderComponent={
						<>
							<View className="mt-10 w-full flex-row justify-center">
								<Image source={icons.logo} className="h-10 w-12" />
							</View>

							<View className="my-5">
								<SearchBar
									placeholder="Search movies...."
									value={searchQuery}
									onChangeText={(text: string) => setSearchQuery(text)}
								/>
							</View>

							{isPending && (
								<ActivityIndicator
									size="large"
									color="#0000ff"
									className="my-3"
								/>
							)}

							{error && (
								<Text className="my-3 px-5 text-red-500">
									Error: {error.message}
								</Text>
							)}

							{!isPending &&
								!error &&
								searchQuery.trim() &&
								movies?.length > 0 && (
									<Text className="px-5 font-bold text-gray-900 text-xl">
										Search result for{" "}
										<Text className="text-accent">{searchQuery}</Text>
									</Text>
								)}
						</>
					}
				/>
			</View>
		</SafeAreaView>
	);
};

export default search;
