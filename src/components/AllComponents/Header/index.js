import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "native-base";
import T from "prop-types";
import { colors } from "../../../constants/Colors";
import { BackArrowIcon } from "../../../assets/svg";

const Header = ({
  titleText,
  navigation,
  onPress,
  titleRightText,
  ...props
}) => {
  const s = StyleSheet.create({
    containerHeader: {
      width: "100%",
      height: 40,
      backgroundColor: "transparent",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10
    },
    button: {
      borderRadius: 3,
      marginTop: 10,
      marginBottom: 10,
      borderColor: colors.mainBlue
    },
    title: {
      fontSize: 15,
      fontWeight: "500",
      lineHeight: 20,
      marginRight: 10
    },
    hitSlop: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10
    }
  });
  const popUp = () => navigation.pop();

  return (
    <View style={s.containerHeader}>
      <View>
        <TouchableOpacity hitSlop={s.hitSlop} onPress={onPress || popUp}>
          <BackArrowIcon />
        </TouchableOpacity>
      </View>
      {titleText && (
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={s.title}>{titleText}</Text>
        </View>
      )}
      {titleRightText && (
        <View>
          <Text style={s.titleRight}>{titleRightText}</Text>
        </View>
      )}
    </View>
  );
};

Header.propTypes = {
  titleText: T.string,
  titleRightText: T.string,
  onPress: T.func.isRequired
};

export default Header;
