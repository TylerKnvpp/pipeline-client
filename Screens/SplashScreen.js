/*This is an Example of React Native Rotate Image View Using Animation*/
import React, { useEffect } from "react";
//import react in our project

import { StyleSheet, View, Animated, Image, Easing } from "react-native";
////import all the components we needed

import { getAsyncData } from "../hooks/getAsyncData";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    StartImageRotateFunction();
    // getAsyncData().then((asyncData) => {
    //   if (asyncData.uid != null && asyncData.token != null) {
    //     navigation.navigate("Home");
    //   }
    //   navigation.navigate("Login");
    // });
  });

  const RotateValueHolder = new Animated.Value(0);

  function StartImageRotateFunction() {
    RotateValueHolder.setValue(0);

    Animated.timing(RotateValueHolder, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => StartImageRotateFunction());
  }

  const RotateData = RotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Image
        style={styles.innerEllipsis}
        source={require("../assets/inner_ellipsis.png")}
      />
      <Animated.Image
        style={{
          position: "absolute",
          height: 145,
          width: 145,
          transform: [{ rotate: RotateData }],
        }}
        source={require("../assets/outer_ellpisis.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  innerEllipsis: {
    height: 75,
    position: "relative",
    width: 75,
  },
});
