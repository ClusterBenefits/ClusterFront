// @flow

import variable from "./../variables/platform";

export default (variables /*: * */ = variable) => {
  const h1Theme = {
    color: variables.textColor,
    fontSize: variables.fontSizeH1,
    lineHeight: variables.lineHeightH1,
    marginTop: 10,
    marginBottom: 5
  };

  return h1Theme;
};
