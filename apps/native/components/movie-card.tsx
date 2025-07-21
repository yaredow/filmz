import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "@/constants/icons";

const MovieCard = ({
	id,
	poster_path,
	title,
	vote_average,
	release_date,
}: Movie) => {
	return (
		<Link href={`/movies/${id}`} asChild>
			<TouchableOpacity className="w-[30%]">
				<Image
					source={{
						uri: poster_path
							? `https://image.tmdb.org/t/p/w500${poster_path}`
							: "https://placehold.co/600x400/1a1a1a/ffffff.png",
					}}
					className="h-52 w-full rounded-lg"
					resizeMode="cover"
				/>
				<Text className="font-bold text-gray-900 text-sm" numberOfLines={1}>
					{title}
				</Text>
				<View className="flex-row items-center justify-start gap-x-1">
					<Image source={icons.star} className="size-4" />
					<Text className="font-bold text-gray-900 text-xs uppercase">
						{Math.round(vote_average / 2)}
					</Text>
				</View>
				<View className="flex-row items-center justify-between">
					<Text className="mt-1 font-medium text-gray-300 text-xs">
						{release_date?.split("-")[0] || "N/A"}
					</Text>
					{/* <Text className='text-xs font-medium text-gray-300 uppercase'>Movie</Text> */}
				</View>
			</TouchableOpacity>
		</Link>
	);
};

export default MovieCard;
