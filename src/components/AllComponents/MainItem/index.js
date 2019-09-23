import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { Text, ListItem } from "native-base";
import { colors } from "../../../constants/Colors";
import Icon from "../Icon";
import T from "prop-types";
import { url } from "../../../actions/userActions";

export default function list({ item, goBarcodeScreen, handleFavoriteChange }) {
  return (
    <ListItem style={styles.container}>
      <TouchableOpacity
        style={styles.container_item}
        onPress={() => goBarcodeScreen(item)}
      >
        <Image
          source={{ uri: `${url}${item.image.tiny.url}` }}
          style={styles.image}
        />
        <Text style={styles.flex}>{item.fields.name}</Text>
        <Text style={styles.marginRight}>Discount {item.fields.discount}%</Text>
        <TouchableOpacity onPress={() => handleFavoriteChange(item)}>
          <Icon
            name={item.featured ? "star" : "star-empty"}
            color={colors.orange}
            size={35}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </ListItem>
  );
}

list.propTypes = {
  item: T.object.isRequired,
  goBarcodeScreen: T.func.isRequired,
  handleFavoriteChange: T.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 0,
    paddingLeft: 10,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5
  },
  container_item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  image: {
    height: 40,
    width: 40,
    marginRight: 15
  },
  flex: {
    flex: 1
  },
  marginRight: {
    marginRight: 15
  }
});
