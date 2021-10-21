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
import { MaterialIcons } from '@expo/vector-icons'; 
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
  },
  disable: {
    backgroundColor: '#00000020'
  },
  text: {
    color: "#808080"
  }
});

const iconGenerator = (name, disable) => {
  switch (name) {
    case "Змінити емайл":
      return <EmailIcon />;
    case "Змінити пароль":
      return <PasswordIcon />;
    case "Інформація про підписку":
      return <BillingInformationIcon fill={disable? '#80808090': '#afb4c4'} />;
    case "Підтримка":
      return <SupportIcon />;
    case "Вийти":
      return <LogOutIcon />;
    case "Політика конфіденційності": 
      return <MaterialIcons name="privacy-tip" size={24} color="#afb4c4" />
    default:
      return <EmailIcon />;
  }
};

const CategoryItem = ({ onPress = () => {}, text = "Category", screenName = "", lastItem = false, disable = false }) => (
  <ListItem style={[s.categoryContainer, lastItem && s.lastItemMargin, disable? s.disable: {} ]}>
    <TouchableOpacity 
      activeOpacity={disable? 1: 0.2}
      style={s.touchableContainer} 
      onPress={() => onPress(screenName)}>
      <View style={s.icon}>{iconGenerator(text, disable)}</View>
      <Text style={disable? s.text: {}}>{text}</Text>
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
