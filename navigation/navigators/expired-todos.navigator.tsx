import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ExpiredTodosScreen from "../../screens/todos.screen";
import ExpiredTodoDetailedScreen from "../../screens/todo-detailed.screen";
import ExpiredTodoEditScreen from "../../screens/todo-edit.screen";
import CustomHeaderButton from "../../components/UI/custom-header-button.componen";
import Colors from "../../constants/colors.constants";

type ExpiredTodosNavParamsList = {
  ExpiredTodosScreen: undefined;
  ExpiredTodoDetailedScreen: undefined;
  ExpiredTodoEditScreen: undefined;
};

const Stack = createStackNavigator<ExpiredTodosNavParamsList>();

const ExpiredTodosNavigator: React.FC = () => {
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
      <Stack.Screen name="ExpiredTodosScreen" component={ExpiredTodosScreen} />
      <Stack.Screen
        name="ExpiredTodoDetailedScreen"
        component={ExpiredTodoDetailedScreen}
      />
      <Stack.Screen
        name="ExpiredTodoEditScreen"
        component={ExpiredTodoEditScreen}
      />
    </Stack.Navigator>
  );
};

export default ExpiredTodosNavigator;
