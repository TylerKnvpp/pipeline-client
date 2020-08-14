import React, { useState, useEffect } from "react";
import {
  Alert,
  Text,
  Button,
  Image,
  TextInput,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import AsyncStorage from "@react-native-community/async-storage";

import { signUpValidator } from "../hooks/AuthValidator";

function SignUpForm({
  navigation,
  SairaStencilOne_400Regular,
  setContainerState,
  setLoading,
  setLoginRef,
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const inputRef = React.useRef();

  const handleSignUp = async () => {
    const { isValid, error, fieldError } = signUpValidator(formData);

    if (error) {
      Alert.alert(error);
      return;
    }

    if (isValid) {
      try {
        const url = "http://localhost:4000/auth/sign-up";
        const data = { email: formData.email, password: formData.password };

        const config = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };

        const req = await fetch(url, config);

        if (req.ok) {
          const res = await req.json();

          if (!res.success) {
            Alert.alert(res.error);
            return;
          }

          if (res.success) {
            AsyncStorage.setItem("@uid", res.id);
            AsyncStorage.setItem("@token", res.token);
            const stringified = JSON.stringify(res.user);
            AsyncStorage.setItem("@userObject", stringified);
            setContainerState({
              loggedIn: true,
              id: res.user._id,
              token: res.user.token,
              user: res.user,
            });
            setLoginRef(true);
            setLoading(true);
          }
        } else {
          const resErr = await req.json();
          Alert.alert(`${resErr.error}`);
        }
      } catch (err) {
        if (err) console.log(err);
      }
    }
  };

  return (
    <SafeAreaView style={styles.formContainer}>
      <Image
        source={require("../assets/pipelinex100px.png")}
        style={styles.logo}
      />
      <Text style={styles.formInstructions}>
        Please enter a valid email address and password.
      </Text>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Email:"
          onChangeText={(e) => {
            setFormData({ ...formData, email: e });
            inputRef.current = "email";
          }}
          autoCapitalize={"none"}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Password:"
          onChangeText={(e) => {
            setFormData({ ...formData, password: e });
            inputRef.current = "password";
          }}
          autoCapitalize={"none"}
          secureTextEntry
          textContentType="newPassword"
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Re-enter Password:"
          onChangeText={(e) => {
            setFormData({ ...formData, password2: e });
            inputRef.current = "password2";
          }}
          autoCapitalize={"none"}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Button
          style={styles.signUpButton}
          title="or Login"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </SafeAreaView>
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
    paddingVertical: 60,
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

export default SignUpForm;
