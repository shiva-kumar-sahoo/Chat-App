import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/chat/Home";
import Signup from "./screens/auth/Signup";
import Login from "./screens/auth/Login";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import { ActivityIndicator, View } from "react-native";
import Message from "./screens/chat/Message";

const ChatStack = createStackNavigator();

const HomeStack = () => {
  return (
    <ChatStack.Navigator screenOptions={{ headerShown: false }}>
      <ChatStack.Screen name="Home" component={Home} />
      <ChatStack.Screen name="Message" component={Message} />
    </ChatStack.Navigator>
  );
};

const AuthStack = createStackNavigator();
const AuthScreenStack = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Signup" component={Signup} />
    </AuthStack.Navigator>
  );
};

const AuthCheck = () => {
  const { isLoading, userInfo } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={60} color="#3b82f6" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {userInfo ? <HomeStack /> : <AuthScreenStack />}
    </NavigationContainer>
  );
};

const Navigation = () => {
  return (
    <AuthProvider>
      <AuthCheck />
    </AuthProvider>
  );
};

export default Navigation;
