import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { Container, H3 } from "native-base";
import T from "prop-types";

import { MainItem, MyLinearGradient } from "@components/AllComponents";

export default function ListScreenForm({
  goBarcodeScreen,
  items,
  handleFavoriteChange,
  subscription,
  userInfo
}) {
  return (
    <MyLinearGradient>
      <Container style={styles.container}>
        <H3 style={{ marginLeft: 10 }}>Organizations</H3>
        {subscription &&
        subscription.status &&
        new Date(userInfo.expired_at).getTime() > new Date().getTime() ? (
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

ListScreenForm.propTypes = {
  items: T.array.isRequired,
  goBarcodeScreen: T.func.isRequired,
  handleFavoriteChange: T.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 20
  }
});
