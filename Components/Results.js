import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import ScoresScroller from "./ScoresScroller";
import OptScoreScroller from "./OptScoreScroller";
import ResultsScroller from "./ResultsScroller";
import ResultsFailScroller from "./ResultsFailScroller";

const Results = ({
  evolutions,
  pass,
  failedEvos,
  passedEvos,
  workouts,
  resources,
}) => {
  return (
    <View style={styles.container}>
      {pass ? (
        <Text style={styles.passHeader}>PASS</Text>
      ) : (
        <Text style={styles.failHeader}>FAIL</Text>
      )}

      {pass ? (
        <ResultsScroller passedEvos={passedEvos} />
      ) : (
        <ResultsFailScroller
          resources={resources}
          failedEvos={failedEvos}
          passedEvos={passedEvos}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  passHeader: {
    color: "green",
    fontSize: 32,

    fontFamily: "SairaStencilOne_400Regular",
    textAlign: "center",
  },
  failHeader: {
    color: "red",
    fontFamily: "SairaStencilOne_400Regular",
    fontSize: 32,
    textAlign: "center",
  },
});

export default Results;
