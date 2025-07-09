import { useSignUp } from "@clerk/clerk-expo";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { cn } from "@/lib/utils";
import { signUpSchema, verifyEmailFormSchema } from "@/schemas/auth.schema";

const SignUpForm = () => {
	const [isPendingVerification, setPendingVerification] = useState(false);

	const { isLoaded, signUp, setActive } = useSignUp();
	const router = useRouter();

	const signUpform = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onChange: signUpSchema,
		},
		onSubmit: async ({ value }) => {
			if (!isLoaded) return;

			try {
				await signUp.create({
					emailAddress: value.email,
					password: value.password,
				});

				await signUp.prepareEmailAddressVerification({
					strategy: "email_code",
				});

				setPendingVerification(true);
			} catch (err: any) {
				console.error(JSON.stringify(err, null, 2));
				Toast.show({
					type: "error",
					text1: "Sign up failed",
					text2: err.errors?.[0]?.message || "An unknown error occurred.",
					position: "top",
				});
			}
		},
	});

	const verifyEmailForm = useForm({
		defaultValues: {
			code: "",
		},
		validators: {
			onChange: verifyEmailFormSchema,
		},
		onSubmit: async ({ value }) => {
			if (!isLoaded) return;

			try {
				const signUpAttempt = await signUp.attemptEmailAddressVerification({
					code: value.code,
				});

				if (signUpAttempt.status === "complete") {
					await setActive({ session: signUpAttempt.createdSessionId });
					router.replace("/");
				} else {
					console.error(JSON.stringify(signUpAttempt, null, 2));
				}
			} catch (err: any) {
				console.error(JSON.stringify(err, null, 2));
				Toast.show({
					type: "error",
					text1: "Verification failed",
					text2: err.errors?.[0]?.message || "An unknown error occurred.",
					position: "top",
				});
			}
		},
	});

	if (isPendingVerification) {
		return (
			<View className="flex-1 items-center justify-center px-4">
				<verifyEmailForm.Field name="code">
					{(field) => (
						<>
							<Text>Code: </Text>
							<TextInput
								value={field.state.value}
								onChangeText={field.handleChange}
								autoCapitalize="none"
								keyboardType="default"
								className="mb-2 w-64 rounded border border-gray-300 p-2"
							/>
						</>
					)}
				</verifyEmailForm.Field>

				<verifyEmailForm.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
				>
					{([canSubmit, isSubmitting]) => (
						<TouchableOpacity
							className={cn(
								"items-center rounded-lg bg-blue-500 px-4 py-3",
								(!canSubmit || isSubmitting) && "bg-gray-400",
							)}
							onPress={verifyEmailForm.handleSubmit}
							disabled={!canSubmit || isSubmitting}
						>
							<Text className="font-semibold text-white">
								{isSubmitting ? "Verifying..." : "Verify"}
							</Text>
						</TouchableOpacity>
					)}
				</verifyEmailForm.Subscribe>
			</View>
		);
	}

	return (
		<View className="flex-1 items-center justify-center px-4">
			<signUpform.Field name="email">
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
			</signUpform.Field>

			<signUpform.Field name="password">
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
			</signUpform.Field>

			<signUpform.Subscribe
				selector={(state) => [state.canSubmit, state.isSubmitting]}
			>
				{([canSubmit, isSubmitting]) => (
					<TouchableOpacity
						className={cn(
							"items-center rounded-lg bg-blue-500 px-4 py-3",
							(!canSubmit || isSubmitting) && "bg-gray-400",
						)}
						onPress={signUpform.handleSubmit}
						disabled={!canSubmit || isSubmitting}
					>
						<Text className="font-semibold text-white">
							{isSubmitting ? "Signing Up..." : "Sign Up"}
						</Text>
					</TouchableOpacity>
				)}
			</signUpform.Subscribe>
		</View>
	);
};

export default SignUpForm;
