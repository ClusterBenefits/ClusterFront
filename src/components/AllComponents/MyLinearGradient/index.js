import React from "react";
import { KeyboardAvoidingView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Platform, Dimensions } from "react-native";

const deviceHeight = Dimensions.get("window").height;

const MyLinearGradient = ({ children }) => {
  return (
    <LinearGradient
      style={{
        flex: 1,
        height: Platform.OS === "ios" ? deviceHeight : deviceHeight - 200
      }}
      colors={["#fbfcfd", "#f6f7fb"]}
    >
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default MyLinearGradient;
