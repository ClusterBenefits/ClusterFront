import React from "react";
import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { Text, ListItem } from "native-base";
import { colors } from "../../constants/Colors";
import T from "prop-types";
import { url } from "../../constants";
import { FavoritesIcon, FavoritesIconOutLine } from "../../assets/svg";

const styles = StyleSheet.create({
  container: {
    height: 90,
    marginLeft: 0,
    paddingHorizontal: 15,
    paddingVertical: 12
  },
  container_item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  imageContainer: {
    height: 64,
    width: 64,
    justifyContent: "center"
  },
  image: {
    height: 40,
    width: 40,
    marginRight: 15
  },
  flex: {
    flex: 1
  },
  mainText: {
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 20,
    alignSelf: "flex-start"
  },
  secondaryText: {
    fontWeight: "500",
    lineHeight: 20,
    color: colors.mainGrey,
    marginTop: 10,
    alignSelf: "flex-start"
  }
});

export default function list({ item, onPress, handleFavoriteChange }) {
  return (
    <ListItem style={styles.container}>
      <TouchableOpacity style={styles.container_item} onPress={() => onPress({ item })}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: `${url}${item.image.tiny.url}` }} style={styles.image} />
        </View>
        <View style={styles.flex}>
          <Text numberOfLines={1} style={styles.mainText}>
            {item.fields.name}
          </Text>
          <Text numberOfLines={1} style={styles.secondaryText}>
            Знижка {item.fields.discount}%
          </Text>
        </View>
        <TouchableOpacity onPress={() => handleFavoriteChange(item)}>
          {item.featured ? <FavoritesIcon fill={colors.mainRed} /> : <FavoritesIconOutLine />}
        </TouchableOpacity>
      </TouchableOpacity>
    </ListItem>
  );
}

list.propTypes = {
  item: T.object.isRequired,
  onPress: T.func.isRequired,
  handleFavoriteChange: T.func.isRequired
};
