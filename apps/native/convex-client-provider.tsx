"use client";

import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

interface Props {
	children: React.ReactNode;
}

const convex = new ConvexReactClient(
	process.env.EXPO_PUBLIC_CONVEX_URL as string,
);

export default function ConvexClientProvider({ children }: Props) {
	return (
		<ClerkProvider
			publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
			tokenCache={tokenCache}
		>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				{children}
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
}
