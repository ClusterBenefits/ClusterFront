import React from "react";
import { KeyboardAvoidingView, ScrollView, View, SafeAreaView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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
    <LinearGradient style={s.flexMax} colors={["#fbfcfd", "#f6f7fb"]}>
      <KeyboardAvoidingView style={s.flexMax} behavior="margin">
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