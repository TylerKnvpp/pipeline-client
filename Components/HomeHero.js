import React from "react";
import { Image, StyleSheet, Text, View, Dimensions } from "react-native";

const HomeHero = ({ url }) => {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  return (
    <View style={styles.heroContainer}>
      <Text style={styles.textOver}>BUDS</Text>
      <Image
        style={styles.heroImage}
        defaultSource={require("../assets/sf-soliders.jpeg")}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        source={{ uri: url }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textOver: {
    backgroundColor: "black",
    borderRadius: 10,
    color: "white",
    fontSize: 32,
    fontWeight: "800",
    fontFamily: "SairaStencilOne_400Regular",
    // marginTop: 30,
    padding: 10,
    position: "absolute",
    opacity: 0.7,
    textAlign: "center",
    top: 144,
    width: "100%",
    zIndex: 1,
  },
  heroContainer: {},
  heroImage: {
    height: Dimensions.get("screen").height * 0.26,
    width: Dimensions.get("screen").width,
    resizeMode: "contain",
    marginBottom: 0,
    zIndex: -1,
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
  scoreMinimum: {
    color: "#8a8a8a",
    fontFamily: "SairaStencilOne_400Regular",
    fontSize: 24,
    textAlign: "center",
  },
  exercise: {
    textAlign: "center",
    fontWeight: "800",
  },
  minHeader: {
    fontSize: 24,
    fontWeight: "900",
    marginTop: 20,
    textAlign: "center",
  },
});

export default HomeHero;
