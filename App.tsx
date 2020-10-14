import { StatusBar } from "expo-status-bar";
import React from "react";
import { enableScreens } from "react-native-screens";

import AppProviders from "./providers/app.providers";

enableScreens();

export default function App() {
  return (
    <>
      <StatusBar style="inverted" />
      <AppProviders />
    </>
  );
}
