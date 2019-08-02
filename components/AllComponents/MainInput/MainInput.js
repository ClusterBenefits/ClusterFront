import React from "react";
import { StyleSheet, View } from "react-native";
import { Input, Item, Text } from "native-base";
import T from "prop-types";

const MainInput = ({ onChangeText, error, style, name, width, ...props }) => {
  const styles = StyleSheet.create({
    container: {
      borderColor: "transparent",
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 0,
      width: width || "100%"
    },
    input: {
      borderWidth: 1,
      borderColor: "white",
      borderRadius: 3,
      paddingLeft: 15,
      color: "white",
      backgroundColor: "rgba(255, 255, 255, 0.2)"
    },

    error: {
      color: "white",
      fontSize: 14,
      marginTop: -10,
      marginLeft: 5
    },
    style
  });

  return (
    <View>
      <Item style={styles.container}>
        <Input
          placeholderTextColor={"white"}
          onChangeText={value => onChangeText(name, value)}
          style={[styles.input, style]}
          {...props}
        />
      </Item>
      {error && <Text style={styles.error}>{error[0]}</Text>}
    </View>
  );
};

MainInput.propTypes = {
  onChangeText: T.func.isRequired,
  name: T.string.isRequired
};

export default MainInput;
