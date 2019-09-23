import React from "react";
import { StyleSheet } from "react-native";
import { Button, H3 } from "native-base";
import T from "prop-types";
import { colors } from "../../../constants/Colors";

const BlueButton = ({
  text,
  textColor = "white",
  buttonColor = `${colors.blue}`,
  onPress,
  bordered,
  ...props
}) => {
  const styles = StyleSheet.create({
    button: {
      borderRadius: 3,
      backgroundColor: buttonColor,
      marginTop: 10,
      marginBottom: 10,
      borderColor: colors.white
    },
    button_text: {
      color: textColor,
      fontFamily: "Helvetica"
    }
  });

  return (
    <Button
      full
      onPress={onPress}
      bordered={bordered}
      style={styles.button}
      {...props}
    >
      <H3 style={styles.button_text}>{text}</H3>
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
