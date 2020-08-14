import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const ProfileUserDataCard = ({
  user,
  SairaStencilOne_400Regular,
  navigation,
}) => {
  const [show, toggleShow] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.accordion}>
        <View style={styles.textContainer}>
          <Text style={styles.infoTitle}>Name</Text>
          <Text style={styles.name}>
            {user.firstName} {user.lastName}
          </Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.infoTitle}>Email</Text>
          <Text style={styles.name}>{user.email}</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.infoTitle}>State</Text>
          <Text style={styles.state}>{user.state}</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.infoTitle}>Pipeline</Text>
          <Text style={styles.pipeline}>
            {user.pipelineID != undefined ? user.pipelineID.nickname : ""}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Edit Profile")}
      >
        <Text style={styles.buttonText}>EDIT PROFILE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pipeline: {
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
  buttonText: {
    color: "white",
    fontFamily: "SairaStencilOne_400Regular",
    fontSize: 18,
    textAlign: "center",
  },
  accordion: {
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

export default ProfileUserDataCard;
