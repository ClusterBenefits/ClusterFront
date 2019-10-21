import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Input, Item, Text, Label } from "native-base";
import T from "prop-types";
import { colors } from "../../constants";

const MainInput = ({
  onChangeText,
  error,
  name,
  width,
  containerStyle,
  placeholder,
  focusedText,
  value,
  ...props
}) => {
  const s = StyleSheet.create({
    container: {
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 0,
      width: width || "100%",
      borderBottomWidth: 2
    },
    error: {
      color: colors.mainRed,
      fontSize: 12,
      marginTop: -10
    },
    placeholder: {
      color: colors.mainGrey
    },
    borderBlue: {
      borderColor: colors.mainBlue
    },
    colorBlue: {
      color: colors.mainBlue
    }
  });

  const [focused, setState] = useState(false);

  return (
    <>
      <Item style={[s.container, focused && s.borderBlue, containerStyle]} floatingLabel error={!!error}>
        <Label style={[s.placeholder, focused && s.colorBlue]}>{placeholder}</Label>
        <Input
          value={value}
          onChangeText={value => onChangeText(name, value)}
          placeholderTextColor={colors.mainGrey}
          onFocus={() => setState(!focused)}
          onBlur={() => setState(!focused)}
          clearButtonMode={"while-editing"}
          maxLength={35}
          {...props}
        />
      </Item>
      {!!error && <Text style={s.error}>{error[0]}</Text>}
    </>
  );
};

MainInput.propTypes = {
  onChangeText: T.func.isRequired,
  name: T.string.isRequired
};

export default MainInput;
