import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "./Screens/SplashScreen";
import LoginScreen from "./Screens/Login";
import SignUpScreen from "./Screens/SignUp";
import HomeScreen from "./Screens/Home";

import { getAsyncData } from "./hooks/getAsyncData";
import { fetchUser } from "./hooks/getUserProfile";

import AsyncStorage from "@react-native-community/async-storage";
import { enableScreens } from "react-native-screens";

import { AuthContext } from "./Context/AuthContext";
import { UserContext } from "./Context/UserContext";

enableScreens();

const Stack = createStackNavigator();

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
          <Stack.Navigator>
            {state.id !== null ? (
              <>
                <Stack.Screen
                  name="Home"
                  // component={HomeScreen}
                  options={{ headerShown: true }}
                >
                  {(props) => (
                    <HomeScreen
                      {...props}
                      setContainerState={setContainerState}
                    />
                  )}
                </Stack.Screen>
              </>
            ) : (
              <>
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
              </>
            )}
          </Stack.Navigator>
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
