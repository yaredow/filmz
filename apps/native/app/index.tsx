import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-5xl text-dark-200">Welcome!</Text>
      <Text className="text-5xl justify-center items-center">
        <Link href="/onboarding">Onboarding</Link>
      </Text>
    </View>
  );
}
