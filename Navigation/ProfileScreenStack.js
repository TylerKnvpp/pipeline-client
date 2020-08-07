import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../Screens/Profile";

const ProfileStack = createStackNavigator();

function ProfileScreenStack({ setContainerState, SairaStencilOne_400Regular }) {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Home">
        {(props) => (
          <ProfileScreen
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
