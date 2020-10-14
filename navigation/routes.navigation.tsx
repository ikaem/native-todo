import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import DrawerNavigator from "./navigators/drawer.navigator";

const RoutesNavigation: React.FC = () => {
  return (
    <NavigationContainer >
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default RoutesNavigation;
