import React from "react";
import { KeyboardAvoidingView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const MyLinearGradient = ({ children }) => {
  return (
    <LinearGradient style={{ flex: 1 }} colors={["#fbfcfd", "#f6f7fb"]}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default MyLinearGradient;
// background-image: linear-gradient(180deg, #fbfcfd 0%, #f6f7fb 100%);
