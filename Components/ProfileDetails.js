import React from "react";
import { StyleSheet, View, Text } from "react-native";
import ProfileUserDataCard from "./ProfileUserDataCard";

const ProfileDetails = ({ user }) => {
  return (
    <View style={styles.container}>
      <ProfileUserDataCard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
  },
});

export default ProfileDetails;
