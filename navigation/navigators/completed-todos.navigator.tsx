import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CompletedTodosScreen from "../../screens/todos.screen";
import CompletedTodoDetailedScreen from "../../screens/todo-detailed.screen";
import CompletedTodoEditScreen from "../../screens/todo-edit.screen";
import CustomHeaderButton from "../../components/UI/custom-header-button.componen";
import Colors from "../../constants/colors.constants";

export type CompletedTodosNavParamsList = {
  CompletedTodosScreen: undefined;
  CompletedTodoDetailedScreen: {
    todoId: string;
  };
  CompletedTodoEditScreen: {
    todoId: string;
  };
};

const Stack = createStackNavigator<CompletedTodosNavParamsList>();

const CompletedTodosNavigator: React.FC = () => {
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
      <Stack.Screen
        name="CompletedTodosScreen"
        component={CompletedTodosScreen}
      />
      <Stack.Screen
        name="CompletedTodoDetailedScreen"
        component={CompletedTodoDetailedScreen}
      />
      <Stack.Screen
        name="CompletedTodoEditScreen"
        component={CompletedTodoEditScreen}
      />
    </Stack.Navigator>
  );
};

export default CompletedTodosNavigator;
