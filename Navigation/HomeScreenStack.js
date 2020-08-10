import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/Home";

const HomeStack = createStackNavigator();

function HomeStackScreen({ setContainerState, SairaStencilOne_400Regular }) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        options={{
          headerRight: () => <Button title="Logout" />,
          headerRightContainerStyle: {
            paddingRight: 10,
          },
        }}
      >
        {(props) => (
          <HomeScreen
            {...props}
            setContainerState={setContainerState}
            SairaStencilOne_400Regular={SairaStencilOne_400Regular}
          />
        )}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
