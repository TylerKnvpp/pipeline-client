import React from "react";
import { Button, Text } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../Screens/Profile";
import EditProfileScreen from "../Screens/EditProfile";

const ProfileStack = createStackNavigator();

function ProfileScreenStack({ setContainerState, SairaStencilOne_400Regular }) {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        options={{
          headerRight: () => <Button title="Logout" />,
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
