import React from "react";
import { KeyboardAvoidingView, ScrollView, View, SafeAreaView, StyleSheet, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../constants";

const s = StyleSheet.create({
  flexMax: {
    flex: 1
  }
});

const Container = ({ children, withScroll = false, style }) => {
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
      <SafeAreaView style={s.flexMax}>
        <KeyboardAvoidingView
          style={s.flexMax}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          enabled
        >
          <ViewComponent {...scrollProps} style={[!withScroll && s.flexMax, style]}>
            {children}
          </ViewComponent>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Container;
