import { io } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef } from "react";

const useSocket = () => {
  const socketRef = useRef(null);

  const initializeSocket = async () => {
    const storedUserEmail = await AsyncStorage.getItem("email");

    if (storedUserEmail && !socketRef.current) {
      const userInfo = {
        email: storedUserEmail,
      };

      const newSocket = io("http://192.168.1.70:8000", { query: userInfo });

      // Handle connection errors or retries if needed
      newSocket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      socketRef.current = newSocket;
    }
  };

  useEffect(() => {
    if (!socketRef.current) {
      console.log("Initializing socket connection...");

      initializeSocket();
    }

    return () => {
      if (socketRef.current) {
        console.log("Disconnecting socket...");

        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return socketRef.current;
};

export default useSocket;
