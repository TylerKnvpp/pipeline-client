import React from "react";

import ProfileScreenStack from "./ProfileScreenStack";
import HomeScreenStack from "./HomeScreenStack";
import LogWorkoutScreenStack from "./LogWorkoutScreenStack";
// import LogWorkoutScreen from "../Screens/Profile";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import { AuthContext } from "../Context/AuthContext";

import UserProfileSetupStackNav from "./UserProfileSetupStackNav";

const Tab = createBottomTabNavigator();

function MainTabNavigator({
  setContainerState,
  SairaStencilOne_400Regular,

  setUserStateData,
  logoutRef,
}) {
  let authContextData = React.useContext(AuthContext);
  let userData = authContextData.state.user;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home";
          } else if (route.name === "Profile") {
            iconName = focused ? "ios-person" : "ios-person";
          } else if (route.name === "Log PST") {
            iconName = "ios-add";
          }
          // returns icon for tab nav
          return (
            <Ionicons
              name={iconName}
              size={route.name === "Log PST" ? 32 : 24}
              color={focused ? "#007AFF" : "#c7c7cc"}
            />
          );
        },
      })}
    >
      {userData.pipelineID._id && userData.skills.length > 0 ? (
        <>
          <Tab.Screen name="Home" options={{ title: "Home" }}>
            {(props) => (
              <HomeScreenStack
                {...props}
                logoutRef={logoutRef}
                setUserStateData={setUserStateData}
                setContainerState={setContainerState}
                SairaStencilOne_400Regular={SairaStencilOne_400Regular}
              />
            )}
          </Tab.Screen>

          <Tab.Screen name="Log PST">
            {(props) => (
              <LogWorkoutScreenStack
                {...props}
                setContainerState={setContainerState}
                SairaStencilOne_400Regular={SairaStencilOne_400Regular}
              />
            )}
          </Tab.Screen>

          <Tab.Screen name="Profile" options={{ title: "Profile" }}>
            {(props) => (
              <ProfileScreenStack
                {...props}
                logoutRef={logoutRef}
                setUserStateData={setUserStateData}
                setContainerState={setContainerState}
                SairaStencilOne_400Regular={SairaStencilOne_400Regular}
              />
            )}
          </Tab.Screen>
        </>
      ) : (
        <Tab.Screen name="Home">
          {(props) => (
            <UserProfileSetupStackNav
              {...props}
              setContainerState={setContainerState}
              SairaStencilOne_400Regular={SairaStencilOne_400Regular}
            />
          )}
        </Tab.Screen>
      )}
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
