import React, { createContext } from "react";
import LoginForm from "../Components/LoginForm";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import {
  useFonts,
  SairaStencilOne_400Regular,
} from "@expo-google-fonts/saira-stencil-one";

import { AuthContext } from "../Context/AuthContext";

import AsyncStorage from "@react-native-community/async-storage";

function Login({ navigation, setContainerState }) {
  let [fontsLoaded] = useFonts({
    SairaStencilOne_400Regular,
  });

  let contextData = React.useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      {!fontsLoaded ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text style={styles.headerText}>LOGIN</Text>

          <LoginForm
            setContainerState={setContainerState}
            navigation={navigation}
            SairaStencilOne_400Regular={SairaStencilOne_400Regular}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "black",
    height: "100%",
    justifyContent: "space-around",

    marginTop: "auto",
    paddingBottom: 100,
  },
  headerText: {
    fontSize: 48,
    color: "white",
    fontWeight: "900",
    fontFamily: "SairaStencilOne_400Regular",
  },
});

export default Login;
