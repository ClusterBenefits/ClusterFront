import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, H1 } from "native-base";
import T from "prop-types";
import { BlueButton, LogoImage, MyLinearGradient } from "../../../components";

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1
  },
  H1: {
    marginBottom: 20
  },
  text3: {
    marginBottom: 10,
    flex: 1
  }
});

export default function WelcomeForm({ goProfileFillingScreen }) {
  return (
    <MyLinearGradient withScroll>
      <LogoImage />
      <View style={s.container}>
        <H1 style={s.H1}>Welcome!</H1>
        <Text style={s.text3}>
          Даний додаток дає можливість користуватися знижками на товари та послуги в рамках програми ІТ
          Benefits від Івано-Франківського ІТ кластеру. Детальнішу інформацію про програму та наших партнерів
          можна знайти на FB сторінці. Весь прибуток від користування додатком буде спрямовано на покращення
          умов життя в нашому місті та благодійні цілі. Приємного користування!
        </Text>
        <BlueButton withMarginBottom text="Гаразд" onPress={goProfileFillingScreen} />
      </View>
    </MyLinearGradient>
  );
}

WelcomeForm.propTypes = {
  goProfileFillingScreen: T.func.isRequired
};
