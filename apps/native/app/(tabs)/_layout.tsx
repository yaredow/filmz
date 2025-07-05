import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Tabs } from "expo-router";
import type { ImageSourcePropType } from "react-native";
import { Image, ImageBackground, Text, View } from "react-native";
import { images } from "@/constants/images";

interface TabIconProps {
	focused: boolean;
	name: string;
	icon: ImageSourcePropType;
}

const TabIcon = ({ focused, name, icon }: TabIconProps) => {
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

const _layout = () => {
	const { isSignedIn } = useAuth();

	if (!isSignedIn) {
		return <Redirect href="/(auth)/sign-in" />;
	}

	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarItemStyle: {
					width: "100%",
					height: "100%",
					justifyContent: "center",
					alignItems: "center",
				},
				tabBarStyle: {
					backgroundColor: "#0f0d23",
					borderRadius: 50,
					marginHorizontal: 20,
					marginBottom: 36,
					height: 52,
					position: "absolute",
					overflow: "hidden",
					borderWidth: 1,
					borderColor: "0f0d23",
				},
			}}
		>
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
