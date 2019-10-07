import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "native-base";
import T from "prop-types";
import { colors } from "../../../constants/Colors";

const BlueButton = ({
  text,
  textColor = "white",
  onPress,
  bordered,
  disabled = false,
  style,
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
      color: textColor
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
      style={[s.button, !disabled && s.backgroundColor, style]}
      disabled={disabled}
      {...props}
    >
      <Text style={s.button_text}>{text}</Text>
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
