import { Dimensions, Platform, StatusBar } from "react-native";

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const { height: W_HEIGHT, width: W_WIDTH } = Dimensions.get("window");

export const isIphoneX =
  Platform.OS === "ios"
    ? (W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT) || (W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT)
    : false;

export const getStatusBarHeight = skipAndroid =>
  Platform.select({
    ios: isIphoneX ? 44 : 20,
    android: skipAndroid ? 0 : StatusBar.currentHeight,
    default: 0
  });
