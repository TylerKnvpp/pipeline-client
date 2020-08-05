import React, { useEffect } from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

import {
  useFonts,
  SairaStencilOne_400Regular,
} from "@expo-google-fonts/saira-stencil-one";
import SignUpForm from "../Components/SignUpForm";

function SignUp({ navigation, setContainerState }) {
  let [fontsLoaded] = useFonts({
    SairaStencilOne_400Regular,
  });

  return (
    <SafeAreaView style={styles.container}>
      {!fontsLoaded ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text style={styles.headerText}>SIGN UP</Text>
          <SignUpForm
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

export default SignUp;