import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "native-base";
import Icon from "../Icon";
import T from "prop-types";

const IconButton = ({ text, onPress, ...props }) => {
  const styles = StyleSheet.create({
    button: {
      borderColor: props.borderColor || "transparent",
      backgroundColor: props.backgroundColor || "transparent",
      padding: 10
    },
    button_text: {
      color: props.textColor || "white",
      fontSize: props.fontSize || 18,
      marginLeft: props.marginLeft || 10
    }
  });

  return (
    <Button onPress={onPress} bordered style={styles.button} upperCase>
      <Icon
        name={props.name || "left"}
        color={props.color || "white"}
        size={props.size || 18}
      />
      <Text uppercase={false} style={styles.button_text}>
        {text}
      </Text>
    </Button>
  );
};
IconButton.propTypes = {
  text: T.string.isRequired,
  onPress: T.func.isRequired
};

export default IconButton;
