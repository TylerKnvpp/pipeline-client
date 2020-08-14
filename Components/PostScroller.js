import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { TouchableOpacity } from "react-native-gesture-handler";

const PostScroller = ({ resources }) => {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [result, setResults] = React.useState(null);

  function iconSelector(input) {
    if (input === "video") {
      return "logo-youtube";
    } else if (input === "article") {
      return "ios-compass";
    }
  }

  _handlePressButtonAsync = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
    setResults(result);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>RESOURCES &rarr;</Text>

      <ScrollView style={styles.standardsContainer} horizontal>
        {resources.length > 0 ? (
          resources.map((res) => (
            <TouchableOpacity
              activeOpacity={0.9}
              key={res._id}
              style={styles.postContainer}
              onPress={() => _handlePressButtonAsync(res.url)}
            >
              <Text style={styles.postHeader}>
                {res.title.length > 25
                  ? res.title.substring(0, 25).concat("...")
                  : res.title}
              </Text>
              <Ionicons
                style={styles.icon}
                name={iconSelector(res.type)}
                size={24}
                color={res.type === "video" ? "red" : "white"}
              />
              <Image
                style={styles.postImage}
                defaultSource={require("../assets/sf-soliders.jpeg")}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
                source={{ uri: res.coverPhoto }}
              />
            </TouchableOpacity>
          ))
        ) : (
          <Text>Loading..</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginVertical: 20,
    width: "100%",
    marginBottom: 30,
  },
  icon: {
    position: "absolute",
    left: Dimensions.get("screen").width * 0.8,
    top: 170,
  },
  postHeader: {
    backgroundColor: "black",
    borderRadius: 10,
    color: "white",
    fontWeight: "800",
    fontSize: 18,
    paddingVertical: 10,
    paddingLeft: 5,
    position: "absolute",
    top: 162,
    width: "100%",
  },
  postImage: {
    borderRadius: 10,
    height: 200,
    width: "100%",
    // resizeMode: "contain",
    marginBottom: 0,
    zIndex: -1,
  },
  standardsContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    paddingVertical: 20,
    width: Dimensions.get("screen").width,
    marginTop: 0,
  },
  postContainer: {
    marginHorizontal: 10,
    marginVertical: 15,
    width: Dimensions.get("screen").width * 0.9,
    shadowColor: "#444444",
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 4,
      width: 4,
    },
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
  header: {
    color: "#444444",
    fontSize: 24,
    fontWeight: "900",
    fontFamily: "SairaStencilOne_400Regular",
    marginTop: 20,
    marginLeft: 20,
    textAlign: "left",
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

export default PostScroller;
