import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigations/tab-bar-icon";

export default function AuthRoutesLayout() {
	const { isSignedIn } = useAuth();

	if (isSignedIn) {
		return <Redirect href={"/"} />;
	}

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="sign-in"
				options={{
					title: "Sign In",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "person" : "person-outline"}
							color={color}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="sign-up"
				options={{
					title: "Sign Up",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "person-add" : "person-add-outline"}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
