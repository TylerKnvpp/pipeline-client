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
import Constants from "expo-constants";

import { AuthContext } from "../Context/AuthContext";

import { postUserProfilePic } from "../hooks/postUserProfilePic";

import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";
import EditProfileDataCard from "../Components/EditProfileDataCard";

import * as ImagePicker from "expo-image-picker";

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

  const [imageState, setImage] = React.useState(null);

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

  React.useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setImage;
    const uid = authContextData.state.user._id;

    if (!result.cancelled) {
      setImage(result);

      const img = {
        uri: result.uri,
        type: result.type,
        name:
          result.fileName || result.uri.substr(result.uri.lastIndexOf("/") + 1),
      };

      postUserProfilePic(uid, img);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        defaultSource={
          imageState ? { uri: imageState.uri } : require("../assets/avatar.png")
        }
        source={{
          uri: imageState
            ? imageState.uri
            : authContextData.state.user.profilePicture,
        }}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageLoadError(true)}
        resizeMode={"contain"}
        style={styles.image}
      />
      <Button title="Change Profile Picture" onPress={pickImage} />
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
