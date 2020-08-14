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

import MainTabNavigator from "./Navigation/MainTabNavigator";

enableScreens();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import {
  useFonts,
  SairaStencilOne_400Regular,
} from "@expo-google-fonts/saira-stencil-one";
import AsyncStorage from "@react-native-community/async-storage";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    loggedIn: false,
    token: null,
    id: null,
    user: null,
  });
  const [userData, setUserData] = useState({
    user: null,
    fetched: false,
  });

  const loggedInRef = React.useRef(false);

  let [fontsLoaded] = useFonts({
    SairaStencilOne_400Regular,
  });

  useEffect(() => {
    let uid;
    let token;
    // if (state.id != undefined) {
    getAsyncData()
      .then((asyncObject) => {
        if (asyncObject.uid !== null || asyncObject.token !== null) {
          uid = asyncObject.uid;
          token = asyncObject.token;
        }
      })
      .then(() => {
        fetchUser(uid).then((userObj) => {
          setState({
            loggedIn: true,
            id: uid,
            token: token,
            user: userObj.user,
          });
          if (userObj.success) {
            loggedInRef.current = true;
            setLoading(false);
          }
        });
      });
    // }
  }, []);

  const setAuthState = (input) => {
    setState({
      token: input.token,
      user: input.user,
      id: input.id,
      loggedIn: input.loggedIn,
    });
  };

  const setContainerState = (input) => {
    setState({
      ...state,
      user: input.user,
      id: input.id,
      loggedIn: input.loggedIn,
    });
  };

  const setUserStateData = (input) => {
    setUserData(input);
  };

  const logoutRef = () => {
    loggedInRef.current = false;
  };

  const setLoginRef = (input) => {
    loggedInRef.current = input;
  };

  if (state.id == undefined) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => (
              <LoginScreen
                {...props}
                setLoading={setLoading}
                setContainerState={setAuthState}
                setLoginRef={setLoginRef}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="SignUp" options={{ headerShown: false }}>
            {(props) => (
              <SignUpScreen
                {...props}
                setLoading={setLoading}
                setContainerState={setAuthState}
                setLoginRef={setLoginRef}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  if (state.id != undefined) {
    return (
      <AuthContext.Provider
        value={{
          state: state,
          setState: (newData) =>
            setState({
              user: newData,
            }),
        }}
      >
        <NavigationContainer>
          <MainTabNavigator
            logoutRef={logoutRef}
            SairaStencilOne_400Regular={SairaStencilOne_400Regular}
            setContainerState={setContainerState}
            setUserStateData={setUserStateData}
          />
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }

  return <SplashScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
