import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
} from "react-native";

import SplashScreen from "./SplashScreen";

import { getPipelineWorkouts } from "../hooks/getPipelineWorkouts";
import { getPipelineResources } from "../hooks/getPipelineResources";

import { AuthContext } from "../Context/AuthContext";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

import { TextInputMask } from "react-native-masked-text";
import { postUserPST } from "../hooks/postUserPST";
import Results from "../Components/Results";

const Log = ({ navigation, SairaStencilOne_400Regular }) => {
  const [loading, setLoading] = React.useState(true);
  const [pipelineState, setPipelineState] = React.useState();
  const [workoutCollection, setWorkoutCollection] = React.useState([]);
  const [formData, setFormData] = React.useState({});
  const [resourceState, setResources] = React.useState([]);

  const [submitted, setSubmitted] = React.useState({
    successful: false,
    res: null,
    failedEvolutions: null,
    passedEvolutions: null,
    evolutions: null,
    pass: false,
  });

  let authContextData = React.useContext(AuthContext);
  const pid = authContextData.state.user.pipelineID._id;

  React.useEffect(() => {
    getPipelineWorkouts(pid).then((res) => {
      if (res.success && !workoutCollection.length) {
        setPipelineState(res.pipeline);

        let copy = [...res.records];

        let ordered = copy.sort((a, b) => a.order - b.order);

        setWorkoutCollection(ordered);

        setLoading(false);
      }
    });
  }, []);

  React.useEffect(() => {
    getPipelineResources(pid).then((res) => {
      if (res.resources && resourceState.length === 0) {
        setResources(res.resources);
      }
    });
  }, []);

  let workoutIDs = [];

  if (
    workoutCollection.length &&
    workoutIDs.length !== workoutCollection.length
  ) {
    workoutCollection.forEach((evo) => {
      workoutIDs = [...workoutIDs, evo._id];
    });
  }

  const handleSubmit = () => {
    const id = authContextData.state.user._id;

    let evolutions = [];
    const unitInsignia = authContextData.state.user.pipelineID.unitInsignia;
    const nickname = authContextData.state.user.pipelineID.nickname;

    if (workoutIDs) {
      workoutIDs.forEach((id) => {
        evolutions.push(formData[id]);
      });
      postUserPST(id, evolutions, unitInsignia, nickname).then((res) => {
        console.log(res);
        if (res.success) {
          setSubmitted({
            successful: true,
            res: res.pst,
            failedEvolutions: res.pst.failedUserEvolutions,
            passedEvolutions: res.pst.passedUserEvolutions,
            evolutions: res.pst.evolutions,
            pass: res.pst.pass,
          });
        }
      });
    }
  };

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <ScrollView style={styles.pageContainer}>
      <Image
        defaultSource={require("../assets/navy-seal-insignia.png")}
        onLoad={() => console.log("loaded")}
        onError={() => console.log("error loading")}
        style={styles.insignia}
        source={{ uri: pipelineState.unitInsignia }}
      />
      <Text style={styles.nickname}>{pipelineState.nickname}</Text>
      <Text style={styles.selectHeader}>PHYSICAL SCREENING TEST</Text>

      {!submitted.successful ? (
        <>
          {workoutCollection.map((evolution) => {
            return (
              <View key={evolution._id} style={styles.inputContainer}>
                {evolution.icon ? (
                  <Image source={{ uri: evolution.icon }} style={styles.icon} />
                ) : null}
                <Text style={styles.evolution}>{evolution.title}</Text>

                {evolution.type === "timed" ? (
                  <TextInputMask
                    type={"custom"}
                    options={{
                      mask: `99:99`,
                      getRawValue: function (value, settings) {
                        let splitAndJoined = value.split(":").join(".");
                        return splitAndJoined;
                      },
                    }}
                    style={styles.input}
                    value={
                      formData[evolution._id]
                        ? formData[evolution._id].userScore
                        : ""
                    }
                    placeholder="00:00"
                    keyboardType={"number-pad"}
                    onChangeText={(input) => {
                      let val = input.split(":").join(".");

                      setFormData({
                        ...formData,
                        [evolution._id]: {
                          userScore: val,
                          userID: authContextData.state.user._id,
                          pipelineWorkoutID: evolution._id,
                        },
                      });
                    }}
                  />
                ) : (
                  <TextInput
                    style={styles.input}
                    value={
                      formData[evolution._id] ? formData[evolution._id] : ""
                    }
                    keyboardType={"number-pad"}
                    placeholder={evolution.type === "timed" ? "00:00" : "00"}
                    onChangeText={(input) =>
                      setFormData({
                        ...formData,
                        [evolution._id]: {
                          userScore: parseInt(input),
                          userID: authContextData.state.user._id,
                          pipelineWorkoutID: evolution._id,
                        },
                      })
                    }
                  />
                )}
              </View>
            );
          })}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>SUBMIT</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Results
          evolutions={submitted.evolutions}
          workouts={workoutCollection}
          failedEvos={submitted.failedEvolutions}
          passedEvos={submitted.passedEvolutions}
          pstResults={submitted.resObj}
          pass={submitted.pass}
          SairaStencilOne_400Regular={SairaStencilOne_400Regular}
          resources={resourceState}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    marginRight: "auto",
    marginVertical: 20,
    marginLeft: "auto",
    marginBottom: 30,
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
  inputContainer: {
    height: Dimensions.get("screen").height * 0.27,
    marginBottom: 10,
  },
  inputTimeContainer: {
    height: Dimensions.get("screen").height * 0.4,
    marginBottom: 10,
  },
  input: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 18,
    fontWeight: "800",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    width: "40%",
    textAlign: "center",
  },
  evolution: {
    fontFamily: "SairaStencilOne_400Regular",
    fontSize: 24,
    textAlign: "center",
  },
  insignia: {
    marginTop: 20,
    height: 75,
    resizeMode: "contain",
  },
  selectHeader: {
    fontFamily: "SairaStencilOne_400Regular",
    fontSize: 18,
    marginVertical: 10,
    textAlign: "center",
  },
  nickname: {
    fontFamily: "SairaStencilOne_400Regular",
    fontSize: 32,
    marginVertical: 10,
    textAlign: "center",
  },
  icon: {
    height: 100,
    resizeMode: "contain",
  },
  pageContainer: {
    backgroundColor: "white",
  },
});

export default Log;
