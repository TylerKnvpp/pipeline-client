import React from "react";
import { Button, Text } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../Screens/Profile";
import EditProfileScreen from "../Screens/EditProfile";
import AsyncStorage from "@react-native-community/async-storage";

const ProfileStack = createStackNavigator();

function ProfileScreenStack({
  setContainerState,
  SairaStencilOne_400Regular,
  logoutRef,
  loggedInRef,
}) {
  const handleLogout = () => {
    AsyncStorage.clear();
    loggedInRef.current = false;
    setContainerState({
      loggedIn: false,
      token: null,
      id: null,
      user: null,
    });
  };

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        options={{
          headerRight: () => <Button title="Logout" onPress={handleLogout} />,
          headerRightContainerStyle: {
            paddingRight: 10,
          },
        }}
      >
        {(props) => (
          <ProfileScreen
            {...props}
            setContainerState={setContainerState}
            SairaStencilOne_400Regular={SairaStencilOne_400Regular}
          />
        )}
      </ProfileStack.Screen>

      <ProfileStack.Screen name="Edit Profile">
        {(props) => (
          <EditProfileScreen
            {...props}
            setContainerState={setContainerState}
            SairaStencilOne_400Regular={SairaStencilOne_400Regular}
          />
        )}
      </ProfileStack.Screen>
    </ProfileStack.Navigator>
  );
}

export default ProfileScreenStack;
