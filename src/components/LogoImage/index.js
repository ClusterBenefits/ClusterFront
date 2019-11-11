import React from "react";
import { StyleSheet, Image, View } from "react-native";

const LogoImage = ({ withText = false }) => {
  const s = StyleSheet.create({
    container: {
      flex: 1,
      minHeight: 100,
      maxHeight: 225,
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
    },
    imageWithText: {
      flex: 1,
      width: "100%"
    }
  });

  return (
    <View style={s.container}>
      <Image
        style={s.imageWithText}
        source={
          withText
            ? require("../../assets/images/ITBenefitsLogo3x-1.png")
            : require("../../assets/images/ITBenefitsLogo3x-1.png")
          // : require("../../assets/images/App-Icon-832x3x.png")
        }
        resizeMode="contain"
      />
    </View>
  );
};

export default LogoImage;
