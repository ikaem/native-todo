import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import PendingTodosNavigator from "./pending-todos.navigator";
import ExpiredTodosNavigator from "./expired-todos.navigator";
import CompletedTodosNavigator from "./completed-todos.navigator";
import ArchivedTodosNavigator from "./archived-todos.navigator";

type DrawerNavParamsList = {
  PendingTodosNavigator: undefined;
  ExpiredTodosNavigator: undefined;
  CompletedTodosNavigator: undefined;
  ArchivedTodosNavigator: undefined;
};

const Drawer = createDrawerNavigator<DrawerNavParamsList>();

const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="PendingTodosNavigator"
        component={PendingTodosNavigator}
      />
      <Drawer.Screen
        name="ExpiredTodosNavigator"
        component={ExpiredTodosNavigator}
      />
      <Drawer.Screen
        name="CompletedTodosNavigator"
        component={CompletedTodosNavigator}
      />
      <Drawer.Screen
        name="ArchivedTodosNavigator"
        component={ArchivedTodosNavigator}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
