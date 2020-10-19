import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import PendingTodosScreen from "../../screens/todos.screen";
import PendingTodoDetailedScreen from "../../screens/todo-detailed.screen";
import PendingTodoEditScreen from "../../screens/todo-edit.screen";
import CustomHeaderButton from "../../components/UI/custom-header-button.componen";
import Colors from "../../constants/colors.constants";

export type PendingTodosNavParamsList = {
  PendingTodosScreen: undefined;
  PendingTodoDetailedScreen: {
    todoId: string;
  };
  PendingTodoEditScreen: {
    todoId?: string;
  };
};

const Stack = createStackNavigator<PendingTodosNavParamsList>();

const PendingTodosNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => {
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
                <Item
                  title="Menu"
                  iconName="md-calendar"
                  onPress={navigation.toggleDrawer}
                />
              </HeaderButtons>
            );
          },
          headerTitle: () => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TextInput
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "white",
                    width: 100,
                    textAlign: "center",
                    color: "white",
                  }}
                />
                <Ionicons name="md-search" size={23} color="white" />
              </View>
            );
          },
          headerRight: (props) => {
            return (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Save Todo"
                  iconName="md-checkmark"
                  onPress={navigation.toggleDrawer}
                />
                <Item
                  title="Add Todo"
                  iconName="md-add"
                  onPress={() => navigation.navigate("PendingTodoEditScreen")}
                />
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
