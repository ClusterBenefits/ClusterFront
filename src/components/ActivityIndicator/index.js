import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import T from "prop-types";

const CustomActivityIndicator = ({ scale = 1, size = "small" }) => {
  const styles = StyleSheet.create({
    container: {
      marginVertical: 15
    }
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} transform={[{ scale }]} />
    </View>
  );
};

ActivityIndicator.propTypes = {
  scale: T.number,
  size: T.string
};

export default CustomActivityIndicator;
