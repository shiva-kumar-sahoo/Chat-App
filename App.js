import "react-native-gesture-handler";
import Navigation from "./Navigation";
import { View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 mt-5 pt-2">
      <Navigation />
    </View>
  );
}
