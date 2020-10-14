import React from "react";

import RoutesNavigation from "../navigation/routes.navigation";
import StoreProvider from "../store/store.provider";

const AppProviders: React.FC = () => {
  return (
    <StoreProvider>
      <RoutesNavigation />
    </StoreProvider>
  );
};

export default AppProviders;
