import React from "react";
import { StyleSheet, View } from "react-native";
import { H1, Text, H2 } from "native-base";
import T from "prop-types";

import { CreditCardBigIcon } from "../../../assets/svg";
import { screens } from "../../../constants";
import { Container, BlueButton, Header } from "../../../components";

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1
  },
  flexMax: {
    flex: 1
  },
  imageStyle: {
    marginVertical: 45,
    alignSelf: "center"
  },
  extraMarginBottom: {
    marginBottom: 10
  }
});

export default function BillingInformationScreen({
  navigation,
  subscribed,
  cancelSubscription,
  checkSubscription,
  subscription,
  userInfo,
  checkUserInfo
}) {
  const { credit_card_number = "", expired_at = "" } = subscription || {};
  const isActivatedFromAdmin = subscribed && credit_card_number === "";

  console.log("SUBSCRIPTION", subscription);

  return (
    <Container>
      <Header navigation={navigation} titleText="Інформація про оплату" />
      <View style={s.container}>
        <CreditCardBigIcon style={s.imageStyle} />
        {(subscribed && (
          <>
            <H2 style={s.extraMarginBottom}>
              {isActivatedFromAdmin ? "Підписку активовано" : "Платіжну картку додано"}
            </H2>
            <Text>Строк дії : {isActivatedFromAdmin ? userInfo.expired_at : expired_at}</Text>
            {!isActivatedFromAdmin && <Text>Номер картки : {credit_card_number}</Text>}
            <View style={s.flexMax} />
            <BlueButton
              text="Відмінити підписку"
              withMarginBottom
              onPress={cancelSubscription}
              disabled={subscribed && isActivatedFromAdmin}
            />
          </>
        )) ||
          (subscription && (
            <>
              <Text> Проводиться оплата, це може зайняти декілька хвилин</Text>
              <View style={s.flexMax} />
              <BlueButton text="Оновити дані" withMarginBottom onPress={checkSubscription} />
            </>
          )) || (
            <>
              <H1>Платіжну картку не додано</H1>
              <Text>Додайте платіжну картку щоб отримати доступ до знижок</Text>
              <View style={s.flexMax} />
              <BlueButton
                text="Додати картку"
                withMarginBottom
                onPress={() => navigation.navigate(screens.AgreementScreen)}
              />
            </>
          )}
      </View>
    </Container>
  );
}
BillingInformationScreen.propTypes = {
  navigation: T.object.isRequired,
  subscribed: T.bool,
  cancelSubscription: T.func,
  checkSubscription: T.func,
  userInfo: T.object
};

/* <Container>
      <Header navigation={navigation} titleText="Інформація про підписку" />
      <View style={s.container}>
        <CreditCardBigIcon style={s.imageStyle} />
        {subscribed ? (
          <>
            <H2 style={s.extraMarginBottom}>Підписку активовано</H2>
            <Text>Строк дії : {userInfo.expired_at}</Text>
            <View style={s.flexMax} />
            <BlueButton text="Оновити дані" withMarginBottom onPress={checkUserInfo} />
          </>
        ) : (
          <>
            <H2 style={s.extraMarginBottom}>Підписку не активовано</H2>
            <View style={s.flexMax} />
            <BlueButton text="Оновити дані" withMarginBottom onPress={checkUserInfo} />
          </>
        )}
      </View>
    </Container> */

/* (subscription && (
            <>
              <Text> Проводиться оплата, це може зайняти декілька хвилин</Text>
              <View style={s.flexMax} />
              <BlueButton text="Оновити дані" withMarginBottom onPress={checkSubscription} />
            </>
          )) || */
