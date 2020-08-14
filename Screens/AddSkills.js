import React from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
import SkillSelector from "../Components/SkillsSelector";
import { TouchableOpacity } from "react-native-gesture-handler";

import { fetchUser } from "../hooks/getUserProfile";

import { postUserSkills } from "../hooks/postUserSkills";

import { AuthContext } from "../Context/AuthContext";

const AddSkills = ({ navigation, setContainerState }) => {
  const [selectedState, setSelectedState] = React.useState([]);
  const [uidState, setUID] = React.useState(null);

  let authContextData = React.useContext(AuthContext);

  const uid = authContextData ? authContextData.state.user._id : null;

  const handleSelect = (input) => {
    if (!selectedState.includes(input)) {
      setSelectedState([...selectedState, input]);
    }

    if (selectedState.includes(input)) {
      let copy = [...selectedState];
      let filtered = copy.filter((i) => i !== input);
      setSelectedState(filtered);
    }
  };

  const handleSave = () => {
    if (uid && selectedState.length > 0) {
      postUserSkills(uid, selectedState).then((res) => {
        console.log("response", res);
        setContainerState({
          id: res._id,
          loggedIn: true,
          user: res,
        });
      });

      if (authContextData.state.user.pipelineID == undefined) {
        navigation.navigate("Select Pipeline");
        return;
      }
      navigation.navigate("Profile");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.heroContainer}>
        <Text style={styles.instructions}>
          Please select the skills that apply to you. We will use these to match
          you with a pipeline.
        </Text>
        <Image
          style={styles.image}
          source={require("../assets/sf-soliders.jpeg")}
          defaultSource={require("../assets/sf-soliders.jpeg")}
          resizeMode={"contain"}
        />
      </View>

      <SkillSelector handleSelect={handleSelect} />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    paddingVertical: 15,
    marginVertical: 10,
    paddingHorizontal: 50,
  },
  buttonText: {
    color: "white",
    fontWeight: "900",
  },
  image: {
    marginTop: 0,
    height: 250,
    width: "100%",
  },
  instructions: {
    backgroundColor: "black",
    borderRadius: 10,
    color: "white",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 30,
    padding: 10,
    position: "absolute",
    opacity: 0.7,
    textAlign: "center",
    top: 100,
    left: 25,
    width: "90%",
    zIndex: 1,
  },
  heroContainer: {
    width: "100%",
  },
  container: {
    alignItems: "center",
    overflow: "hidden",
    minHeight: "100%",
    minWidth: "100%",
  },
});

export default AddSkills;
