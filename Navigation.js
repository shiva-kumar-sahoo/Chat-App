import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/chat/Home";
import Signup from "./screens/auth/Signup";
import Login from "./screens/auth/Login";
import { AuthContext } from "./context/AuthContext";

const ChatStack = createStackNavigator();

const HomeStack = () => {
  <ChatStack.Navigator>
    <ChatStack.Screen name="Home" component={Home} />
  </ChatStack.Navigator>;
};

const AuthStack = createStackNavigator();
const AuthScreenStack = () => {
  <AuthStack.Navigator>
    <AuthStack.Screen name="Signup" component={Signup} />
    <AuthStack.Screen name="Login" component={Login} />
  </AuthStack.Navigator>;
};

const AuthCheck = () => {
  const { isLoading, userToken } = useContext(AuthContext);
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={60} color="#3b82f6" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {userToken != null ? <HomeStack /> : <AuthScreenStack />}
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
