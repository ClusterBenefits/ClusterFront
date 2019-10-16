import React from "react";
import { StatusBar, View, Platform, StyleSheet } from "react-native";
import { isIphoneX } from "../../utils";
import { colors } from "../../constants";

const iosHeight = isIphoneX ? 44 : 20;

const s = StyleSheet.create({
  statusBar: {
    backgroundColor: colors.mainWhite,
    height: Platform.OS === "ios" ? iosHeight : StatusBar.currentHeight
  }
});

const CustomStatusBar = () => (
  <View style={s.statusBar}>
    <StatusBar translucent barStyle="dark-content" backgroundColor={colors.mainWhite} />
  </View>
);

export default CustomStatusBar;
