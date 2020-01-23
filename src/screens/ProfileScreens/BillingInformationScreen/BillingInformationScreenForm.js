import React from "react";
import { StyleSheet, View } from "react-native";
import { H1, Text, H2 } from "native-base";
import T from "prop-types";

import { CreditCardBigIcon } from "../../../assets/svg";
import { screens } from "../../../constants";
import { MyLinearGradient, BlueButton, Header } from "../../../components";

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 16
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
  subscription
}) {
  const { credit_card_number = "", expired_at = "" } = subscription || {};
  const activatedFromAdmin = credit_card_number === "";

  return (
    <MyLinearGradient style={s.container}>
      <>
        <Header navigation={navigation} titleText="Інформація про оплату" />
        <CreditCardBigIcon style={s.imageStyle} />
        {(subscribed && (
          <>
            <H2 style={s.extraMarginBottom}>
              {activatedFromAdmin ? "Підписку активовано" : "Платіжну каркту додано"}
            </H2>
            <Text>Строк дії : {expired_at}</Text>
            {!activatedFromAdmin && <Text>Номер каркти : {credit_card_number}</Text>}
            <View style={s.flexMax} />
            <BlueButton text="Відмінити підписку" withMarginBottom onPress={cancelSubscription} />
          </>
        )) ||
          (subscription && (
            <>
              <Text> Проводиться оплата, це може заняти декілька хвилин</Text>
              <View style={s.flexMax} />
              <BlueButton text="Оновити дані" withMarginBottom onPress={checkSubscription} />
            </>
          )) || (
            <>
              <H1>Платіжну каркту не додано</H1>
              <Text>Додайте платіжну картку щоб отримати доступ до знижок</Text>
              <View style={s.flexMax} />
              <BlueButton
                text="Додати картку"
                withMarginBottom
                onPress={() => navigation.navigate(screens.AddCreditInfoScreen)}
              />
            </>
          )}
      </>
    </MyLinearGradient>
  );
}
BillingInformationScreen.propTypes = {
  navigation: T.object.isRequired
};
