import React from "react";

import HomeScreen from "../Screens/Home";
import ProfileScreen from "../Screens/Profile";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import UserProfileSetupStackNav from "./UserProfileSetupStackNav";

const Tab = createBottomTabNavigator();

function UserProfileSetupTabNav({
  setContainerState,
  SairaStencilOne_400Regular,
}) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home";
          } else if (route.name === "Profile") {
            iconName = focused ? "ios-person" : "ios-person";
          } else if (route.name === "Log Workout") {
            iconName = "ios-add";
          }
          // You can return any component that you like here!
          return (
            <Ionicons
              name={iconName}
              size={route.name === "Log Workout" ? 32 : 24}
              color={focused ? "#007AFF" : "#c7c7cc"}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home">
        {(props) => (
          <UserProfileSetupStackNav
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
