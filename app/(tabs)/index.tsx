import { View, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className="text-red-500">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum quo ad
        quis laboriosam magnam nulla delectus minus voluptatibus, iste nisi ut
        veritatis consequuntur similique magni temporibus pariatur numquam
        quaerat sequi!
      </Text>
      <StatusBar barStyle="default" />
    </SafeAreaView>
  );
}
