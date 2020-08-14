import * as React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Modal,
  Alert,
} from "react-native";

import { AuthContext } from "../Context/AuthContext";

import { getPipelineResources } from "../hooks/getPipelineResources";
import AsyncStorage from "@react-native-community/async-storage";

import HomeHero from "../Components/HomeHero";
import ScoresScroller from "../Components/ScoresScroller";
import OptScoreScroller from "../Components/OptScoreScroller";
import PostScroller from "../Components/PostScroller";
import { ScrollView } from "react-native-gesture-handler";
import UserLatestScoreScroller from "../Components/UserLatestScoreScroller";

const Home = ({ setContainerState, setUserStateData, navigation }) => {
  const [resourceState, setResources] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);

  let authContextData = React.useContext(AuthContext);

  const user = authContextData.state.user;

  const alertRef = React.useRef(false);

  if (!alertRef.current && user.username == undefined) {
    Alert.alert(
      `Update Profile`,
      `Your profile is incomplete. Would you like to add some info?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Profile");
            console.log("couldnt complete request");
          },
        },
      ],
      { cancelable: false }
    );
    alertRef.current = true;
  }

  const handleLogout = () => {
    AsyncStorage.clear();
    setContainerState({
      loggedIn: false,
      token: null,
      id: null,
    });
  };

  // console.log(authContextData.state.user.pipelineID._id);

  React.useEffect(() => {
    getPipelineResources(pid).then((res) => {
      if (res.resources && resourceState.length === 0) {
        setResources(res.resources);
      }
    });
  });

  const pid = authContextData.state.user.pipelineID._id;
  const workouts = authContextData.state.user.pipelineID.workouts;
  const coverPhoto = authContextData.state.user.pipelineID.pipelineCoverPhoto;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flex: 0 }}>
      <HomeHero url={coverPhoto} />
      {workouts.length > 0 ? (
        <>
          <ScoresScroller
            title={"Minimum Scores"}
            theme={"minimum"}
            workouts={workouts}
          />
          <OptScoreScroller
            title={"Optimum Scores"}
            theme={"optimum"}
            workouts={workouts}
          />
        </>
      ) : (
        <Text>Loading...</Text>
      )}

      <PostScroller resources={resourceState} />
    </ScrollView>
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
  },
});

export default Home;
