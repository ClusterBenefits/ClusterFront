import React from "react";
import { StyleSheet, View } from "react-native";
import { Input, Item, Text } from "native-base";
import T from "prop-types";

const SimpleInput = ({ onChangeText, error, style, name, ...props }) => {
  const styles = StyleSheet.create({
    container: {
      marginBottom: 5,
      marginLeft: 0,
      height: 40,
      width: props.width || "100%"
    },
    input: {
      paddingBottom: 0,
      marginBottom: -10,
      height: 40,
      borderColor: "red"
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
      <Item style={[styles.container]}>
        <Input
          placeholderTextColor={"white"}
          onChangeText={value => onChangeText(name, value)}
          style={styles.input}
          {...props}
        />
      </Item>
      {error && <Text style={styles.error}>{error[0]}</Text>}
    </View>
  );
};
SimpleInput.propTypes = {
  onChangeText: T.func.isRequired,
  name: T.string.isRequired
};

export default SimpleInput;
