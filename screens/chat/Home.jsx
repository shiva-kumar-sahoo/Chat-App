import { View, Text, Pressable, FlatList } from "react-native";
import React, { useContext, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";
import ChatComponent from "../../components/ChatComponent";

const Home = () => {
  const { userLogout } = useContext(AuthContext);
  const rooms = [
    {
      id: "1",
      name: "Novu Hangouts",
      messages: [
        {
          id: "1a",
          text: "Hello guys, welcome!",
          time: "07:50",
          user: "Tomer",
        },

        {
          id: "1b",
          text: "Hi Tomer, thank you! 😇",
          time: "08:50",
          user: "David",
        },
      ],
    },

    {
      id: "2",
      name: "Hacksquad Team 1",
      messages: [
        {
          id: "2a",
          text: "Guys, who's awake? 🙏🏽",
          time: "12:50",
          user: "Team Leader",
        },

        {
          id: "2b",
          text: "What's up? 🧑🏻‍💻",
          time: "03:50",
          user: "Victoria",
        },
      ],
    },
  ];

  return (
    <View className="">
      <View className="fixed h-24 border-slate-200 rounded-b-lg">
        <View className="bg-[#F7F7F7] flex flex-row items-center justify-between px-5 w-full h-full">
          <View>
            <Text className="font-bold text-2xl text-green-500">
              Secure-Chat
            </Text>
          </View>
          <Pressable onPress={() => console.log("Button Pressed!")}>
            <Feather name="edit" size={24} color="green" />
          </Pressable>
        </View>
      </View>
      <View className="px-2">
        {rooms.length > 0 ? (
          <FlatList
            data={rooms}
            renderItem={({ item }) => <ChatComponent item={item} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View className="w-full h-4/5 flex items-center justify-center">
            <Text className="font-semibold text-lg pb-5">
              No rooms created!
            </Text>

            <Text>Click the icon above to create a Chat room</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Home;
