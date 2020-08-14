import React, { useState } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";

import SplashScreen from "./SplashScreen";

import { AuthContext } from "../Context/AuthContext";

import { getUserPSTs } from "../hooks/getUserPSTs";

import PreviousPSTCard from "../Components/PreviousPSTCard";
import FailedPSTCard from "../Components/FailedPSTCard";
import { ScrollView } from "react-native-gesture-handler";

const PastPSTs = () => {
  const [pstState, setPSTState] = React.useState([]);
  const authContextData = React.useContext(AuthContext);

  const uid = authContextData.state.user._id;

  React.useEffect(() => {
    getUserPSTs(uid).then((res) => {
      if (res.success) {
        setPSTState(res.psts);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>PREVIOUS PST'S</Text>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled
      >
        {pstState.length ? (
          pstState.map((pst) => {
            return <PreviousPSTCard key={pst._id} pst={pst} />;
          })
        ) : (
          <Text>Loading..</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    height: "100%",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  contentContainer: {
    flex: 0,
  },
  container: {
    width: Dimensions.get("screen").width,
    height: "100%",
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

export default PastPSTs;
