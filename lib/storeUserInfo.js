import AsyncStorage from "@react-native-async-storage/async-storage";

const storeUserInfo = async (email) => {
  try {
    await AsyncStorage.setItem("email", email);
  } catch (error) {
    console.log(error);
  }
};

export default storeUserInfo;
