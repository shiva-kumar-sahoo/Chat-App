import openSocket from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  const initializeSocket = async () => {
    const storedUserEmail = await AsyncStorage.getItem("email");

    if (storedUserEmail) {
      const userInfo = {
        email: storedUserEmail,
      };

      const newSocket = openSocket("http://192.168.1.68:8000", {
        query: userInfo,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      // Handle connection errors or retries if needed
      newSocket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      // Handle successful connection
      newSocket.on("connect", () => {
        console.log("Socket connected:", newSocket.id);
        setSocket(newSocket); // Update the state with the new socket
      });

      // Handle disconnection
      newSocket.on("disconnect", () => {
        console.log("Socket disconnected");
        setSocket(null);
      });
    }
  };

  useEffect(() => {
    if (!socket) {
      console.log("Initializing socket connection...");
      initializeSocket();
    }

    return () => {
      if (socket) {
        console.log("Disconnecting socket...");
        socket.disconnect();
        setSocket(null);
      }
    };
  }, [socket]);

  return socket;
};

export default useSocket;
