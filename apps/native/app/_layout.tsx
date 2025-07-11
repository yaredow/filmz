import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

import "../global.css";

const convex = new ConvexReactClient(
	process.env.EXPO_PUBLIC_CONVEX_URL as string,
);
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const queryClient = new QueryClient();

const tokenCache = {
	async getToken(key: string) {
		try {
			const item = await SecureStore.getItemAsync(key);
			if (item) {
				console.log(`${key} was used 🔐 \n`);
			} else {
				console.log("No values stored under key: " + key);
			}
			return item;
		} catch (error) {
			console.error("SecureStore get item error: ", error);
			await SecureStore.deleteItemAsync(key);
			return null;
		}
	},

	async saveToken(key: string, value: string) {
		try {
			return SecureStore.setItemAsync(key, value);
		} catch (error) {
			return;
		}
	},
};

export default function RootLayout() {
	const [loaded] = useFonts({
		spaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null; // or a loading spinner
	}

	return (
		<ClerkProvider
			publishableKey={CLERK_PUBLISHABLE_KEY}
			tokenCache={tokenCache}
		>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				<QueryClientProvider client={queryClient}>
					<Stack>
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
						<Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
						<Stack.Screen name="+not-found" />
					</Stack>
					<Toast position="top" />
				</QueryClientProvider>
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
}
