import { View, Text, Pressable, FlatList, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";
import ChatComponent from "../../components/ChatComponent";
import AddChat from "../../components/AddChat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useSocket from "../../hooks/useSocket";

const Home = () => {
  const { userLogout } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);
  const [chatContactListData, setChatContactListData] = useState(null);
  const socket = useSocket();
  const getAllChatContactData = async () => {
    const chatContactList = await AsyncStorage.getItem("myContactList");
    const parseContactList = JSON.parse(chatContactList);
    setChatContactListData(parseContactList);
  };
  const handleOnRefresh = async () => {
    setRefreshing(true);
    getAllChatContactData();
    setRefreshing(false);
  };
  useEffect(() => {
    getAllChatContactData();
  }, []);
  return (
    <View className="flex-1">
      <View className="fixed h-24 border-slate-200 rounded-b-lg">
        <View className="bg-[#F7F7F7] flex flex-row items-center justify-between px-5 w-full h-full">
          <View>
            <Text className="font-bold text-2xl text-green-500">
              SecureChat
            </Text>
          </View>
          <Feather
            name="search"
            size={28}
            color="black"
            onPress={() => {
              Alert.alert("search");
            }}
          />
        </View>
      </View>
      <View className="px-2">
        {chatContactListData && chatContactListData.length > 0 ? (
          <FlatList
            data={chatContactListData}
            renderItem={({ item }) => <ChatComponent item={item} />}
            keyExtractor={(item) => item.id}
            refreshing={refreshing}
            onRefresh={handleOnRefresh}
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
      <View className="w-full absolute bottom-20 left-24">
        <AddChat getAllChatContactData={getAllChatContactData} />
      </View>
    </View>
  );
};

export default Home;
