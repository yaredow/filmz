import { Tabs } from "expo-router";
import type { ImageSourcePropType } from "react-native";
import { Image, ImageBackground, Text } from "react-native";
import { images } from "@/constants/images";

interface TabIconProps {
	focused: boolean;
	name: string;
	icon: ImageSourcePropType;
}

const TabIcon = ({ focused, name, icon }: TabIconProps) => {
	return (
		<ImageBackground
			source={images.highlight}
			className="mt-4 flex min-h-14 w-full min-w-[112px] flex-1 flex-row items-center justify-center overflow-hidden rounded-full"
		>
			<Image source={icon} tintColor="#151312" className="size-5" />
			<Text className="ml-2 font-semibold text-base text-red-500">{name}</Text>
		</ImageBackground>
	);
};

const _layout = () => {
	return (
		<Tabs>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} name="Home" icon={images.home} />
					),
				}}
			/>

			<Tabs.Screen
				name="search"
				options={{
					title: "Search",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} name="Search" icon={images.search} />
					),
				}}
			/>

			<Tabs.Screen
				name="saved"
				options={{
					title: "Saved",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} name="Saved" icon={images.saved} />
					),
				}}
			/>

			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} name="Profile" icon={images.profile} />
					),
				}}
			/>
		</Tabs>
	);
};

export default _layout;
