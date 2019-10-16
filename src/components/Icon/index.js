import React from "react";
import T from "prop-types";
import { createIconSetFromFontello } from "react-native-vector-icons";
import FontelloConfig from "../../assets/fonts/font-icons/config.json";

const Fontello = createIconSetFromFontello(FontelloConfig);
const Icon = ({ color, size, name }) => {
  return <Fontello color={color} size={size} name={name} />;
};
Icon.propTypes = {
  color: T.string.isRequired,
  size: T.number.isRequired,
  name: T.string.isRequired
};

export default Icon;
