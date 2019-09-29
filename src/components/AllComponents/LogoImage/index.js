import React from "react";
import { StyleSheet, Image, View } from "react-native";

const LogoImage = ({ withText = false }) => {
  const s = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f6f7fb"
    },
    image: {
      // justifyContent: "center",
      // alignItems: "center"
    }
  });

  return (
    <View style={s.container}>
      <Image
        style={s.image}
        source={
          withText
            ? require("../../../assets/images/MainLogoWithText.png")
            : require("../../../assets/images/MainLogo.png")
        }
      />
    </View>
  );
};

export default LogoImage;
