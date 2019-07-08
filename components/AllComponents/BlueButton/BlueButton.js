import React from "react";
import { StyleSheet } from "react-native";
import { Button, H3 } from "native-base";
import { colors } from "../../../constants/Colors";

const BlueButton = ({
  text,
  textColor,
  buttonColor,
  onPress,
  opacity,
  bordered
}) => {
  const _textColor = textColor || "white";
  const _text = text || "write Text!!";
  const _buttonColor = buttonColor || `${colors.blue}`;

  const styles = StyleSheet.create({
    button: {
      borderRadius: 3,
      backgroundColor: _buttonColor,
      marginTop: 10,
      marginBottom: 10,
      opacity: opacity,
      borderColor: colors.white
    },
    button_text: {
      color: _textColor,
      fontFamily: "Helvetica"
    }
  });

  return (
    <Button full onPress={onPress} bordered={bordered} style={styles.button}>
      <H3 style={styles.button_text}>{_text}</H3>
    </Button>
  );
};

export default BlueButton;
