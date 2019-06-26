import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button, H3, H1 } from "native-base";
import { colors } from "../../../constants/Colors";

const BlueButton = ({
  height,
  text,
  fontSize,
  textColor,
  buttonColor,
  onPress,
  opacity,
  bordered
}) => {
  const _height = height || 50;
  const _textColor = textColor || "white";
  const _fontSize = fontSize || 20;
  const _text = text || "write Text!!";
  const _buttonColor = buttonColor || `${colors.blue}`;
  const _onPress = onPress;

  const styles = StyleSheet.create({
    button: {
      borderRadius: 3,
      height: _height,
      backgroundColor: _buttonColor,
      marginTop: 10,
      marginBottom: 10,
      opacity: opacity,
      borderColor: colors.white
    },
    button_text: {
      // fontSize: _fontSize,
      color: _textColor,
      fontFamily: "Helvetica"
    }
  });

  return (
    <Button full onPress={_onPress} bordered={bordered} style={styles.button}>
      <H3 style={styles.button_text}>{_text}</H3>
    </Button>
  );
};

export default BlueButton;
