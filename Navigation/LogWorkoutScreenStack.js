import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import LogWorkoutScreen from "../Screens/Home";

const LogWorkout = createStackNavigator();

function LogWorkoutStackScreen() {
  return (
    <LogWorkout.Navigator>
      <LogWorkout.Screen name="LogWorkout" component={LogWorkoutScreen} />
    </LogWorkout.Navigator>
  );
}

export default LogWorkoutStackScreen;
