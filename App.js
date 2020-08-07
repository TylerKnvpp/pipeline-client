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
  }, []);

  const setContainerState = (input) => {
    setState(input);
  };

  const setUserStateData = (input) => {
    setUserData(input);
  };

  const logoutRef = () => {
    loggedInRef.current = false;
  };

  // if (loading) {
  //   return <SplashScreen />;
  // }

  if (state.id == undefined) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            // component={HomeScreen}
            options={{ headerShown: false }}
          >
            {(props) => (
              <LoginScreen
                {...props}
                setLoading={setLoading}
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
                setLoading={setLoading}
                setContainerState={setContainerState}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  if (loggedInRef) {
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
        {/* <UserContext.Provider value={userData.user}> */}

        <NavigationContainer>
          <MainTabNavigator
            logoutRef={logoutRef}
            SairaStencilOne_400Regular={SairaStencilOne_400Regular}
            setContainerState={setContainerState}
            setUserStateData={setUserStateData}
          />
        </NavigationContainer>
        {/* </UserContext.Provider> */}
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
