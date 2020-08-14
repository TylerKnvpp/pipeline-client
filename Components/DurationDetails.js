import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DurationDetails = ({ phase }) => {
  const [show, toggleShow] = useState(false);

  return (
    <View style={styles.durationContainer}>
      <TouchableOpacity
        style={styles.accordionContainer}
        onPress={() => toggleShow(!show)}
      >
        <Text style={styles.phaseTitle}>{phase.phaseTitle}</Text>
        <Ionicons
          name={!show ? "ios-add" : "ios-arrow-up"}
          size={32}
          color="black"
        />
      </TouchableOpacity>

      {show ? (
        <>
          <Text style={styles.phaseFocus}>
            {phase.phaseFocus} - {phase.phaseDuration} weeks
          </Text>
          {phase.phaseDescription.map((description, index) => {
            return (
              <Text key={index} style={styles.phaseDescription}>
                {description}
              </Text>
            );
          })}
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  accordionContainer: {
    // borderTopColor: "black",
    // borderTopWidth: 2,
    alignItems: "center",
    borderBottomColor: "#8a8a8a",
    borderBottomWidth: 1,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    width: "100%",
  },
  durationContainer: {
    marginHorizontal: 20,
  },
  phaseTitle: {
    fontSize: 22,
    textAlign: "left",
    fontWeight: "800",
  },
  phaseFocus: {
    textAlign: "left",
    fontWeight: "800",
    marginVertical: 18,
  },
  phaseDuration: {
    textAlign: "left",
  },
  phaseDescription: {
    fontSize: 18,
    lineHeight: 25,
    marginBottom: 40,
  },
  duration: {
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default DurationDetails;
