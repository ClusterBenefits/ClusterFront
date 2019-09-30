import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { Container, H1, H3 } from "native-base";
import T from "prop-types";

import { MainItem, MyLinearGradient } from "@components/AllComponents";
import { colors } from "../../../constants";

export default function FavoriteForm({
  favoriteItems,
  handleFavoriteChange,
  goBarcodeScreen
}) {
  return (
    <MyLinearGradient>
      <H1 style={s.mainText}>Улюблені</H1>
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
    </MyLinearGradient>
  );
}

FavoriteForm.propTypes = {
  favoriteItems: T.array.isRequired,
  handleFavoriteChange: T.func.isRequired,
  goBarcodeScreen: T.func.isRequired
};

const s = StyleSheet.create({
  mainText: {
    marginTop: 50,
    paddingLeft: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.mainGrey
  },
  container: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 20
  }
});
