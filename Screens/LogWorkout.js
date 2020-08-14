import * as React from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";

import { AuthContext } from "../Context/AuthContext";

import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import { getPipelineWorkouts } from "../hooks/getPipelineWorkouts";
import SplashScreen from "./SplashScreen";

import PSTCard from "../Components/PSTCard";

const LogWorkout = ({ setContainerState, setUserStateData, navigation }) => {
  const [pipelineState, setPipelineState] = React.useState();
  const [workoutCollection, setWorkoutCollection] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  let authContextData = React.useContext(AuthContext);
  const pid = authContextData.state.user.pipelineID._id;

  React.useEffect(() => {
    getPipelineWorkouts(pid).then((res) => {
      if (res.success && !workoutCollection.length) {
        setPipelineState(res.pipeline);

        // if (res.records[0].order != undefined) {
        let copy = [...res.records];

        let ordered = copy.sort((a, b) => a.order - b.order);

        setWorkoutCollection(ordered);
        // } else {
        //   setWorkoutCollection(res.records);
        // }

        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flex: 0 }}>
      <View>
        <Image
          defaultSource={require("../assets/navy-seal-insignia.png")}
          onLoad={() => console.log("loaded")}
          onError={() => console.log("error loading")}
          style={styles.insignia}
          source={{ uri: pipelineState.unitInsignia }}
        />
        <Text style={styles.nickname}>{pipelineState.nickname}</Text>
        <Text style={styles.selectHeader}>PHYSICAL SCREENING TEST</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("New PST")}
        >
          <Text style={styles.buttonText}>LOG NEW PST</Text>
        </TouchableOpacity>
      </View>

      {workoutCollection.map((workout) => {
        return <PSTCard workout={workout} key={workout._id} />;
      })}
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default LogWorkout;
