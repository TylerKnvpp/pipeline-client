import React from "react";
import { Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const CustomButton = ({ buttonText, bgColorProp }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const bgColor = {
  primary: "blue",
  dange: "red",
  neutral: "grey",
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#25aae1",
    color: "white",
    fontWeight: "900",
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  buttonText: {},
});

export default CustomButton;
