// @flow

import { Platform, Dimensions } from "react-native";
import { LinearGradient } from "expo";

import variable from "./../variables/platform";

const deviceHeight = Dimensions.get("window").height;
export default (variables /*: * */ = variable) => {
  const theme = {
    flex: 1,
    height: Platform.OS === "ios" ? deviceHeight : deviceHeight - 20,
    // backgroundColor: "orange",
    padding: 20,
    paddingTop: 30
  };

  return theme;
};
