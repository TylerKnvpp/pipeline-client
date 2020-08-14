import React from "react";
import { Button } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import LogWorkoutScreen from "../Screens/LogWorkout";
import PastPSTsScreen from "../Screens/PastPSTs";
import LogScreen from "../Screens/Log";

const PSTStack = createStackNavigator();

function LogWorkoutStackScreen({
  setContainerState,
  SairaStencilOne_400Regular,
  navigation,
}) {
  return (
    <PSTStack.Navigator>
      <PSTStack.Screen
        name="Standards"
        options={{
          headerRight: () => (
            <Button
              title="Past PST's"
              onPress={() => navigation.navigate("Past PSTs")}
            />
          ),
          headerRightContainerStyle: {
            paddingRight: 10,
          },
        }}
      >
        {(props) => (
          <LogWorkoutScreen
            {...props}
            setContainerState={setContainerState}
            SairaStencilOne_400Regular={SairaStencilOne_400Regular}
          />
        )}
      </PSTStack.Screen>

      <PSTStack.Screen
        name="New PST"
        // options={{
        //   headerRight: () => (
        //     <Button
        //       title="Pipeline"
        //       onPress={() => navigation.navigate("Pipeline")}
        //     />
        //   ),
        //   headerRightContainerStyle: {
        //     paddingRight: 10,
        //   },
        // }}
      >
        {(props) => (
          <LogScreen
            {...props}
            setContainerState={setContainerState}
            SairaStencilOne_400Regular={SairaStencilOne_400Regular}
          />
        )}
      </PSTStack.Screen>

      <PSTStack.Screen name="Past PSTs">
        {(props) => (
          <PastPSTsScreen
            {...props}
            setContainerState={setContainerState}
            SairaStencilOne_400Regular={SairaStencilOne_400Regular}
          />
        )}
      </PSTStack.Screen>
    </PSTStack.Navigator>
  );
}

export default LogWorkoutStackScreen;
