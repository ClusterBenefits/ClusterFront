// @flow

import variable from "./../variables/platform";

export default (variables /*: * */ = variable) => {
  const h3Theme = {
    color: variables.textColor,
    fontSize: variables.fontSizeH3,
    lineHeight: variables.lineHeightH3,
    marginTop: 10,
    marginBottom: 5
  };

  return h3Theme;
};
