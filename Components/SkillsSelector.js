import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SkillCard from "./SkillCard";

const SkillSelection = ({ handleSelect }) => {
  const skillsArr = [
    "running",
    "swimming",
    "lifting",
    "mechanics",
    "diving",
    "skydiving",
    "land-navigation",
  ];

  return (
    <ScrollView scrollEnabled style={styles.scrollContainer}>
      {skillsArr.map((skill) => {
        return (
          <SkillCard key={skill} skill={skill} handleSelect={handleSelect} />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    width: "90%",
  },
});

export default SkillSelection;
