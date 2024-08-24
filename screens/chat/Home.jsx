import { View, Text } from "react-native";
import React, { useContext } from "react";
import deleteUserinfo from "../../lib/deleteUserInfo";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const { userLogout } = useContext(AuthContext);
  return (
    <View>
      <Text>Home</Text>
      <Text
        onPress={async () => {
          await userLogout();
        }}
      >
        Logout
      </Text>
    </View>
  );
};

export default Home;
