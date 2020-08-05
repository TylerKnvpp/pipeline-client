import * as React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

import { UserContext } from "../Context/UserContext";

import { getPipelines } from "../hooks/getPipelines";

import PipelineScroller from "../Components/PipelineScroller";

import {
  useFonts,
  SairaStencilOne_400Regular,
} from "@expo-google-fonts/saira-stencil-one";

const Home = (props) => {
  const [pipelines, setPipelines] = React.useState([]);

  let [fontsLoaded] = useFonts({
    SairaStencilOne_400Regular,
  });

  let userContextData = React.useContext(UserContext);

  React.useEffect(() => {
    if (!userContextData.pipeline && pipelines.length === 0) {
      getPipelines()
        .then((pipelines) => {
          setPipelines(pipelines);
        })
        .catch((err) => console.log(err));
    }
  });

  const handleLogout = () => {
    AsyncStorage.clear();
    props.setContainerState({
      loggedIn: false,
      token: null,
      id: null,
    });
  };

  return (
    <View style={styles.container}>
      {!userContextData.pipeline ? (
        <>
          <PipelineScroller
            SairaStencilOne_400Regular={SairaStencilOne_400Regular}
            {...pipelines}
          />
        </>
      ) : (
        <Text>loaded</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100%",
    minWidth: "100%",
  },
});

export default Home;
