import { useForm } from "@tanstack/react-form";
import { Text, TextInput, View } from "react-native";
import { forgetPasswordSchema } from "@/schemas/auth.schema";

const ForgetPasswordForm = () => {
	const form = useForm({
		defaultValues: {
			email: "",
		},
		validators: {
			onChange: forgetPasswordSchema,
		},
		onSubmit: async ({ value }) => {
			console.log(value);
		},
	});

	return (
		<View className="flex-1 items-center justify-center">
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
						{!field.state.meta.isValid && <Text />}
					</>
				)}
			</form.Field>
		</View>
	);
};
