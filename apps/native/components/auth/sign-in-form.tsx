import { useSignIn } from "@clerk/clerk-expo";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { cn } from "@/lib/utils";
import { signInSchema } from "@/schemas/auth.schema";

const SignInForm = () => {
	const { signIn, setActive, isLoaded } = useSignIn();
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onChange: signInSchema,
		},
		onSubmit: async ({ value }) => {
			console.log(value);

			if (!isLoaded) return;

			try {
				const signInAttempt = await signIn?.create({
					identifier: value.email,
					password: value.password,
				});

				console.log(signInAttempt);

				if (signInAttempt?.status === "complete") {
					await setActive({ session: signInAttempt.createdSessionId });
					router.replace("/");
				} else {
					Toast.show({
						type: "error",
						text1: "Sign in failed",
						text2: JSON.stringify(signInAttempt, null, 2),
						position: "top",
					});
				}
			} catch (error) {
				console.error(JSON.stringify(error, null, 2));
			}
		},
	});

	return (
		<View className="flex-1 items-center justify-center px-4">
			<form.Field name="email">
				{(field) => (
					<>
						<Text>Email:</Text>
						<TextInput
							value={field.state.value}
							onChangeText={field.handleChange}
							autoCapitalize="none"
							keyboardType="email-address"
							className="mb-2 w-64 rounded border border-gray-300 p-2"
						/>
						{!field.state.meta.isValid && (
							<Text className="text-red-500">
								{field.state.meta.errors
									.map((err) => (typeof err === "string" ? err : err?.message))
									.join(", ")}
							</Text>
						)}
					</>
				)}
			</form.Field>

			<form.Field name="password">
				{(field) => (
					<>
						<Text className="text-start">Password:</Text>
						<TextInput
							value={field.state.value}
							onChangeText={field.handleChange}
							autoCapitalize="none"
							keyboardType="visible-password"
							className="mb-2 w-64 rounded border border-gray-300 p-2"
						/>
						{!field.state.meta.isValid && (
							<Text className="text-red-500">
								{field.state.meta.errors
									.map((err) => (typeof err === "string" ? err : err?.message))
									.join(", ")}
							</Text>
						)}
					</>
				)}
			</form.Field>

			<form.Subscribe
				selector={(state) => [state.canSubmit, state.isSubmitting]}
			>
				{([canSubmit, isSubmitting]) => (
					<TouchableOpacity
						className={cn(
							"items-center rounded-lg bg-blue-500 px-4 py-3",
							(!canSubmit || isSubmitting) && "bg-gray-400",
						)}
						onPress={() => form.handleSubmit()}
						disabled={!canSubmit || isSubmitting}
					>
						<Text className="font-semibold text-white">
							{isSubmitting ? "Signing In..." : "Sign In"}
						</Text>
					</TouchableOpacity>
				)}
			</form.Subscribe>
		</View>
	);
};

export default SignInForm;
