import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button, H3 } from "native-base";
import { colors } from "../../../constants/Colors";

const BlueButton = ({
  text,
  textColor,
  buttonColor,
  onPress,
  opacity,
  bordered,
  ...props
}) => {
  const _textColor = textColor || "white";
  const _text = text || "write Text!!";
  let _buttonColor;
  if (props.disabled) {
    _buttonColor = "#b5b5b5";
  } else {
    _buttonColor = buttonColor || `${colors.blue}`;
  }

  const styles = StyleSheet.create({
    button: {
      borderRadius: 3,
      backgroundColor: _buttonColor,
      padding: 10,
      paddingLeft: 30,
      paddingRight: 30
    },
    button_text: { color: _textColor, fontSize: 18 }
  });

  return (
    <Button style={styles.button} disabled={props.disabled} onPress={onPress}>
      <Text style={styles.button_text}>{_text}</Text>
    </Button>
  );
};

export default BlueButton;
