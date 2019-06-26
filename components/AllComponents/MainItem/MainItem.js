import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { H3, Text, ListItem } from "native-base";
import { Icon } from "@components/AllComponents";
import T from "prop-types";
import { url } from "../../../actions/userActions";

list.propTypes = {
  item: T.object,
  goBarcodeScreen: T.func,
  handleFavoriteChange: T.func
};

export default function list({ item, goBarcodeScreen, handleFavoriteChange }) {
  const starName = item.featured ? "star" : "star-empty";
  return (
    <ListItem style={styles.listItem}>
      <TouchableOpacity
        style={styles.Item}
        onPress={() => goBarcodeScreen(item)}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            source={{ uri: `${url}${item.image.tiny.url}` }}
            style={styles.image}
          />

          <Text style={styles.h2}>{item.fields.name}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ marginRight: 15 }}>
            Discount {item.fields.discount}%
          </Text>

          <TouchableOpacity onPress={() => handleFavoriteChange(item)}>
            <Icon name={starName} color="#ffcd02" size={35} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </ListItem>
  );
}
// 007AFF
// ffcd02
const styles = StyleSheet.create({
  Item: {
    // height: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  listItem: {
    marginLeft: 0,
    paddingLeft: 10,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5
  },
  image: {
    height: 40,
    width: 40,
    marginRight: 15
  }
});
