import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
} from "react-native";

const ResultsScroller = ({ passedEvos }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.standardsContainer}
        contentContainerStyle={{ flex: 1 }}
      >
        {passedEvos.map((evo) => {
          return (
            <View key={evo.workout._id} style={styles.userScoreContainer}>
              <View style={styles.scoreBox}>
                <Text style={styles.minScore}>{evo.workout.minumumScore}</Text>
                <Text style={styles.exercise}>Minimum Score</Text>
              </View>

              <View style={styles.scoreBoxUser}>
                <Image style={styles.icon} source={{ uri: evo.workout.icon }} />
                <Text style={styles.userScore}>{evo.userEvolution}</Text>
                <Text style={styles.exerciseUser}>{evo.workout.title}</Text>
              </View>

              <View style={styles.scoreBox}>
                <Text style={styles.optScore}>{evo.workout.optimumScore}</Text>
                <Text style={styles.exercise}>Optimum Score</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 50,
    resizeMode: "contain",
  },
  standardsContainer: {
    flex: 1,
    paddingVertical: 15,
    width: Dimensions.get("screen").width,
    marginTop: 0,
    marginBottom: 0,
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
    fontSize: 20,
    textAlign: "center",
  },
  optScore: {
    color: "#444444",
    fontFamily: "SairaStencilOne_400Regular",
    fontSize: 20,
    textAlign: "center",
  },
  userScore: {
    color: "green",
    fontFamily: "SairaStencilOne_400Regular",
    fontSize: 20,
    textAlign: "center",
  },
  exercise: {
    fontSize: 8,
    textAlign: "center",
    fontWeight: "800",
  },
  exerciseUser: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "800",
  },
  minHeader: {
    fontSize: 24,
    fontWeight: "900",
    marginTop: 20,
    textAlign: "left",
    marginLeft: 10,
    textTransform: "uppercase",
  },
  optHeader: {
    color: "green",
    fontSize: 24,
    fontWeight: "900",
    marginTop: 20,
    textAlign: "center",
    textTransform: "uppercase",
  },
  userHeader: {
    color: "blue",
    fontSize: 24,
    fontWeight: "900",
    marginTop: 20,
    textAlign: "left",
    marginLeft: 10,
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

export default ResultsScroller;
