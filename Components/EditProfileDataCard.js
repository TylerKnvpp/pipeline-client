import React, { isValidElement } from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-community/picker";
import { states } from "../Constants/FormData";

import { checkUpdateProfile } from "../hooks/checkUpdateProfile";
import { postUpdateUserProfile } from "../hooks/postUpdateUserProfile";

const EditProfileDataCard = ({
  user,
  setContainerState,
  SairaStencilOne_400Regular,
  navigation,
}) => {
  const [show, toggleShow] = React.useState(false);
  const [allowSave, toggleSave] = React.useState(false);
  const [stateCheck, setCheck] = React.useState({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    state: user.state,
  });
  const [state, setState] = React.useState({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    state: user.state,
  });

  const handleSubmit = () => {
    const { isValid, error, newDataRequest } = checkUpdateProfile(
      stateCheck,
      state
    );

    if (error) {
      Alert.alert(error);
      return;
    }

    if (isValid) {
      postUpdateUserProfile(user._id, newDataRequest).then((res) => {
        if (res.success) {
          setContainerState({
            id: res.user._id,
            loggedIn: true,
            user: res.user,
          });
          navigation.navigate("Profile");
        }
        if (!res.success) {
          console.log(res.error);
          Alert(res.message);
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.infoTitle}>Username</Text>
          <TextInput
            autoCapitalize={"none"}
            style={styles.input}
            value={state.username}
            onChangeText={(input) => {
              setState({
                ...state,
                username: input,
              });
              toggleSave(true);
            }}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.infoTitle}>First Name</Text>
          <TextInput
            style={styles.input}
            value={state.firstName}
            onChangeText={(input) => {
              setState({
                ...state,
                firstName: input,
              });
              toggleSave(true);
            }}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.infoTitle}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={state.lastName}
            onChangeText={(input) => {
              setState({
                ...state,
                lastName: input,
              });
              toggleSave(true);
            }}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.infoTitle}>Email</Text>
          <TextInput
            style={styles.input}
            value={state.email}
            onChangeText={(input) => {
              setState({
                ...state,
                email: input,
              });
              toggleSave(true);
            }}
          />
        </View>

        <TouchableWithoutFeedback
          style={styles.textContainer}
          onPress={() => toggleShow(!show)}
        >
          <Text style={styles.infoTitle}>State</Text>
          {show ? (
            <Picker
              selectedValue={state.state}
              style={{ width: "100%" }}
              onValueChange={(itemValue, itemIndex) => {
                toggleSave(true);

                setState({ ...state, state: itemValue });
              }}
            >
              {states.map((stateName) => {
                return (
                  <Picker.Item
                    key={stateName}
                    style={styles.label}
                    label={stateName}
                    value={stateName}
                  />
                );
              })}
            </Picker>
          ) : (
            <Text style={styles.input}>{state.state}</Text>
          )}
        </TouchableWithoutFeedback>
      </View>

      <TouchableOpacity
        disabled={allowSave ? false : true}
        style={allowSave ? styles.buttonActive : styles.button}
        activeOpacity={0.8}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>SAVE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    textTransform: "uppercase",
  },
  input: {
    fontWeight: "700",
  },
  button: {
    backgroundColor: "grey",
    borderRadius: 10,
    marginRight: "auto",
    marginTop: 20,
    marginLeft: "auto",
    paddingHorizontal: 30,
    paddingVertical: 15,
    width: "80%",
  },
  buttonActive: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    marginRight: "auto",
    marginTop: 20,
    marginLeft: "auto",
    paddingHorizontal: 30,
    paddingVertical: 15,
    width: "80%",
  },
  buttonText: {
    color: "white",
    fontFamily: "SairaStencilOne_400Regular",
    fontSize: 18,
    textAlign: "center",
  },
  formContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
  },
  name: {
    fontSize: 18,
    lineHeight: 25,
    textAlign: "left",
  },
  state: {
    fontSize: 18,
    lineHeight: 25,
    textAlign: "left",
    textTransform: "uppercase",
  },
  inlineContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "left",
    width: "70%",
  },
  textContainer: {
    marginBottom: 10,
    borderBottomColor: "#8a8a8a",
    borderBottomWidth: 2,
  },
  container: {
    width: "90%",
  },
  accordionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    width: "100%",
  },
  durationContainer: {
    marginHorizontal: 20,
  },
  phaseTitle: {
    color: "#8a8a8a",
    fontSize: 22,
    textAlign: "left",
    fontWeight: "800",
  },
  infoTitle: {
    color: "#8a8a8a",
    fontFamily: "SairaStencilOne_400Regular",
    textAlign: "left",
    marginVertical: 10,
  },
  phaseDuration: {
    textAlign: "left",
  },
  duration: {
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default EditProfileDataCard;
