import * as React from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";

import { AuthContext } from "../Context/AuthContext";

import { getPipelines } from "../hooks/getPipelines";

import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";

const Profile = ({
  SairaStencilOne_400Regular,
  setContainerState,
  setUserStateData,
  logoutRef,
}) => {
  const [pipelines, setPipelines] = React.useState([]);

  let authContextData = React.useContext(AuthContext);

  const handleLogout = () => {
    AsyncStorage.clear();
    logoutRef();
    setContainerState({
      loggedIn: false,
      token: null,
      id: null,
    });
    setUserStateData({
      user: {},
      fetched: false,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Text>{authContextData.state.user.email}</Text>
        <Text>{authContextData.state.user.pipelineID.name}</Text>
        <Text style={styles.selectHeader}>Logout</Text>
      </TouchableOpacity>
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

export default Profile;
