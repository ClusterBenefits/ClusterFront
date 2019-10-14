import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button } from "native-base";
import { colors } from "../../../constants/Colors";
import T from "prop-types";

const SmallBlueButton = ({ text, textColor = "white", buttonColor, onPress, ...props }) => {
  const styles = StyleSheet.create({
    button: {
      borderRadius: 3,
      backgroundColor: props.disabled ? "#b5b5b5" : buttonColor || `${colors.blue}`,
      padding: 10,
      paddingLeft: 30,
      paddingRight: 30
    },
    button_text: { color: textColor, fontSize: 18 }
  });

  return (
    <Button style={styles.button} disabled={props.disabled} onPress={onPress}>
      <Text style={styles.button_text}>{text}</Text>
    </Button>
  );
};

SmallBlueButton.propTypes = {
  text: T.string.isRequired,
  onPress: T.func.isRequired,
  textColor: T.string,
  buttonColor: T.string
};

export default SmallBlueButton;
