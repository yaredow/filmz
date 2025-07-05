import { z } from "zod";

export const signInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8, "Password needs to be at least 8"),
});

export type SignInValues = z.infer<typeof signInSchema>;

export const signUpSchema = z
	.object({
		firstName: z
			.string()
			.min(2, "First name must be at least 2 characters")
			.max(50, "First name must be less than 50 characters"),
		lastName: z
			.string()
			.min(2, "Last name must be at least 2 characters")
			.max(50, "Last name must be less than 50 characters"),
		email: z.string().email("Please enter a valid email"),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.max(64, "Password must be less than 64 characters")
			.regex(/[a-z]/, "Password must contain a lowercase letter")
			.regex(/[A-Z]/, "Password must contain an uppercase letter")
			.regex(/[0-9]/, "Password must contain a number")
			.regex(/[^a-zA-Z0-9]/, "Password must contain a special character"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Passwords do not match",
	});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
