import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const SkillCard = ({ skill, handleSelect }) => {
  const [selected, setSelected] = React.useState(false);

  let splitString;
  let modifiedSkillString;

  if (skill.includes("-")) {
    splitString = skill.split("-");
    modifiedSkillString = splitString.join(" ");
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.card}
      onPress={() => {
        setSelected(!selected);
        handleSelect(skill);
      }}
    >
      <Text style={styles.skillText}>
        {modifiedSkillString ? modifiedSkillString : skill}
      </Text>
      <Ionicons
        name={
          !selected ? "ios-checkmark-circle-outline" : "ios-checkmark-circle"
        }
        size={24}
        color={selected ? "#007AFF" : "#c7c7cc"}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: "100%",
  },
  skillText: {
    textTransform: "capitalize",
    fontWeight: "800",
  },
});

export default SkillCard;
