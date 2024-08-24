import AsyncStorage from "@react-native-async-storage/async-storage";

const deleteUserinfo = async () => {
  await AsyncStorage.removeItem("email");
};

export default deleteUserinfo;
