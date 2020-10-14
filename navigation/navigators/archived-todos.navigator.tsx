import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ArchivedTodosScreen from "../../screens/todos.screen";
import ArchivedTodoDetailedScreen from "../../screens/todo-detailed.screen";
import ArchivedTodoEditScreen from "../../screens/todo-edit.screen";
import CustomHeaderButton from "../../components/UI/custom-header-button.componen";
import Colors from "../../constants/colors.constants";

type ArchivedTodosNavParamsList = {
  ArchivedTodosScreen: undefined;
  ArchivedTodoDetailedScreen: undefined;
  ArchivedTodoEditScreen: undefined;
};

const Stack = createStackNavigator<ArchivedTodosNavParamsList>();

const ArchivedTodosNavigator: React.FC = () => {
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
      <Stack.Screen name="ArchivedTodosScreen" component={ArchivedTodosScreen} />
      <Stack.Screen
        name="ArchivedTodoDetailedScreen"
        component={ArchivedTodoDetailedScreen}
      />
      <Stack.Screen
        name="ArchivedTodoEditScreen"
        component={ArchivedTodoEditScreen}
      />
    </Stack.Navigator>
  );
};

export default ArchivedTodosNavigator;
