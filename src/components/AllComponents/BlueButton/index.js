import React from "react";
import { StyleSheet } from "react-native";
import { Button, H3 } from "native-base";
import T from "prop-types";
import { colors } from "../../../constants/Colors";

const BlueButton = ({
  text,
  textColor = "white",
  onPress,
  bordered,
  disabled = false,
  ...props
}) => {
  const s = StyleSheet.create({
    button: {
      borderRadius: 3,
      marginTop: 10,
      marginBottom: 10,
      borderColor: colors.mainBlue
    },
    button_text: {
      color: textColor,
      fontFamily: "Helvetica"
    },
    backgroundColor: {
      backgroundColor: colors.mainBlue
    }
  });

  return (
    <Button
      full
      onPress={onPress}
      bordered={bordered}
      style={[s.button, !disabled && s.backgroundColor]}
      disabled={disabled}
      {...props}
    >
      <H3 style={s.button_text}>{text}</H3>
    </Button>
  );
};

BlueButton.propTypes = {
  text: T.string.isRequired,
  onPress: T.func.isRequired,
  textColor: T.string,
  buttonColor: T.string,
  bordered: T.bool
};

export default BlueButton;
