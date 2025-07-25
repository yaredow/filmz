import { useForm } from "@tanstack/react-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { cn } from "@/lib/utils";
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
						{!field.state.meta.isValid && (
							<Text className="text-red-500">
								{field.state.meta.errors
									.map((error) =>
										typeof error === "string" ? error : error?.message,
									)
									.join(", ")}
							</Text>
						)}
					</>
				)}
			</form.Field>

			<form.Subscribe
				selector={(state) => [state.canSubmit, state.isSubmitting]}
			>
				<TouchableOpacity
					className={cn("items-center rounded-lg bg-blue-500 px-4 py-3")}
				>
					<Text className="text-white">
						{form.state.isSubmitting ? "Submitting..." : "Submit"}
					</Text>
				</TouchableOpacity>
			</form.Subscribe>
		</View>
	);
};

export default ForgetPasswordForm;
