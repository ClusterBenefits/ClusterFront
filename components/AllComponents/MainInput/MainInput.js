import React from "react";
import { StyleSheet, View } from "react-native";
import { Input, Item, Icon, Text } from "native-base";

const MainInput = ({
  onChangeText,
  name,
  value,
  error,
  style,
  width,
  ...props
}) => {
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
    style,
    error: {
      color: "white",
      fontSize: 14,
      marginTop: -10,
      marginLeft: 5
    }
  });

  return (
    <View style={{ transition: 0.5 }}>
      <Item style={styles.container}>
        <Input
          value={value}
          name={name}
          placeholderTextColor={"white"}
          selectionColor={"white"}
          onChangeText={value => onChangeText(name, value)}
          style={[styles.input, style]}
          {...props}
        />
      </Item>
      {error && <Text style={styles.error}>{error[0]}</Text>}
    </View>
  );
};

export default MainInput;
