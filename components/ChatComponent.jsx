import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const ChatComponent = ({ item }) => {
  const [messages, setMessages] = useState({});
  const navigation = useNavigation();

  useLayoutEffect(() => {
    setMessages(item?.messages[item?.messages?.length - 1]);
  }, []);
  const handleNavigation = () => {
    navigation.navigate("Message", {
      id: item.id,
      name: item.name,
    });
  };
  return (
    <View className="my-4">
      <Pressable
        className="flex flex-row items-center w-full py-4"
        onPress={handleNavigation}
      >
        <Ionicons
          name="person-circle-outline"
          size={45}
          color="black"
          className="mr-4"
        />

        <View className="flex-1 flex-row justify-between ml-2">
          <View>
            <Text className="text-lg mb-1 font-bold">{item.name}</Text>

            <Text className="text-base">
              {messages?.text ? messages.text : "Tap to start chatting"}
            </Text>
          </View>

          <View>
            <Text>{messages?.time ? messages.time : "now"}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default ChatComponent;
