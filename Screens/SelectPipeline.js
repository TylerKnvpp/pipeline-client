import * as React from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";

import { AuthContext } from "../Context/AuthContext";

import { getPipelines } from "../hooks/getPipelines";
import { postUserPipeline } from "../hooks/postUserPipeline";

import PipelineScroller from "../Components/PipelineScroller";

const SelectPipeline = ({
  SairaStencilOne_400Regular,
  setContainerState,
  navigation,
  route,
}) => {
  const [pipelines, setPipelines] = React.useState([]);

  let authContextData = React.useContext(AuthContext);
  const uid = authContextData.state.user._id;

  React.useEffect(() => {
    if (pipelines.length === 0) {
      getPipelines()
        .then((pipelines) => {
          setPipelines(pipelines);
        })
        .catch((err) => console.log(err));
    }
  });

  const handlePipelineSelect = (input) => {
    if (uid && input) {
      postUserPipeline(uid, input).then((res) => {
        setContainerState({
          id: res.user._id,
          user: res.user,
          loggedIn: true,
        });
      });
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.container}>
      {authContextData.state.user.pipelineID == undefined ? (
        <>
          <Text style={styles.selectHeader}>
            Please select a training pipeline
          </Text>
          <PipelineScroller
            SairaStencilOne_400Regular={SairaStencilOne_400Regular}
            handlePipelineSelect={handlePipelineSelect}
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
  selectHeader: {
    fontFamily: "SairaStencilOne_400Regular",
    fontSize: 18,

    marginBottom: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    minHeight: "100%",
    minWidth: "100%",
  },
});

export default SelectPipeline;
