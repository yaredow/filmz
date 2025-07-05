import { useSignUp } from "@clerk/clerk-expo";
import { useForm } from "@tanstack/react-form";
import { Button, Text, TextInput, View } from "react-native";
import { signUpSchema } from "@/schemas/auth.schema";

const SignUpForm = () => {
	const { isLoaded, signUp } = useSignUp();

	const form = useForm({
		defaultValues: {
			firstName: "",
			lastName: "",
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
					firstName: value.firstName,
					lastName: value.lastName,
				});

				await signUp.prepareEmailAddressVerification({
					strategy: "email_code",
				});
			} catch (error) {
				console.error(JSON.stringify(error, null, 2));
			}
		},
	});

	return (
		<View className="flex-1 items-center justify-center px-4">
			<form.Field name="firstName">
				{(field) => (
					<>
						<Text>First Name:</Text>
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

			<form.Field name="lastName">
				{(field) => (
					<>
						<Text>First Name:</Text>
						<TextInput
							value={field.state.value}
							onChangeText={field.handleChange}
							autoCapitalize="none"
							keyboardType="default"
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

			<form.Field name="email">
				{(field) => (
					<>
						<Text>First Name:</Text>
						<TextInput
							value={field.state.value}
							onChangeText={field.handleChange}
							autoCapitalize="none"
							keyboardType="default"
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
					<Button
						title={isSubmitting ? "Signing In..." : "Sign In"}
						onPress={() => form.handleSubmit()}
						disabled={!canSubmit || isSubmitting}
					/>
				)}
			</form.Subscribe>
		</View>
	);
};

export default SignUpForm;
