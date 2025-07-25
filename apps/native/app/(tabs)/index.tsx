import { api } from "@filmz/backend/convex/_generated/api";
import { useAction } from "convex/react";
import {
	ActivityIndicator,
	FlatList,
	Image,
	ScrollView,
	Text,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieCard from "@/components/movie-card";
import SearchBar from "@/components/search-bar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useFetchMovies } from "@/hooks/use-fetch-movies";

const index = () => {
	const fetchMovies = useAction(api.movies.list);
	const { movies, isPending, error } = useFetchMovies({
		fetchMovies,
		query: "",
	});

	return (
		<SafeAreaView className="flex-1 bg-primary">
			<Image source={images.bg} className="absolute w-full" />

			<ScrollView
				className="flex-1 px-5"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
			>
				<Image source={icons.logo} className="mx-auto mt-20 mb-5 h-10 w-12" />

				{isPending ? (
					<ActivityIndicator size="large" color="#0000ff" />
				) : error ? (
					<Text>Error: {error.message}</Text>
				) : (
					<View className="mt-5 flex-1">
						<SearchBar onPress={() => {}} placeholder="Search for movies" />
						<>
							<Text className="mt-5 mb-3 font-bold text-gray-900 text-lg">
								Latest Movies
							</Text>
							<FlatList
								data={movies}
								renderItem={({ item }) => <MovieCard {...item} />}
								keyExtractor={(item) => item.id}
								numColumns={3}
								columnWrapperStyle={{
									justifyContent: "flex-start",
									gap: 20,
									paddingRight: 5,
									marginBottom: 10,
								}}
								className="mt-2 pb-32"
								scrollEnabled={false}
							/>
						</>
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

export default index;
