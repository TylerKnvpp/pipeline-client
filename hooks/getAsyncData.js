import AsyncStorage from "@react-native-community/async-storage";

const getAsyncData = async () => {
  try {
    const uid = await AsyncStorage.getItem("@uid");

    const token = await AsyncStorage.getItem("@token");

    return { uid, token };
  } catch (err) {
    console.log(err);
  }
};

export { getAsyncData };
