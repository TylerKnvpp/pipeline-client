import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SplashScreen from "./Screens/SplashScreen";
import LoginScreen from "./Screens/Login";
import SignUpScreen from "./Screens/SignUp";
import HomeScreen from "./Screens/Home";

import { getAsyncData } from "./hooks/getAsyncData";
import { fetchUser } from "./hooks/getUserProfile";

import { enableScreens } from "react-native-screens";

import { AuthContext } from "./Context/AuthContext";
import { UserContext } from "./Context/UserContext";

import Ionicons from "react-native-vector-icons/Ionicons";

enableScreens();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    loggedIn: false,
    token: null,
    id: null,
  });
  const [userData, setUserData] = useState({
    user: {},
    fetched: false,
  });

  useEffect(() => {
    getAsyncData().then((asyncObject) => {
      if (asyncObject.uid !== null || asyncObject.token !== null)
        setState({
          loggedIn: true,
          id: asyncObject.uid,
          token: asyncObject.token,
        });
    });
    setLoading(false);
  }, [loading]);

  useEffect(() => {
    if (state.loggedIn && !userData.fetched) {
      fetchUser(state.id)
        .then((user) => {
          setUserData({ user: user, fetched: true });
        })
        .catch((err) => console.log(err));
    }
  });

  if (loading) {
    return <SplashScreen />;
  }

  const setContainerState = (input) => {
    setState(input);
  };

  const config = {
    animation: "spring",
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  return (
    <AuthContext.Provider value={state}>
      <UserContext.Provider value={userData}>
        <NavigationContainer>
          {state.id !== null ? (
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
                  <HomeScreen
                    {...props}
                    setContainerState={setContainerState}
                  />
                )}
              </Tab.Screen>

              <Tab.Screen name="Log Workout">
                {(props) => (
                  <HomeScreen
                    {...props}
                    setContainerState={setContainerState}
                  />
                )}
              </Tab.Screen>

              <Tab.Screen name="Profile">
                {(props) => (
                  <HomeScreen
                    {...props}
                    setContainerState={setContainerState}
                  />
                )}
              </Tab.Screen>
            </Tab.Navigator>
          ) : (
            <Stack.Navigator>
              <Stack.Screen
                name="Login"
                // component={HomeScreen}
                options={{ headerShown: false }}
              >
                {(props) => (
                  <LoginScreen
                    {...props}
                    setContainerState={setContainerState}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen
                name="SignUp"
                // component={HomeScreen}
                options={{ headerShown: false }}
              >
                {(props) => (
                  <SignUpScreen
                    {...props}
                    setContainerState={setContainerState}
                  />
                )}
              </Stack.Screen>
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
