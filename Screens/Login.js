import React, { createContext, useEffect } from "react";
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

function Login({
  navigation,
  setContainerState,
  setLoginRef,
  setLoading,
  loggedInRef,
  SairaStencilOne_400Regular,
}) {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerText}>LOGIN</Text>

        <LoginForm
          loggedInRef={loggedInRef}
          setLoading={setLoading}
          setContainerState={setContainerState}
          navigation={navigation}
          SairaStencilOne_400Regular={SairaStencilOne_400Regular}
          setLoginRef={setLoginRef}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
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
