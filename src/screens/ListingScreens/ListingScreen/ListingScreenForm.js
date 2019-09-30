import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { H1 } from "native-base";
import T from "prop-types";

import { MainItem, MyLinearGradient } from "@components/AllComponents";
import { colors } from "../../../constants";

export default function ListScreenForm({
  goBarcodeScreen,
  items,
  handleFavoriteChange,
  subscription,
  userInfo
}) {
  return (
    <MyLinearGradient>
      <H1 style={s.mainText}>Мої картки</H1>
      {/* {subscription &&
        subscription.status &&
        new Date(userInfo.expired_at).getTime() > new Date().getTime() ? ( */}
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
      {/* ) : (
          <H1 style={s.mainText}>Subscribe to see items</H1>
        )} */}
    </MyLinearGradient>
  );
}

ListScreenForm.propTypes = {
  items: T.array.isRequired,
  goBarcodeScreen: T.func.isRequired,
  handleFavoriteChange: T.func.isRequired
};

const s = StyleSheet.create({
  mainText: {
    marginTop: 50,
    paddingLeft: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.mainGrey
  }
});
