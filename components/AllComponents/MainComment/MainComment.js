import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, ListItem } from "native-base";

import T from "prop-types";

comment.propTypes = {
  item: T.object
};

export default function comment({ item }) {
  return (
    <ListItem style={styles.listItem}>
      <View style={styles.text}>
        <Text style={styles.text}>Name : {item.user.first_name}</Text>
        <Text style={styles.text}>Email : {item.user.email}</Text>
        <Text style={styles.text}>Comment : {item.message}</Text>
        {item.created_at ? (
          <Text style={styles.end}>Date: {item.created_at.slice(0, 10)}</Text>
        ) : null}
      </View>
    </ListItem>
  );
}

const styles = StyleSheet.create({
  listItem: {
    marginLeft: 0,
    paddingLeft: 10,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5
  },
  text: {
    width: "100%"
  },
  end: {
    marginTop: 5,
    alignSelf: "flex-end"
  }
});
