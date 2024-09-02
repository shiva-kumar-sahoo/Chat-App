import {
  View,
  Text,
  TextInput,
  FlatList,
  ToastAndroid,
  Image,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Ionicons, Feather } from "@expo/vector-icons";
import MessageComponent from "../../components/MessageComponent";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import useSocket from "../../hooks/useSocket";
import { useNavigation } from "@react-navigation/native";

const Message = ({ route }) => {
  const [message, setMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const { name, id } = route.params;
  const { userInfo } = useContext(AuthContext);
  const [chatMessages, setChatMessages] = useState([]);
  const flatListRef = useRef(null);
  const socket = useSocket();
  const navigation = useNavigation();

  const getContactChat = async (id) => {
    try {
      const contactList = await AsyncStorage.getItem("myContactList");
      const parsedChats = JSON.parse(contactList);
      const selectedChat = parsedChats[id - 1];
      setUserEmail(selectedChat.email);
      const userChat = selectedChat?.messages || [];
      setChatMessages(userChat);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const updateContactChatInStorage = async (id, newMessage) => {
    try {
      const contactList = await AsyncStorage.getItem("myContactList");
      const parsedChats = JSON.parse(contactList);

      // Append the new message to the existing messages array
      parsedChats[id - 1].messages.push(newMessage);

      // Save updated chats back to AsyncStorage
      await AsyncStorage.setItem("myContactList", JSON.stringify(parsedChats));
    } catch (error) {
      console.error("Failed to update chat messages in storage:", error);
    }
  };

  const handleSendBtn = async () => {
    if (!message.trim()) return;

    const newMessage = {
      id: `${Date.now()}-${chatMessages.length + 1}`,
      source: "to",
      text: message,
      time: getCurrentTime(),
      user: name,
      type: "text",
    };
    socket.emit("send-message", {
      from: userInfo,
      to: userEmail,
      message: newMessage,
    });

    await updateContactChatInStorage(id, newMessage);
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);

    setMessage("");
    autoScrollToEnd();
  };

  const handleReceiveMessage = async (incomingMessage) => {
    const newMessage = {
      id: `${Date.now()}-${chatMessages.length + 1}`,
      source: "from",
      text: incomingMessage.message.text || "",
      image: incomingMessage.message.image || null,
      time: getCurrentTime(),
      user: incomingMessage.from,
      type: incomingMessage.message.type,
    };

    setChatMessages((prevMessages) => [...prevMessages, newMessage]);

    await updateContactChatInStorage(id, newMessage);

    autoScrollToEnd();
  };

  const autoScrollToEnd = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };
  const handleCameraBtn = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });
    if (!result.canceled) {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 800 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );

      const base64Image = await FileSystem.readAsStringAsync(
        manipulatedImage.uri,
        {
          encoding: FileSystem.EncodingType.Base64,
        }
      );

      const newMessage = {
        id: `${Date.now()}-${chatMessages.length + 1}`,
        source: "to",
        image: base64Image,
        time: getCurrentTime(),
        user: name,
        type: "image",
      };

      await socket.emit("send-message", {
        from: userInfo,
        to: userEmail,
        message: newMessage,
      });

      await updateContactChatInStorage(id, newMessage);
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);

      autoScrollToEnd();
    } else {
      ToastAndroid.show("Image Not Captured", ToastAndroid.SHORT);
    }
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
      <View className="py-2 px-4">
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-x-1">
            <Ionicons
              name="arrow-back"
              size={24}
              color="black"
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Home" }],
                });
              }}
            />
            <Image
              source={require("../../assets/user.png")}
              className="w-20 h-20"
            />
            <View>
              <Text className="text-xl font-semibold">{name}</Text>
              <Text className="text-sm text-gray-400">Active now</Text>
            </View>
          </View>
          <View className="flex-1 flex-row justify-end gap-x-4">
            <Feather
              name="phone"
              size={24}
              color="black"
              onPress={() => {
                Alert.alert("Phone Call", "Feature will implement soon");
              }}
            />
            <Feather
              name="video"
              size={24}
              color="black"
              onPress={() => {
                Alert.alert("Video Call", "Feature will implement soon");
              }}
            />
          </View>
        </View>
      </View>
      <View className="flex-1">
        {chatMessages && chatMessages.length > 0 ? (
          <FlatList
            data={chatMessages}
            renderItem={({ item }) => (
              <MessageComponent item={item} user={userInfo} />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ref={flatListRef}
            onContentSizeChange={autoScrollToEnd}
          />
        ) : (
          <View className="flex items-center mt-10">
            <Text>No Messages</Text>
          </View>
        )}
      </View>
      <View className="flex justify-center w-full px-2 mb-5 my-4">
        <View className="flex flex-row items-center justify-between">
          <TextInput
            className="flex-1 py-2 px-4 text-lg font-normal mr-2 rounded-xl border border-gray-400"
            onChangeText={(value) => setMessage(value)}
            value={message}
          />
          <View className="flex flex-row items-center justify-between gap-x-4">
            <Feather
              name="camera"
              size={28}
              color="grey"
              onPress={handleCameraBtn}
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
    </View>
  );
};

export default Message;
