import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import PendingTodosScreen from "../../screens/todos.screen";
import PendingTodoDetailedScreen from "../../screens/todo-detailed.screen";
import PendingTodoEditScreen from "../../screens/todo-edit.screen";
import CustomHeaderButton from "../../components/UI/custom-header-button.componen";
import Colors from "../../constants/colors.constants";

export type PendingTodosNavParamsList = {
  PendingTodosScreen: undefined;
  PendingTodoDetailedScreen: undefined;
  PendingTodoEditScreen: undefined;
};

const Stack = createStackNavigator<PendingTodosNavParamsList>();

const PendingTodosNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => {
        return {
          headerStyle: {
            backgroundColor: Colors.dark,
          },
          headerTitleStyle: {
            color: Colors.pale,
          },
          headerTitleAlign: "center",
          headerLeft: ({ canGoBack }) => {
            return (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName="md-menu"
                  onPress={navigation.toggleDrawer}
                />
                {canGoBack && (
                  <Item
                    title="Back"
                    iconName="md-arrow-back"
                    onPress={navigation.goBack}
                  />
                )}
              </HeaderButtons>
            );
          },
        };
      }}
    >
      <Stack.Screen name="PendingTodosScreen" component={PendingTodosScreen} />
      <Stack.Screen
        name="PendingTodoDetailedScreen"
        component={PendingTodoDetailedScreen}
      />
      <Stack.Screen
        name="PendingTodoEditScreen"
        component={PendingTodoEditScreen}
      />
    </Stack.Navigator>
  );
};

export default PendingTodosNavigator;
