import { View, Text, Pressable, Image } from "react-native";
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
    <View className="my-1">
      <Pressable
        className="flex flex-row items-center w-full py-2"
        onPress={handleNavigation}
      >
        <Image source={require("../assets/user.png")} className="w-20 h-20" />

        <View className="flex-1 flex-row justify-between ml-2">
          <View>
            <Text className="text-lg mb-1 font-bold">{item.name}</Text>

            <Text className="text-base text-gray-400">
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
