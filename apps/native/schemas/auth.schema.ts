import { z } from "zod";

export const signInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8, "Password needs to be at least 8"),
});

export type SignInValues = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
	email: z.string().email("Please enter a valid email"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.max(64, "Password must be less than 64 characters")
		.regex(/[a-z]/, "Password must contain a lowercase letter")
		.regex(/[A-Z]/, "Password must contain an uppercase letter")
		.regex(/[0-9]/, "Password must contain a number")
		.regex(/[^a-zA-Z0-9]/, "Password must contain a special character"),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
