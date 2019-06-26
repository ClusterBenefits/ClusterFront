import React from "react";
import { StyleSheet, Image, View } from "react-native";

const LogoImage = ({}) => {
  const styles = StyleSheet.create({
    image: {
      height: 115,
      width: 130,
      justifyContent: "center",
      alignItems: "center"
    }
  });

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Image
        style={styles.image}
        source={{
          uri:
            "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png"
        }}
      />
    </View>
  );
};

export default LogoImage;
