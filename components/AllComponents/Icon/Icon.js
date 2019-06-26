import React from "react";
import { createIconSetFromFontello } from "react-native-vector-icons";
import FontelloConfig from "../../../assets/fonts/font-icons/config.json";

const Fontello = createIconSetFromFontello(FontelloConfig);
const Icon = props => {
  return <Fontello color={props.color} size={props.size} name={props.name} />;
};

export default Icon;
