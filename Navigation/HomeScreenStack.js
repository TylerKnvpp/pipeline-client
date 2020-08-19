import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/Home";
import PipelineScreen from "../Screens/Pipeline";
import PipelinesScreen from "../Screens/Pipelines";

const HomeStack = createStackNavigator();

function HomeStackScreen({
  setContainerState,
  SairaStencilOne_400Regular,
  navigation,
  updateUserState,
}) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        options={{
          headerRight: () => (
            <Button
              title="Pipeline"
              onPress={() => navigation.navigate("Pipeline")}
            />
          ),
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

      <HomeStack.Screen
        name="Pipeline"
        options={{
          headerRight: () => (
            <Button
              title="View All"
              onPress={() => navigation.navigate("Pipelines")}
            />
          ),
          headerRightContainerStyle: {
            paddingRight: 10,
          },
        }}
      >
        {(props) => (
          <PipelineScreen
            {...props}
            setContainerState={setContainerState}
            SairaStencilOne_400Regular={SairaStencilOne_400Regular}
          />
        )}
      </HomeStack.Screen>

      <HomeStack.Screen name="Pipelines">
        {(props) => (
          <PipelinesScreen
            {...props}
            updateUserState={updateUserState}
            setContainerState={setContainerState}
            SairaStencilOne_400Regular={SairaStencilOne_400Regular}
          />
        )}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
