import { View, Text, Modal, Pressable, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddChat = ({ getAllChatContactData }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [addUserName, setAddUserName] = useState("");
  const [addUserEmail, setAddUserEmail] = useState("");

  const handleAddBtn = async () => {
    if (!addUserName || !addUserEmail) {
      Alert.alert("Please fill in both fields");
      return;
    }
    try {
      const contactList = await AsyncStorage.getItem("myContactList");
      const contacts = contactList ? JSON.parse(contactList) : [];
      if (contacts.some((contact) => contact.email === addUserEmail)) {
        Alert.alert("Email already exists in the contact list");
        return;
      }

      // Add the new contact with name and email to the contact list
      contacts.push({
        id: contacts.length + 1,
        name: addUserName,
        email: addUserEmail,
        messages: [],
      });
      // Save the updated contact list back to AsyncStorage
      await AsyncStorage.setItem("myContactList", JSON.stringify(contacts));
      getAllChatContactData();
      console.log("Contact added successfully:", addUserName, addUserEmail);
    } catch (error) {
      Alert.alert(error);
    }
  };
  return (
    <View className="">
      <View className="flex-1 justify-center items-center ">
        <Pressable
          className="rounded-full bg-green-500 p-5 shadow-lg"
          onPress={() => {
            setShowAddModal(true);
          }}
        >
          <FontAwesome6 name="plus" size={24} color="white" />
        </Pressable>

        <Modal
          transparent
          visible={showAddModal}
          onRequestClose={() => {
            setShowAddModal(false);
          }}
        >
          <View
            className="flex-1 justify-center items-center px-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <View className="w-full bg-white rounded-lg p-6 shadow-lg">
              <Text className="text-lg font-semibold mb-4">
                Enter User Details
              </Text>

              <TextInput
                className="w-full border-2 border-gray-300 rounded-lg text-black text-lg p-4 mb-4"
                value={addUserName}
                onChangeText={setAddUserName}
                placeholder="User Name"
                autoFocus={true}
                req
              />

              <TextInput
                className="w-full border-2 border-gray-300 rounded-lg text-black text-lg p-4 mb-4"
                value={addUserEmail}
                onChangeText={setAddUserEmail}
                placeholder="User Email"
                keyboardType="email-address"
              />

              <View className="flex-row justify-end space-x-4">
                <Pressable
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                  onPress={() => {
                    setShowAddModal(false);
                    setAddUserName("");
                    setAddUserEmail("");
                  }}
                >
                  <Text className="text-black text-lg">Cancel</Text>
                </Pressable>
                <Pressable
                  className="px-4 py-2 bg-green-500 rounded-lg"
                  onPress={() => {
                    setShowAddModal(false);
                    setAddUserName("");
                    setAddUserEmail("");
                    handleAddBtn();
                  }}
                >
                  <Text className="text-white text-lg">Add</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default AddChat;
