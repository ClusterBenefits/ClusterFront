import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { H1, H3 } from "native-base";
import T from "prop-types";

import { colors } from "../../../constants";
import { ButtonModal } from "../../../services/mainModal";
import { MyLinearGradient, MainItem } from "../../../components";

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

export default function ListScreenForm({ items, handleFavoriteChange, subscribed }) {
  return (
    <MyLinearGradient>
      <H1 style={s.mainText}>Мої картки</H1>
      {subscribed ? (
        <FlatList
          data={items}
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
        <H3 style={s.extraMarginLeft}>Subscribe to see items</H3>
      )}
    </MyLinearGradient>
  );
}

ListScreenForm.propTypes = {
  items: T.array.isRequired,
  handleFavoriteChange: T.func.isRequired
};
