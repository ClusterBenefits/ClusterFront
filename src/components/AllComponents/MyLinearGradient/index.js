import React from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Platform, Dimensions } from "react-native";

const deviceHeight = Dimensions.get("window").height;

const MyLinearGradient = ({ children, withScroll = false, style }) => {
  const ViewComponent = withScroll ? ScrollView : View;
  const scrollProps = withScroll
    ? {
        showsVerticalScrollIndicator: false,
        contentContainerStyle: { flexGrow: 1 }
      }
    : {};
  return (
    <LinearGradient
      style={{
        flex: 1,
        height: Platform.OS === "ios" ? deviceHeight : deviceHeight - 20
      }}
      colors={["#fbfcfd", "#f6f7fb"]}
    >
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ViewComponent {...scrollProps} style={[!withScroll && { flex: 1 }, style]}>
          {children}
        </ViewComponent>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default MyLinearGradient;
