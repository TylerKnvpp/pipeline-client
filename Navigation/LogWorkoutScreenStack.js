import React from "react";
import { Button } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import LogWorkoutScreen from "../Screens/LogWorkout";

const PSTStack = createStackNavigator();

function LogWorkoutStackScreen({
  setContainerState,
  SairaStencilOne_400Regular,
}) {
  return (
    <PSTStack.Navigator>
      <PSTStack.Screen
        name="Log Workout"
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
          <LogWorkoutScreen
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
