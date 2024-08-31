import { View, Text, Image } from "react-native";
import React from "react";

const MessageComponent = ({ item }) => {
  return (
    <View className="my-2">
      <View className={`flex ${item?.source == "from" ? "" : "items-end"}`}>
        <View className="flex flex-row items-center gap-1 mx-2">
          {item.type === "text" ? (
            <View
              className={`${
                item?.source == "from" ? "bg-slate-200" : "bg-green-200"
              } p-4 rounded-lg`}
            >
              <Text className="font-normal text-base">{item.text}</Text>
            </View>
          ) : item.type === "image" ? (
            <View
              className={`${
                item?.source == "from" ? "bg-slate-200" : "bg-green-200"
              } p-2 rounded-lg`}
            >
              <Image
                source={{ uri: `data:image/jpeg;base64,${item.image}` }}
                className="w-48 h-48 "
              />
            </View>
          ) : null}
        </View>
        <Text className={`${item?.source == "from" ? "ml-10" : "mr-5"} mt-1`}>
          {item.time}
        </Text>
      </View>
    </View>
  );
};

export default MessageComponent;
