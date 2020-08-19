import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  Button,
  Image,
  KeyboardAvoidingView,
  TextInput,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useLogin } from "../hooks/login";

import AsyncStorage from "@react-native-community/async-storage";

function LoginForm({
  navigation,
  SairaStencilOne_400Regular,
  setContainerState,
  loggedInRef,
}) {
  const [loading, toggleLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const url = "http://localhost:4000/auth/login";

      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      const req = await fetch(url, config);

      if (req.ok) {
        const res = await req.json();

        if (res.success) {
          loggedInRef.current = true;
          AsyncStorage.setItem("@uid", res.id);
          AsyncStorage.setItem("@token", res.token);
          const stringified = JSON.stringify(res.user);
          AsyncStorage.setItem("@userObject", stringified);

          setContainerState({
            loggedIn: true,
            id: res.user.id,
            token: res.token,
            user: res.user,
          });
        }
      } else {
        const resErr = await req.json();
        Alert.alert(`${resErr.error}`);
      }
    } catch (err) {
      if (err) console.log(err);
    }
  };

  return (
    <View style={styles.formContainer}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Image
          source={require("../assets/pipelinex100px.png")}
          style={styles.logo}
        />
      </TouchableWithoutFeedback>

      <Text style={styles.formInstructions}>
        Please enter your email and password.
      </Text>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Email:"
          onChangeText={(e) => setFormData({ ...formData, email: e })}
          autoCapitalize={"none"}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Password:"
          onChangeText={(e) => setFormData({ ...formData, password: e })}
          autoCapitalize={"none"}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Button
          style={styles.signUpButton}
          title="or Sign Up"
          onPress={() => navigation.navigate("SignUp")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    flex: 1,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    paddingVertical: 90,
    width: "90%",
  },
  buttonContainer: {
    height: "25%",
    justifyContent: "space-between",
    padding: 10,
  },
  logo: {
    height: 100,
    marginBottom: 30,
  },
  formInstructions: {
    fontFamily: "SairaStencilOne_400Regular",
    marginBottom: 20,
    width: "60%",
    textAlign: "center",
  },
  inputGroup: {
    flex: 2,
    flexDirection: "column",
    fontSize: 18,
    width: "70%",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    borderStyle: "solid",
    fontSize: 16,
    paddingVertical: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 5,
    shadowColor: "#444444",
    shadowOpacity: 0.6,
    shadowOffset: {
      height: 100,
      width: 10,
    },
    marginTop: 0,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: "white",
    fontFamily: "SairaStencilOne_400Regular",
    fontWeight: "900",
    fontSize: 16,
  },
  signUpButton: {
    margin: 10,
  },
});

export default LoginForm;
