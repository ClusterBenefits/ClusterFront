import React from "react";
import { StyleSheet, Image, View } from "react-native";

const LogoImage = ({ withText = false, noBg = false }) => {
  const s = StyleSheet.create({
    container: {
      flex: 1,
      minHeight: 100,
      maxHeight: 225,
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
    }
  });

  return (
    <View style={s.container}>
      <Image
        style={s.image}
        source={
          withText
            ? require("../../assets/images/MainLogoWithText.png")
            : require("../../assets/images/MainLogo.png")
        }
      />
    </View>
  );
};

export default LogoImage;
