import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { Container, H3 } from "native-base";
import T from "prop-types";

import { MainItem, MyLinearGradient } from "@components/AllComponents";

list.propTypes = {
  items: T.array,
  goBarcodeScreen: T.func,
  handleFavoriteChange: T.func
};
export default function list({
  goBarcodeScreen,
  items,
  handleFavoriteChange,
  subscription
}) {
  return (
    <MyLinearGradient>
      <Container style={styles.container}>
        <H3 style={{ marginLeft: 10 }}>Organizations</H3>
        {subscription ? (
          <FlatList
            data={items}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <MainItem
                item={item}
                goBarcodeScreen={goBarcodeScreen}
                handleFavoriteChange={handleFavoriteChange}
              />
            )}
          />
        ) : (
          <H3 style={{ marginLeft: 10 }}>Subscribe to see items</H3>
        )}
      </Container>
    </MyLinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 20
  }
});
