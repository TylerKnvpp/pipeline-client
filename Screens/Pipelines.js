import * as React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";

import { AuthContext } from "../Context/AuthContext";

import { getPipelines } from "../hooks/getPipelines";
import { postUserPipeline } from "../hooks/postUserPipeline";

import PipelineScroller from "../Components/PipelineScroller";
import SplashScreen from "../Screens/SplashScreen";

const Pipelines = ({
  SairaStencilOne_400Regular,
  navigation,
  route,
  updateUserState,
}) => {
  const [pipelines, setPipelines] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  let authContextData = React.useContext(AuthContext);
  const uid = authContextData.state.user._id;

  React.useEffect(() => {
    if (pipelines.length === 0) {
      getPipelines()
        .then((pipelines) => {
          setPipelines(pipelines);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  });

  const handlePipelineSelect = (input) => {
    const currentPID = authContextData.state.user.pipelineID._id;
    const nickname = authContextData.state.user.pipelineID.nickname;
    if (currentPID == input) {
      Alert.alert(`You are already enrolled in the ${nickname} pipeline.`);
      return;
    }
    if (uid && input) {
      postUserPipeline(uid, input).then((res) => {
        if (res.success) {
          updateUserState(res.user);
        }
      });
      navigation.navigate("Home");
    }
  };

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.selectHeader}>Available Pipelines</Text>
      <PipelineScroller
        SairaStencilOne_400Regular={SairaStencilOne_400Regular}
        handlePipelineSelect={handlePipelineSelect}
        {...pipelines}
      />
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

export default Pipelines;
