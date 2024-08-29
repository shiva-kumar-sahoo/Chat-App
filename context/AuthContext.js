import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const socket = useSocket();

  const userLogin = async (email) => {
    try {
      await AsyncStorage.setItem("email", email);
      setUserInfo(email);
    } catch (error) {
      console.log(error);
    }
  };

  const userLogout = async () => {
    await AsyncStorage.removeItem("email");
    setUserInfo(null);
  };

  const isLoggedIn = async () => {
    setIsLoading(true);
    try {
      const storedUserEmail = await AsyncStorage.getItem("email");
      setUserInfo(storedUserEmail);
    } catch (error) {
      console.log("Token check failed", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        userLogin,
        userLogout,
        socket,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
