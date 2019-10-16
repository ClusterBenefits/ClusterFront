import React from "react";
import { StyleSheet } from "react-native";
import { Form, View, H1 } from "native-base";
import T from "prop-types";
import { BlueButton, Header, MainInput, MyLinearGradient } from "../../../components";

const s = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20
  },
  flexMax: {
    flex: 1
  }
});

export default function SignUpScreenForm({
  signUpUser,
  onChangeValue,
  formCredentials,
  navigation,
  isValid
}) {
  return (
    <MyLinearGradient withScroll style={s.container}>
      <Header navigation={navigation} />
      <H1>Реєстрація</H1>
      <Form>
        <MainInput
          placeholder="Емейл"
          focusedText="Введіть ваш емейл"
          onChangeText={onChangeValue}
          name="email"
          value={formCredentials.email}
        />
        <MainInput
          placeholder="Пароль"
          focusedText="Введіть ваш пароль"
          secureTextEntry={true}
          onChangeText={onChangeValue}
          name="password"
          value={formCredentials.password}
        />
        <MainInput
          placeholder="Повторіть пароль"
          focusedText="Повторіть ваш пароль"
          secureTextEntry={true}
          onChangeText={onChangeValue}
          name="password_confirmation"
          value={formCredentials.password_confirmation}
        />
      </Form>
      <View style={s.flexMax} />
      <BlueButton text=" Продовжити" onPress={signUpUser} disabled={!isValid} />
    </MyLinearGradient>
  );
}

SignUpScreenForm.propTypes = {
  signUpUser: T.func.isRequired,
  onChangeValue: T.func.isRequired,
  formCredentials: T.object.isRequired,
  isValid: T.bool.isRequired,
  navigation: T.object.isRequired
};
