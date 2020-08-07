import * as React from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";

import { AuthContext } from "../Context/AuthContext";

import { fetchUser } from "../hooks/getUserProfile";
import AsyncStorage from "@react-native-community/async-storage";

const Home = ({ setContainerState, setUserStateData }) => {
  const [pipelines, setPipelines] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);

  let authContextData = React.useContext(AuthContext);

  const fetchRef = React.useRef(false);

  const handleLogout = () => {
    AsyncStorage.clear();
    setContainerState({
      loggedIn: false,
      token: null,
      id: null,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.selectHeader}>
        Lets fucking go {authContextData.state.user.email}
      </Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  selectHeader: {
    fontFamily: "SairaStencilOne_400Regular",
    fontSize: 18,
    paddingTop: 80,
    marginBottom: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    minHeight: "100%",
    minWidth: "100%",
  },
});

export default Home;
