import React from "react";
import HomeScreen from "../Screens/Home";
import AddSkillsScreen from "../Screens/AddSkills";
import SelectPipelineScreen from "../Screens/SelectPipeline";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../Context/AuthContext";

const Stack = createStackNavigator();

function UserProfileSetupStackNav({
  setContainerState,
  SairaStencilOne_400Regular,
}) {
  const authContextData = React.useContext(AuthContext);

  return (
    <Stack.Navigator>
      {/* {authContextData.state.user.skills.length === 0 ? ( */}

      <Stack.Screen name="Home">
        {(props) => (
          <HomeScreen
            {...props}
            setContainerState={setContainerState}
            SairaStencilOne_400Regular={SairaStencilOne_400Regular}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Add Skills">
        {(props) => (
          <AddSkillsScreen
            {...props}
            setContainerState={setContainerState}
            SairaStencilOne_400Regular={SairaStencilOne_400Regular}
          />
        )}
      </Stack.Screen>
      {/* ) : ( */}
      <>
        <Stack.Screen name="Select Pipeline">
          {(props) => (
            <SelectPipelineScreen
              {...props}
              setContainerState={setContainerState}
              SairaStencilOne_400Regular={SairaStencilOne_400Regular}
            />
          )}
        </Stack.Screen>
      </>
      {/* )} */}
    </Stack.Navigator>
  );
}

export default UserProfileSetupStackNav;
