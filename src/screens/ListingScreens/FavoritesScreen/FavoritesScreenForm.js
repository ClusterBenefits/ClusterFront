import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { H1, H3 } from "native-base";
import T from "prop-types";

import { MainItem, Container } from "../../../components";
import { colors } from "../../../constants";
import { ButtonModal } from "../../../services/mainModal";

const s = StyleSheet.create({
  mainText: {
    marginTop: 50,
    paddingLeft: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.mainGrey
  },
  extraMarginLeft: {
    marginLeft: 10
  }
});

export default function FavoriteForm({ favoriteItems, handleFavoriteChange }) {
  return (
    <Container>
      <H1 style={s.mainText}>Улюблені</H1>
      {favoriteItems && favoriteItems.length > 0 ? (
        <FlatList
          data={favoriteItems}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <MainItem
              item={item}
              onPress={ButtonModal.showModal}
              handleFavoriteChange={handleFavoriteChange}
            />
          )}
        />
      ) : (
        <H3 style={s.extraMarginLeft}>Немає улюблених знижок</H3>
      )}
    </Container>
  );
}

FavoriteForm.propTypes = {
  favoriteItems: T.array,
  handleFavoriteChange: T.func.isRequired
};
