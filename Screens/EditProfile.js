import * as React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
} from "react-native";

import { AuthContext } from "../Context/AuthContext";

import { getPipelines } from "../hooks/getPipelines";

import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";
import EditProfileDataCard from "../Components/EditProfileDataCard";

const Profile = ({
  SairaStencilOne_400Regular,
  setContainerState,
  setUserStateData,
  logoutRef,
  navigation,
  route,
}) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageLoadError, setImageLoadError] = React.useState(false);
  let authContextData = React.useContext(AuthContext);

  const handleLogout = () => {
    AsyncStorage.clear();
    logoutRef();
    setContainerState({
      loggedIn: false,
      token: null,
      id: null,
    });
    setUserStateData({
      user: {},
      fetched: false,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        defaultSource={require("../assets/avatar.png")}
        source={{ uri: authContextData.state.user.profilePicture }}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageLoadError(true)}
        resizeMode={"contain"}
        style={styles.image}
      />
      <Button title="Change Profile Picture" />
      <ScrollView style={styles.scroll}>
        <EditProfileDataCard
          navigation={navigation}
          setContainerState={setContainerState}
          SairaStencilOne_400Regular={SairaStencilOne_400Regular}
          user={authContextData.state.user}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
    marginLeft: 25,
  },
  username: {
    fontFamily: "SairaStencilOne_400Regular",
    fontSize: 18,
    marginVertical: 10,
  },
  selectHeader: {
    fontFamily: "SairaStencilOne_400Regular",
    fontSize: 18,
    paddingTop: 80,
    marginBottom: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 30,
    minHeight: "100%",
    minWidth: "100%",
  },
  image: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#8a8a8a",
    height: 100,
    width: 100,
    marginTop: 20,
    resizeMode: "contain",
  },
});

export default Profile;
