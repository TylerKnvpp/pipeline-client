import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
} from "react-native";

import PostScroller from "./PostScroller";

const ResultsFailScroller = ({
  evolutions,
  workouts,
  failedEvos,
  resources,
}) => {
  let passedUserEvolutions = [
    {
      userEvolution: 90,
      workout: {
        __v: 0,
        _id: "5f162dd5aeff3c843432b1d0",
        description:
          "Timed event. Perform maximum amount of push-ups in 2 minutes.",
        equipment: "none",
        icon:
          "https://onea-profile-pictures.s3.us-east-2.amazonaws.com/push-ups.gif",
        minumumScore: 54,
        optimumScore: 75,
        order: 2,
        pipelineID: [],
        timeLimit: "2",
        title: "Push-ups",
        type: "reps",
      },
    },
    {
      userEvolution: 86,
      workout: {
        __v: 0,
        _id: "5f1a517a84dd363dda522d98",
        description:
          "Timed event. Perform maximum amount of sit-ups in 2 minutes.",
        equipment: "none",
        icon:
          "https://onea-profile-pictures.s3.us-east-2.amazonaws.com/sit-ups.gif",
        minumumScore: 50,
        optimumScore: 75,
        order: 3,
        pipelineID: [],
        timeLimit: "2:00",
        title: "Curl-up",
        type: "reps",
      },
    },
    {
      userEvolution: 20,
      workout: {
        __v: 0,
        _id: "5f1a519784dd363dda522d99",
        description:
          "Timed event. Perform maximum amount of pull-ups in 2 minutes.",
        equipment: "Pull Up Bar",
        icon:
          "https://onea-profile-pictures.s3.us-east-2.amazonaws.com/pull-ups.gif",
        minumumScore: 10,
        optimumScore: 15,
        order: 4,
        pipelineID: [],
        timeLimit: "2:00",
        title: "Pull-up",
        type: "reps",
      },
    },
  ];

  let failedEvolutions = [
    {
      userEvolution: "13.00",
      workout: {
        __v: 0,
        _id: "5f1a50fa84dd363dda522d97",
        description:
          "Timed event. Swim 500 yards in 12 minutes and 30 seconds or less.",
        equipment: "pool",
        icon:
          "https://onea-profile-pictures.s3.us-east-2.amazonaws.com/swim.gif",
        minumumScore: 12.3,
        optimumScore: 9.3,
        order: 1,
        pipelineID: [],
        timeLimit: "Unlimited",
        title: "500 yard swim",
        type: "timed",
      },
    },
    {
      userEvolution: "12.00",
      workout: {
        __v: 0,
        _id: "5f1a50c784dd363dda522d96",
        description:
          "Timed event. Run 1.5 miles in 10 minutes and 30 seconds or less.",
        equipment: "none",
        icon:
          "https://onea-profile-pictures.s3.us-east-2.amazonaws.com/run.gif",
        minumumScore: 10.3,
        optimumScore: 9.3,
        order: 5,
        pipelineID: [],
        timeLimit: "10:30",
        title: "1.5 Mile Run",
        type: "timed",
      },
    },
  ];

  return (
    <ScrollView>
      <Text style={styles.header}>FAILED EVOLUTIONS</Text>

      {failedEvolutions.map((evo) => {
        return (
          <View key={evo.workout._id} style={styles.failedBox}>
            <Image style={styles.icon} source={{ uri: evo.workout.icon }} />
            <Text style={styles.failedEvoHeader}>{evo.workout.title}</Text>

            <View style={styles.scoresContainer}>
              <View>
                <Text style={styles.failedScore}>{evo.userEvolution}</Text>
                <Text>Your Score</Text>
              </View>

              <View>
                <Text style={styles.minScore}>{evo.workout.minumumScore}</Text>
                <Text>Minimum Score</Text>
              </View>
            </View>
          </View>
        );
      })}

      <Text style={styles.header}>PASSED EVOLUTIONS</Text>
      {passedUserEvolutions.map((evo) => {
        return (
          <View key={evo.workout._id} style={styles.passedBox}>
            <Image style={styles.icon} source={{ uri: evo.workout.icon }} />
            <Text style={styles.passedEvoHeader}>{evo.workout.title}</Text>

            <View style={styles.scoresContainer}>
              <View>
                <Text style={styles.userScore}>{evo.userEvolution}</Text>
                <Text>Your Score</Text>
              </View>

              <View>
                <Text style={styles.minScore}>{evo.workout.optimumScore}</Text>
                <Text>Optimum Score</Text>
              </View>
            </View>
          </View>
        );
      })}

      <PostScroller resources={resources} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    color: "#444444",
    fontSize: 24,
    fontFamily: "SairaStencilOne_400Regular",
    marginTop: 10,
    marginLeft: 20,
  },
  scoreBoxUser: {
    height: "90%",
  },
  userScoreContainer: {
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#8a8a8a",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.7,
    borderWidth: 5,
    borderColor: "green",
    borderRadius: 5,
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 10,
    justifyContent: "space-between",
    padding: 20,
    textAlign: "center",
    width: Dimensions.get("screen").width * 0.9,
  },
  minScore: {
    color: "#444444",
    fontFamily: "SairaStencilOne_400Regular",
    fontWeight: "800",
    fontSize: 20,
    textAlign: "center",
  },
  userScore: {
    color: "green",
    fontFamily: "SairaStencilOne_400Regular",
    fontWeight: "800",
    fontSize: 20,
    textAlign: "center",
  },
  failedScore: {
    color: "red",
    fontFamily: "SairaStencilOne_400Regular",
    fontWeight: "800",
    fontSize: 20,
    textAlign: "center",
  },
  scoresContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    width: "90%",
  },
  icon: {
    height: 50,
    resizeMode: "contain",
  },
  failedEvoHeader: {
    color: "#444444",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },
  failedBox: {
    borderColor: "red",
    borderRadius: 10,
    borderWidth: 5,
    flexDirection: "column",
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 10,
    padding: 10,
    width: Dimensions.get("screen").width * 0.9,
  },
  passedBox: {
    borderColor: "green",
    borderRadius: 10,
    borderWidth: 5,
    flexDirection: "column",
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 10,
    padding: 10,
    width: Dimensions.get("screen").width * 0.9,
  },
  passedEvoHeader: {
    color: "#444444",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },
});

export default ResultsFailScroller;
