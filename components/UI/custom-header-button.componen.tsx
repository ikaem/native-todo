import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors.constants";

const CustomHeaderButton: React.FC = (props: any) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Colors.pale}
    />
  );
};

export default CustomHeaderButton;
