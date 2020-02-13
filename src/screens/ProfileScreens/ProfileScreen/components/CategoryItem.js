import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, ListItem } from "native-base";
import T from "prop-types";
import {
  EmailIcon,
  PasswordIcon,
  BillingInformationIcon,
  SupportIcon,
  LogOutIcon
} from "../../../../assets/svg";

import { StyleSheet } from "react-native";

const s = StyleSheet.create({
  categoryContainer: {
    height: 56,
    marginLeft: 0
  },
  touchableContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20
  },
  icon: {
    alignItems: "center",
    width: 50,
    marginRight: 20
  },
  lastItemMargin: {
    marginTop: 20
  }
});

const iconGenerator = name => {
  switch (name) {
    case "Змінити емайл":
      return <EmailIcon />;
    case "Змінити пароль":
      return <PasswordIcon />;
    case "Інформація про підписку":
      return <BillingInformationIcon />;
    case "Підтримка":
      return <SupportIcon />;
    case "Вийти":
      return <LogOutIcon />;
    default:
      return <EmailIcon />;
  }
};

const CategoryItem = ({ onPress = () => {}, text = "Category", screenName = "", lastItem = false }) => (
  <ListItem style={[s.categoryContainer, lastItem && s.lastItemMargin]}>
    <TouchableOpacity style={s.touchableContainer} onPress={() => onPress(screenName)}>
      <View style={s.icon}>{iconGenerator(text)}</View>
      <Text>{text}</Text>
    </TouchableOpacity>
  </ListItem>
);

CategoryItem.propTypes = {
  onPress: T.func.isRequired,
  text: T.string.isRequired,
  screenName: T.string.isRequired,
  lastItem: T.bool
};

export default CategoryItem;
