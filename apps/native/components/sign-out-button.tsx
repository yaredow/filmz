import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export const SignOutButton = () => {
	const { signOut } = useClerk();
	const router = useRouter();

	const handleSignOut = async () => {
		console.log("Signed out button pressed");

		try {
			await signOut();
			router.replace("/(auth)/sign-in");
		} catch (err) {
			console.error(JSON.stringify(err, null, 2));
		}
	};

	return (
		<TouchableOpacity
			onPress={handleSignOut}
			className="mx-auto mb-2 rounded-md bg-blue-400 px-4 py-2"
		>
			<Text>Sign out</Text>
		</TouchableOpacity>
	);
};
