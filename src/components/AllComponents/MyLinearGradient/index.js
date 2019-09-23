import React from "react";
import { KeyboardAvoidingView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const MyLinearGradient = ({ children }) => {
  return (
    <LinearGradient style={{ flex: 1 }} colors={["#eb3a85", "#fa9630"]}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default MyLinearGradient;
