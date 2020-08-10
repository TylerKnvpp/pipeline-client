import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
} from "react-native";

const UserLatestScoreScroller = ({ title, workouts, theme }) => {
  function scoreColorSelector() {
    if (theme === "minimum") {
      return styles.minScore;
    } else if (theme === "optimum") {
      return styles.optScore;
    } else if (theme === "user") {
      return styles.userScore;
    }
  }

  function scoreContainerSelector() {
    if (theme === "minimum") {
      return styles.scoreContainer;
    } else if (theme === "optimum") {
      return styles.optScoreContainer;
    } else if (theme === "user") {
      return styles.userScoreContainer;
    }
  }

  function headerSelector() {
    if (theme === "minimum") {
      return styles.minHeader;
    } else if (theme === "optimum") {
      return styles.optHeader;
    } else if (theme === "user") {
      return styles.userHeader;
    }
  }

  //   function scoreRender(workout) {
  //     if (workout.$numberDecimal !== undefined) {
  //       let value = workout.numberDecimal;
  //       let string = value.toString();
  //       console.log("string", string);
  //       if (string.includes(".")) {
  //         let splitThenJoined = string.split(".").join(":");
  //         return splitThenJoined;
  //       }
  //       return string;
  //     } else {
  //       return workout;
  //     }
  //   }

  return (
    <View style={styles.container}>
      <Text style={headerSelector()}>{title} &rarr;</Text>

      <ScrollView style={styles.standardsContainer} horizontal>
        {workouts.map((workout) => {
          return (
            <View key={workout._id} style={scoreContainerSelector()}>
              <Text style={scoreColorSelector()}>
                {workout.optimumScore.$numberDecimal
                  ? workout.optimumScore.$numberDecimal
                  : workout.optimumScore}
              </Text>
              <Text style={styles.exercise}>{workout.title}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginVertical: 20,
    height: Dimensions.get("screen").height * 0.2,
  },

  standardsContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    paddingVertical: 15,
    width: Dimensions.get("screen").width,
    marginTop: 0,
  },
  scoreContainer: {
    borderWidth: 2,
    borderColor: "#8a8a8a",
    borderRadius: 5,
    flexDirection: "column",
    marginHorizontal: 10,
    height: 80,
    padding: 5,
    textAlign: "center",
    width: Dimensions.get("screen").width * 0.3,
  },
  minScore: {
    color: "#8a8a8a",
    fontFamily: "SairaStencilOne_400Regular",
    fontSize: 24,
    textAlign: "center",
  },
  optScore: {
    color: "green",
    fontFamily: "SairaStencilOne_400Regular",
    fontSize: 24,
    textAlign: "center",
  },
  userScore: {
    color: "blue",
    fontFamily: "SairaStencilOne_400Regular",
    fontSize: 24,
    textAlign: "center",
  },
  exercise: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "800",
  },
  minHeader: {
    fontSize: 24,
    fontWeight: "900",
    marginTop: 20,
    textAlign: "center",
    textTransform: "uppercase",
  },
  optHeader: {
    color: "green",
    fontSize: 24,
    fontWeight: "900",
    marginTop: 20,
    textAlign: "left",
    marginLeft: 10,
    textTransform: "uppercase",
  },
  userHeader: {
    color: "blue",
    fontSize: 24,
    fontWeight: "900",
    marginTop: 20,
    textAlign: "center",
    textTransform: "uppercase",
  },
  optScoreContainer: {
    borderWidth: 2,
    borderColor: "green",
    borderRadius: 5,
    flexDirection: "column",
    marginHorizontal: 10,
    height: 80,
    padding: 5,
    textAlign: "center",
    width: Dimensions.get("screen").width * 0.3,
  },
});

export default UserLatestScoreScroller;
