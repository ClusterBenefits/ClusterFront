import React from "react";
import { H1, View } from "native-base";
import { StyleSheet } from "react-native";
import T from "prop-types";
import { MyLinearGradient, BlueButton, MainInput, Header } from "../../../components";

const s = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginHorizontal: 20
  },
  flexMax: {
    flex: 1
  }
});

export default function ProfileFillingForm({
  onChangeValue,
  onSubmit,
  formCredentials,
  goWelcomeScreen,
  isValid
}) {
  return (
    <MyLinearGradient withScroll style={s.container}>
      <Header titleText="Додаткова Інформація" onPress={goWelcomeScreen} />
      <H1>Реєстрація</H1>
      <MainInput
        placeholder="Ім'я"
        name="firstName"
        focusedText="Введіть ваш пароль"
        value={formCredentials.firstName}
        onChangeText={onChangeValue}
      />
      <MainInput
        placeholder="Прізвище"
        name="lastName"
        focusedText="Введіть ваш пароль"
        value={formCredentials.lastName}
        onChangeText={onChangeValue}
      />
      <MainInput
        placeholder="Компанія"
        name="organization"
        focusedText="Введіть ваш пароль"
        value={formCredentials.organization}
        onChangeText={onChangeValue}
      />
      <MainInput
        placeholder="Позиція (не обов'язково)"
        name="position"
        value={formCredentials.position}
        onChangeText={onChangeValue}
      />
      <View style={s.flexMax} />
      <BlueButton text="Next" onPress={onSubmit} disabled={!isValid} />
    </MyLinearGradient>
  );
}

ProfileFillingForm.propTypes = {
  onChangeValue: T.func.isRequired,
  onSubmit: T.func.isRequired,
  formCredentials: T.object.isRequired,
  isValid: T.bool.isRequired
};
