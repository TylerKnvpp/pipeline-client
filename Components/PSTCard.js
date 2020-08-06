import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

const PSTDetails = ({ workout }) => {
  let minScore;
  let optScore;

  let minString = workout.minumumScore.toString();
  let optString = workout.optimumScore.toString();

  if (workout.minumumScore) {
    if (minString.includes(".")) {
      minScore = minString.split(".").join(":");
    } else {
      minScore = workout.minumumScore;
    }

    if (optString.includes(".")) {
      optScore = optString.split(".").join(":");
    } else {
      optScore = workout.optimumScore;
    }
  }

  return (
    <View style={styles.cardContainer}>
      <Image
        resizeMode={"contain"}
        source={{ uri: workout.icon }}
        style={styles.icon}
      />
      <Text style={styles.workoutTitle}>{workout.title}</Text>
      <Text style={styles.workoutDescription}>{workout.description}</Text>

      <View style={styles.scoreContainer}>
        <View style={styles.minScoreContainer}>
          <Text style={styles.minScoreLabel}>Minimum Score</Text>
          <Text style={styles.scoreMinimum}>
            {minString.includes(".") ? `${minScore}0` : workout.minumumScore}
          </Text>
        </View>

        <View style={styles.optScoreContainer}>
          <Text style={styles.optScoreLabel}>Optimum Score</Text>
          <Text style={styles.scoreOptimum}>
            {optString.includes(".") ? `${optScore}0` : workout.optimumScore}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 40,
  },
  minScoreLabel: {
    color: "red",
    textAlign: "center",
  },
  optScoreLabel: {
    color: "green",
    textAlign: "center",
  },
  minScoreContainer: {
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  optScoreContainer: {
    borderColor: "green",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  scoreMinimum: {
    color: "red",
    fontSize: 30,
    textAlign: "center",
  },
  scoreOptimum: {
    color: "green",
    fontSize: 30,
    textAlign: "center",
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    width: "70%",
  },
  workoutTitle: {
    fontWeight: "800",
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  workoutDescription: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
  },
  icon: {
    height: 100,
  },
});

export default PSTDetails;
