import { Image, ImageBackground, Text, View } from "react-native";
import { images } from "@/constants/images";

export const TabIcon = ({ focused, name, icon }: TabIconProps) => {
	if (focused) {
		return (
			<ImageBackground
				source={images.highlight}
				className="mt-4 flex min-h-16 w-full min-w-[112px] flex-1 flex-row items-center justify-center overflow-hidden rounded-full"
			>
				<Image source={icon} tintColor="#151312" className="size-5" />
				<Text className="ml-2 font-semibold text-base text-dark">{name}</Text>
			</ImageBackground>
		);
	}

	return (
		<View className="mt-4 size-full items-center justify-center rounded-full">
			<Image source={icon} tintColor="#a8b5db" className="size-5" />
		</View>
	);
};
