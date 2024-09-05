import React, { useContext, useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { userSignup } = useContext(AuthContext);

  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (email && password) {
      await userSignup(email);
    } else {
      Alert.alert("All field is required.");
    }
  };
  return (
    <View className="flex items-center justify-center bg-[#EEF1FF] p-3 w-full h-full">
      <Text className="mb-10 text-xl font-bold text-center">Sign Up</Text>
      <View className="w-full ml-10">
        <View className="p-4 gap-4">
          <Text className="text-green-500 text-lg font-semibold">
            Your Email
          </Text>
          <TextInput
            autoCorrect={false}
            placeholder="Enter your email"
            onChangeText={(value) => setEmail(value)}
            className="border rounded-lg py-2 px-4 w-4/5 text-base"
          />
        </View>
        <View className="p-4 gap-4">
          <Text className="text-green-500 text-lg font-semibold">
            Your Password
          </Text>
          <TextInput
            autoCorrect={false}
            placeholder="Enter your password"
            onChangeText={(value) => setPassword(value)}
            className="border rounded-lg py-2 px-4 w-4/5 text-base"
          />
        </View>
      </View>
      <Pressable
        onPress={handleSignUp}
        className="bg-green-500 p-2 my-5 w-2/3 rounded-lg flex items-center"
      >
        <Text className="text-white text-lg font-semibold">Sign Up</Text>
      </Pressable>
      <View className="flex flex-row">
        <Text className="font-semibold text-base text-slate-400">
          Already have an account ?{" "}
        </Text>
        <Text
          className="font-semibold text-base text-green-400"
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          Login
        </Text>
      </View>
    </View>
  );
};

export default Signup;
