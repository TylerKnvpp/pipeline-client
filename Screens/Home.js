import * as React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { getAsyncData } from "../hooks/getAsyncData";
import AsyncStorage from "@react-native-community/async-storage";

import { AuthContext } from "../Context/AuthContext";

const Home = (props) => {
  React.useEffect(() => {
    getAsyncData().then((asyncObject) => {
      console.log(asyncObject);
    });
  });

  const handleLogout = () => {
    AsyncStorage.clear();
    props.setContainerState({
      loggedIn: false,
      token: null,
      id: null,
    });
  };

  let contextData = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Logged in</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
