import React from "react";
import { StyleSheet, View } from "react-native";

const Center: React.FC = ({ children }) => {
  return <View style={styles.screen}>{children}</View>;
};

export default Center;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
});
