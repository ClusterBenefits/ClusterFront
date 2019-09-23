import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { Container, H3 } from "native-base";
import T from "prop-types";

import { MainItem, MyLinearGradient } from "@components/AllComponents";

export default function FavoriteForm({
  favoriteItems,
  handleFavoriteChange,
  goBarcodeScreen
}) {
  return (
    <MyLinearGradient>
      <Container style={styles.container}>
        <H3 style={{ marginLeft: 10 }}>Organizations</H3>
        {favoriteItems.length > 0 ? (
          <FlatList
            data={favoriteItems}
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
          <H3 style={{ marginLeft: 10 }}>No items in favorite list</H3>
        )}
      </Container>
    </MyLinearGradient>
  );
}

FavoriteForm.propTypes = {
  favoriteItems: T.array.isRequired,
  handleFavoriteChange: T.func.isRequired,
  goBarcodeScreen: T.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 20
  }
});
