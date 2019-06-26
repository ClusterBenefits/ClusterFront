import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { Container, H3 } from "native-base";
import { MainItem, MyLinearGradient } from "@components/AllComponents";

import T from "prop-types";

list.propTypes = {
  items: T.array,
  goBarcodeScreen: T.func,
  fetchNewItems: T.func,
  handleFavoriteChange: T.func
};
export default function list({ goBarcodeScreen, items, handleFavoriteChange }) {
  return (
    <MyLinearGradient>
      <Container style={styles.container}>
        <H3 style={{ marginLeft: 10 }}>Organizations</H3>
        <FlatList
          data={items}
          // extraData={this.props}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <MainItem
              item={item}
              goBarcodeScreen={goBarcodeScreen}
              handleFavoriteChange={handleFavoriteChange}
            />
          )}
        />
      </Container>
    </MyLinearGradient>
  );
}
// ffcd02
const styles = StyleSheet.create({
  container: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 20
  },
  mainContent: {
    flex: 1,
    marginRight: 5
  }
});
