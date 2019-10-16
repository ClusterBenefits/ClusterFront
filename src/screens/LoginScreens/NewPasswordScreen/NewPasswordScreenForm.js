import React from "react";
import { Form, H1 } from "native-base";
import { StyleSheet, View } from "react-native";
import T from "prop-types";

import { MyLinearGradient, BlueButton, MainInput, Header } from "../../../components";

const s = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 20
  },
  maxFlex: {
    flex: 1
  }
});

export default function NewPasswordForm({ goLogin, onChangeValue, formCredentials }) {
  const isValid =
    formCredentials.password.length >= 6 &&
    formCredentials.password.length === formCredentials.password_confirmation.length;

  return (
    <MyLinearGradient style={s.container}>
      <Header />
      <H1>Новий пароль</H1>
      <Form>
        <MainInput
          placeholder="Пароль"
          onChangeText={onChangeValue}
          secureTextEntry={true}
          name={"password"}
          value={formCredentials.password}
        />
        <MainInput
          placeholder="Повторіть пароль"
          onChangeText={onChangeValue}
          secureTextEntry={true}
          name={"password_confirmation"}
          value={formCredentials.password_confirmation}
        />
      </Form>
      <View style={s.maxFlex} />
      <BlueButton text="Зберегти" onPress={goLogin} disabled={!isValid} />
    </MyLinearGradient>
  );
}

NewPasswordForm.propTypes = {
  goLogin: T.func.isRequired,
  onChangeValue: T.func.isRequired,
  formCredentials: T.object.isRequired
};
