import { api } from "@filmz/backend/convex/_generated/api";
import { useQuery } from "convex/react";
import { useRouter } from "expo-router";
import { Image, ScrollView, View } from "react-native";
import SearchBar from "@/components/search-bar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

const index = () => {
	const router = useRouter();
	const movies = useQuery(api.movies.list, { query: "" });

	return (
		<View className="flex-1 bg-dark">
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
		</View>
	);
};

export default index;
