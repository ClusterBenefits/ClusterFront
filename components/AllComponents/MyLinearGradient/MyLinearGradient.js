import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const MyLinearGradient = ({ children }) => {
  return (
    <LinearGradient style={{ flex: 1 }} colors={["#eb3a85", "#fa9630"]}>
      {children}
    </LinearGradient>
  );
};

export default MyLinearGradient;
