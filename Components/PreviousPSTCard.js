import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

const PreviousPSTCard = ({ pst }) => {
  const [show, toggleShow] = React.useState(false);

  const date = moment("2020-08-12T18:51:30.113Z").format("MM/DD/YYYY");

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => toggleShow(!show)}
    >
      {pst.pass ? (
        <>
          <Image source={{ uri: pst.unitInsignia }} style={styles.icon} />
          <Text style={styles.unitHeader}>{pst.nickname}</Text>

          <View style={styles.inlineContainer}>
            <View style={styles.datePSTContainer}>
              <Text style={styles.date}>{date}</Text>
            </View>
            <View style={styles.passInline}>
              <Text style={styles.passText}>PASSED</Text>

              <Ionicons
                name={"ios-checkmark-circle-outline"}
                size={32}
                color="green"
              />
            </View>
          </View>
          {show ? (
            <View style={styles.scoresContainer}>
              <View style={styles.evoHeaderTitle}>
                <Text style={styles.evoHeader}>EVOLUTION</Text>
                <Text style={styles.evoHeader}>SCORE</Text>
              </View>
              {pst.passedUserEvolutions.map((evo) => {
                return (
                  <View style={styles.evoTitle} key={evo.workout._id}>
                    <Text style={styles.evoText}>{evo.workout.title}</Text>
                    <Text style={styles.evoText}>
                      {evo.workout.type === "timed"
                        ? evo.userEvolution.split(".").join(":")
                        : evo.userEvolution}
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : null}
        </>
      ) : (
        <>
          <Image source={{ uri: pst.unitInsignia }} style={styles.icon} />
          <Text style={styles.unitHeader}>{pst.nickname}</Text>

          <View style={styles.inlineContainer}>
            <View style={styles.datePSTContainer}>
              <Text style={styles.date}>{date}</Text>
            </View>
            <View style={styles.passInline}>
              <Text style={styles.failText}>FAILED</Text>

              <Ionicons
                name={"ios-checkmark-circle-outline"}
                size={32}
                color="red"
              />
            </View>
          </View>
          {show ? (
            <View style={styles.scoresContainer}>
              <View style={styles.evoHeaderTitle}>
                <Text style={styles.evoHeader}>EVOLUTION</Text>
                <Text style={styles.evoHeader}>SCORE</Text>
              </View>
              {pst.failedUserEvolutions.length
                ? pst.passedUserEvolutions.map((evo) => {
                    return (
                      <View style={styles.evoTitle} key={evo.workout._id}>
                        <Text style={styles.passText}>{evo.workout.title}</Text>
                        <Text style={styles.passText}>
                          {evo.workout.type === "timed"
                            ? evo.userEvolution.split(".").join(":")
                            : evo.userEvolution}
                        </Text>
                      </View>
                    );
                  })
                : null}
              {pst.failedUserEvolutions.length
                ? pst.failedUserEvolutions.map((evo) => {
                    return (
                      <View style={styles.evoTitle} key={evo.workout._id}>
                        <Text style={styles.failText}>{evo.workout.title}</Text>
                        <Text style={styles.failText}>
                          {evo.workout.type === "timed"
                            ? evo.userEvolution.split(".").join(":")
                            : evo.userEvolution}
                        </Text>
                      </View>
                    );
                  })
                : null}
            </View>
          ) : null}
        </>
      )}

      <Text style={styles.show}>{!show ? "Show More" : "Show Less"}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  evoHeader: {
    color: "white",
    fontWeight: "800",
  },
  passText: {
    color: "green",
    fontWeight: "800",
  },
  failText: {
    color: "red",
    fontWeight: "800",
    marginRight: 10,
  },

  rowIcon: {
    resizeMode: "contain",
    height: 20,
  },
  evoTitle: {
    borderBottomColor: "#8a8a8a",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 10,
    paddingBottom: 10,
    width: "100%",
  },
  evoHeaderTitle: {
    backgroundColor: "black",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 10,
    padding: 5,
    flexDirection: "row",
    width: "100%",
  },
  scoresContainer: {
    alignItems: "flex-start",
    // borderTopColor: "#444444",
    // borderTopWidth: 1,
    marginLeft: "auto",
    marginRight: "auto",
    paddingVertical: 10,
    marginVertical: 10,
    flexDirection: "column",
    justifyContent: "space-between",

    width: "90%",
  },
  show: {
    fontWeight: "800",
    marginTop: 20,
    textAlign: "center",
  },
  unitHeader: {
    fontFamily: "SairaStencilOne_400Regular",
    fontSize: 16,
    textAlign: "center",
  },
  iconInline: {
    height: 40,
    alignItems: "center",
    flexDirection: "row",
  },
  passInline: {
    alignItems: "center",
    flexDirection: "row",
  },
  passText: {
    alignItems: "center",
    color: "green",
    fontWeight: "800",
    marginRight: 10,
  },
  chevron: {
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  datePSTContainer: {
    justifyContent: "center",
    flexDirection: "column",
  },
  icon: {
    height: 20,
    marginBottom: 10,
    resizeMode: "contain",
  },
  date: {
    fontFamily: "SairaStencilOne_400Regular",
    fontSize: 16,
  },
  pstTitle: {
    color: "#444444",

    fontFamily: "SairaStencilOne_400Regular",
    fontSize: 18,
  },
  inlineContainer: {
    alignItems: "center",
    borderTopColor: "#444444",
    borderTopWidth: 1,
    borderBottomColor: "#444444",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    paddingVertical: 10,
    width: "90%",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 20,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 20,
    width: "90%",
  },
  scrollContainer: {
    height: Dimensions.get("screen").height,
  },
  container: {
    width: Dimensions.get("screen").width,
  },
  header: {
    backgroundColor: "white",
    borderRadius: 10,
    fontFamily: "SairaStencilOne_400Regular",
    fontSize: 32,
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 20,
    padding: 10,
    shadowColor: "#444444",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    textAlign: "center",
    width: Dimensions.get("screen").width * 0.8,
  },
});

export default PreviousPSTCard;
