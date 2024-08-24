import { View, Text, Pressable, TextInput, FlatList } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MessageComponent from "../../components/MessageComponent";

const Message = ({ route }) => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const { name, id } = route.params;
  let chats = [
    {
      id: "1",
      source: "from",
      text: "Hey Jhon, how's it going?",
      time: "09:15",
      user: "Bob",
    },
    {
      id: "2",
      source: "to",
      text: "All good, Bob! How about you?",
      time: "09:16",
      user: "Jhon",
    },
    {
      id: "3",
      source: "from",
      text: "I'm doing well, just finished some work.",
      time: "09:18",
      user: "Bob",
    },
    {
      id: "4",
      source: "to",
      text: "Nice! What project are you working on?",
      time: "09:19",
      user: "Jhon",
    },
    {
      id: "5",
      source: "from",
      text: "It's a new app for managing tasks. Pretty exciting!",
      time: "09:21",
      user: "Bob",
    },
    {
      id: "6",
      source: "to",
      text: "Sounds interesting. Need any help?",
      time: "09:22",
      user: "Jhon",
    },
    {
      id: "7",
      source: "from",
      text: "Maybe later, I'll keep you posted.",
      time: "09:24",
      user: "Bob",
    },
    {
      id: "8",
      source: "to",
      text: "Sure, just let me know!",
      time: "09:25",
      user: "Jhon",
    },
    {
      id: "9",
      source: "from",
      text: "Will do. By the way, have you seen the latest episode?",
      time: "09:27",
      user: "Bob",
    },
    {
      id: "10",
      source: "to",
      text: "Not yet! No spoilers please 😅",
      time: "09:28",
      user: "Jhon",
    },
    {
      id: "11",
      source: "from",
      text: "Haha, don't worry! Just wanted to say it's amazing.",
      time: "09:30",
      user: "Bob",
    },
    {
      id: "12",
      source: "to",
      text: "Now I'm even more excited to watch it!",
      time: "09:31",
      user: "Jhon",
    },
    {
      id: "13",
      source: "from",
      text: "You should! It's worth the time.",
      time: "09:33",
      user: "Bob",
    },
    {
      id: "14",
      source: "to",
      text: "Will do tonight!",
      time: "09:34",
      user: "Jhon",
    },
    {
      id: "15",
      source: "from",
      text: "Great! Let me know your thoughts.",
      time: "09:36",
      user: "Bob",
    },
    {
      id: "16",
      source: "to",
      text: "Definitely. What else is new with you?",
      time: "09:37",
      user: "Jhon",
    },
    {
      id: "17",
      source: "from",
      text: "Not much, just trying to stay productive.",
      time: "09:39",
      user: "Bob",
    },
    {
      id: "18",
      source: "to",
      text: "Same here. Trying to balance work and personal stuff.",
      time: "09:40",
      user: "Jhon",
    },
    {
      id: "19",
      source: "from",
      text: "It’s tough but doable! Keep pushing.",
      time: "09:42",
      user: "Bob",
    },
    {
      id: "20",
      source: "to",
      text: "Thanks, Bob. You too!",
      time: "09:43",
      user: "Jhon",
    },
    {
      id: "21",
      source: "from",
      text: "Any weekend plans?",
      time: "09:45",
      user: "Bob",
    },
    {
      id: "22",
      source: "to",
      text: "Just chilling at home. You?",
      time: "09:46",
      user: "Jhon",
    },
    {
      id: "23",
      source: "from",
      text: "Might go hiking if the weather's good.",
      time: "09:48",
      user: "Bob",
    },
    {
      id: "24",
      source: "to",
      text: "That sounds fun! Enjoy the outdoors.",
      time: "09:49",
      user: "Jhon",
    },
    {
      id: "25",
      source: "from",
      text: "Thanks! Maybe you can join next time.",
      time: "09:51",
      user: "Bob",
    },
    {
      id: "26",
      source: "to",
      text: "I'd love to! Let's plan something.",
      time: "09:52",
      user: "Jhon",
    },
    {
      id: "27",
      source: "from",
      text: "For sure. Let’s catch up later.",
      time: "09:54",
      user: "Bob",
    },
    {
      id: "28",
      source: "to",
      text: "Alright, talk soon!",
      time: "09:55",
      user: "Jhon",
    },
    {
      id: "29",
      source: "from",
      text: "See ya!",
      time: "09:57",
      user: "Bob",
    },
    {
      id: "30",
      source: "to",
      text: "Bye!",
      time: "09:58",
      user: "Jhon",
    },
  ];
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const handleSendBtn = () => {
    console.log("clicked");

    chats = [
      ...chats,
      {
        id: 31,
        source: "to",
        text: message,
        time: getCurrentTime(),
        user: "Jhon",
      },
    ];
  };
  return (
    <View className="flex-1">
      <View className="py-5 px-4 bg-green-200 rounded-b-2xl mb-4">
        <View className="flex flex-row items-center justify-between">
          <Ionicons
            name="person-circle-outline"
            size={45}
            color="black"
            className="mr-4"
          />
          <Text className="text-xl font-semibold">{name}</Text>
        </View>
      </View>
      <View className="flex-1">
        {chats ? (
          <FlatList
            data={chats}
            renderItem={({ item }) => (
              <MessageComponent item={item} user={user} />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          ""
        )}
      </View>
      <View className="flex justify-center w-full px-2 mb-5 my-4">
        <View className="flex flex-row items-center">
          <TextInput
            className="flex-1 py-2 px-4 text-lg font-normal mr-2 rounded-xl border border-gray-400"
            onChangeText={(value) => setMessage(value)}
          />

          <Ionicons
            name="send"
            size={35}
            color="#4ade80"
            onPress={handleSendBtn}
          />
        </View>
      </View>
    </View>
  );
};

export default Message;
