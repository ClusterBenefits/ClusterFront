import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { H1, H3, Text } from "native-base";
import T from "prop-types";
import {MainModalComponent} from '../../../services/mainModal';
import { colors } from "../../../constants";
import { ButtonModal } from "../../../services/mainModal";
import { Container, MainItem, ActivityIndicator, BlueButton } from "../../../components";
import { enhancedOnEndReached } from "../../../helpers";

const s = StyleSheet.create({
  mainText: {
    marginTop: 50,
    paddingLeft: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.mainGrey
  },
  // extraMarginLeft: {
  //   marginLeft: 10,
  //   textAlign: "center"
  // },
  buttonContainer: {
    paddingHorizontal: 30
  },
  warning: {
    fontSize: 14,
    textAlign: "center"
  },
  email: {
    color: '#009fe3'
  }
});

export default function ListScreenForm({
  items,
  handleFavoriteChange,
  subscribed,
  fetchMore,
  refetchItems,
  fetchItem,
  isRefetching,
  isFetchingMore,
  goBillingInformationScreen
}) {
  const handlePressItem = item => {
    // we don't need to wait for this async func to complete
    fetchItem(item.id); // hack for tracking event on server
    ButtonModal.showModal({ item, handleFavoriteChange });
  };

  //<BlueButton text="Перейти до оплати" onPress={goBillingInformationScreen} />

  return (
    <Container>
      <H1 style={s.mainText}>Мої картки</H1>
      {subscribed ? (
        <FlatList
          refreshing={isRefetching}
          onRefresh={refetchItems}
          data={items}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <MainItem
              item={item}
              onPress={() => handlePressItem(item)}
              handleFavoriteChange={handleFavoriteChange}
              subscribed={subscribed}
            />
          )}
          onEndReached={enhancedOnEndReached(fetchMore)}
          onEndReachedThreshold={0.1}
          ListFooterComponent={isFetchingMore && <ActivityIndicator size="small" />}
        />
      ) : (
        <>
          {/* <H3 style={s.extraMarginLeft}>Підпишіться, щоб отримати доступ до знижок</H3> */}
          <View style={s.buttonContainer}>

              <Text style={s.warning}>Щоб отримати доступ напишіть на пошту: <Text style={[s.warning, s.email]}> itbenefitscard@gmail.com</Text></Text>
              

          </View>
          <FlatList
            refreshing={isRefetching}
            onRefresh={refetchItems}
            data={items}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <MainItem item={item} onPress={() => {}} subscribed={subscribed} />}
            onEndReached={enhancedOnEndReached(fetchMore)}
            onEndReachedThreshold={0.1}
            ListFooterComponent={isFetchingMore && <ActivityIndicator size="small" />}
          />
        </>
      )}
    </Container>
  );
}

ListScreenForm.propTypes = {
  items: T.array,
  handleFavoriteChange: T.func.isRequired,
  subscribed: T.bool,
  fetchMore: T.func,
  refetchItems: T.func,
  fetchItem: T.func,
  isRefetching: T.bool
};
