import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import { AuthContext } from "../Context/AuthContext";

import HomeScreenStack from "./HomeScreenStack";
import ProfileScreenStack from "./ProfileScreenStack";
import LogWorkoutScreenStack from "./LogWorkoutScreenStack";

const Tab = createBottomTabNavigator();

function UserProfileSetupTabNav({
  setContainerState,
  SairaStencilOne_400Regular,
}) {
  let authContextData = React.useContext(AuthContext);

  const pid = authContextData
    ? authContextData.state.user.pipelineID._id
    : null;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home";
          } else if (route.name === "Profile") {
            iconName = focused ? "ios-person" : "ios-person";
          } else if (route.name === "PST Standards") {
            iconName = "ios-add";
          }
          // You can return any component that you like here!
          return (
            <Ionicons
              name={iconName}
              size={route.name === "PST Standards" ? 32 : 24}
              color={focused ? "#007AFF" : "#c7c7cc"}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home">
        {(props) => (
          <HomeScreenStack
            {...props}
            setContainerState={setContainerState}
            SairaStencilOne_400Regular={SairaStencilOne_400Regular}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="PST Standards">
        {(props) => (
          <LogWorkoutScreenStack
            {...props}
            setContainerState={setContainerState}
            SairaStencilOne_400Regular={SairaStencilOne_400Regular}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="Profile">
        {(props) => (
          <ProfileScreenStack
            {...props}
            setContainerState={setContainerState}
            SairaStencilOne_400Regular={SairaStencilOne_400Regular}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default UserProfileSetupTabNav;
