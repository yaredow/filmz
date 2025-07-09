import { useClerk } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export const SignOutButton = () => {
	const { signOut } = useClerk();
	const router = useRouter();

	const handleSignOut = async () => {
		try {
			await signOut();
			Linking.openURL(Linking.createURL("/"));
			router.replace("/(auth)/sign-in");
		} catch (err) {
			console.error(JSON.stringify(err, null, 2));
		}
	};

	return (
		<TouchableOpacity
			onPress={handleSignOut}
			className="mx-auto bg-blue-400 px-4 py-2"
		>
			<Text>Sign out</Text>
		</TouchableOpacity>
	);
};
