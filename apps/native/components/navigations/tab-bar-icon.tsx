import type { IconProps } from "@expo/vector-icons/build/createIconSet";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";

export function TabBarIcon({
	style,
	...rest
}: IconProps<ComponentProps<typeof Ionicons>["name"]>) {
	return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}
