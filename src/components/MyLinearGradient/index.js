import React from "react";
import { KeyboardAvoidingView, ScrollView, View, SafeAreaView, StyleSheet, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../constants";

const s = StyleSheet.create({
  flexMax: {
    flex: 1
  }
});

const MyLinearGradient = ({ children, withScroll = false, style }) => {
  const ViewComponent = withScroll ? ScrollView : View;
  const scrollProps = withScroll
    ? {
        showsVerticalScrollIndicator: false,
        keyboardShouldPersistTaps: "always",
        contentContainerStyle: { flexGrow: 1 }
      }
    : {};
  return (
    <LinearGradient style={s.flexMax} colors={[colors.linearGradientStart, colors.linearGradientEnd]}>
      <KeyboardAvoidingView style={s.flexMax} behavior={Platform.OS === "ios" ? "padding" : "margin"}>
        <SafeAreaView style={s.flexMax}>
          <ViewComponent {...scrollProps} style={[!withScroll && s.flexMax, style]}>
            {children}
          </ViewComponent>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default MyLinearGradient;
