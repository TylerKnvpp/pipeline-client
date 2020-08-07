import AsyncStorage from "@react-native-community/async-storage";

const getAsyncData = async () => {
  try {
    const uid = await AsyncStorage.getItem("@uid");

    const token = await AsyncStorage.getItem("@token");

    const unParsed = await AsyncStorage.getItem("@userObject");

    const userObject = JSON.parse(unParsed);

    return { uid, token, userObject };
  } catch (err) {
    console.log(err);
  }
};

export { getAsyncData };
