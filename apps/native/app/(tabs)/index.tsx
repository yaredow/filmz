import { api } from "@filmz/backend/convex/_generated/api";
import { useAction } from "convex/react";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "@/components/search-bar";
import { SignOutButton } from "@/components/sign-out-button";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useFetchMovies } from "@/hooks/use-fetch-movies";

const index = () => {
	const router = useRouter();
	const fetchMovies = useAction(api.movies.list);
	const { movies, isPending } = useFetchMovies({
		fetchMovies,
		query: "Dark",
	});

	if (isPending) {
		return (
			<SafeAreaView className="flex-1 bg-dark py-5">
				<Text className="text-center text-black">Loading...</Text>
			</SafeAreaView>
		);
	}

	console.log("Movies fetched:", movies);

	return (
		<SafeAreaView className="flex-1 bg-dark py-5">
			<SignOutButton />
			<Image source={images.bg} className="absolute z-0 w-full" />
			<ScrollView
				className="flex-1 px-5"
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					minHeight: "100%",
					paddingBottom: 10,
				}}
			>
				<Image source={icons.logo} className="mx-auto mt-20 mb-5 h-10 w-12" />

				<View className="mt-5 flex-1">
					<SearchBar
						onPress={() => router.push("/search")}
						placeholder="Search for a movie"
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default index;
