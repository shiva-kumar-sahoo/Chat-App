import { View, Text, Pressable, TextInput, FlatList } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MessageComponent from "../../components/MessageComponent";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Message = ({ route }) => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const { name, id } = route.params;

  const { userInfo, socket } = useContext(AuthContext);
  const [chatMessages, setChatMessages] = useState([]);
  const flatListRef = useRef(null);

  const getContactChat = async (id) => {
    const contactList = await AsyncStorage.getItem("myContactList");
    const parseChats = JSON.parse(contactList);
    setUserEmail(parseChats[id - 1].email);
    const userChat = parseChats[id - 1]?.messages;
    setChatMessages(userChat);
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const handleSendBtn = async () => {
    const newMessage = {
      id: `${Date.now()}-${chatMessages.length + 1}`,
      source: "to",
      text: message,
      time: getCurrentTime(),
      user: "John",
    };

    const updatedMessages = [...chatMessages, newMessage];

    socket.emit("send-message", {
      from: userInfo,
      to: userEmail,
      message: message,
    });

    setChatMessages(updatedMessages);
    await updateContactChatInStorage(id, updatedMessages);

    setMessage("");
    autoScrollToEnd();
  };

  const updateContactChatInStorage = async (id, updatedMessages) => {
    try {
      const contactList = await AsyncStorage.getItem("myContactList");
      const parsedChats = JSON.parse(contactList);

      parsedChats[id - 1].messages = updatedMessages;

      await AsyncStorage.setItem("myContactList", JSON.stringify(parsedChats));
    } catch (error) {
      console.error("Failed to update chat messages in storage:", error);
    }
  };

  const autoScrollToEnd = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };
  const handleReceiveMessage = async (incomingMessage) => {
    const newMessage = {
      id: `${Date.now()}-${chatMessages.length + 1}`,
      source: "from",
      text: incomingMessage.message,
      time: getCurrentTime(),
      user: incomingMessage.from,
    };

    const updatedMessages = [...chatMessages, newMessage];
    setChatMessages(updatedMessages);

    await updateContactChatInStorage(id, updatedMessages);

    autoScrollToEnd();
  };
  useEffect(() => {
    getContactChat(id);

    if (!socket) return;
    socket.on("received-message", handleReceiveMessage);

    return () => {
      socket.off("received-message", handleReceiveMessage);
    };
  }, [socket]);
  return (
    <View className="flex-1">
      <View className="py-5 px-4 bg-green-200 rounded-b-2xl mb-4">
        <View className="flex flex-row items-center justify-between">
          <Ionicons
            name="person-circle-outline"
            size={45}
            color="grey"
            className="mr-4"
          />
          <Text className="text-xl font-semibold">{name}</Text>
        </View>
      </View>
      <View className="flex-1">
        {chatMessages && chatMessages.length > 0 ? (
          <FlatList
            data={chatMessages}
            renderItem={({ item }) => (
              <MessageComponent item={item} user={user} />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ref={flatListRef}
            onContentSizeChange={() => {
              autoScrollToEnd();
            }}
          />
        ) : (
          <View className="flex items-center mt-10">
            <Text>No Messages</Text>
          </View>
        )}
      </View>
      <View className="flex justify-center w-full px-2 mb-5 my-4">
        <View className="flex flex-row items-center">
          <TextInput
            className="flex-1 py-2 px-4 text-lg font-normal mr-2 rounded-xl border border-gray-400"
            onChangeText={(value) => setMessage(value)}
            value={message}
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
