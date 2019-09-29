// @flow

import variable from "./../variables/platform";
import { colors } from "../../constants";

export default (variables /*: * */ = variable) => {
  const iconTheme = {
    fontSize: variables.iconFontSize,
    color: colors.mainGrey
  };

  return iconTheme;
};
