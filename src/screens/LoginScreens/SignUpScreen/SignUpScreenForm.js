import React from "react";
import { StyleSheet, Text } from "react-native";
import { Form, View, H1 } from "native-base";
import T from "prop-types";

import {
  BlueButton,
  LogoImage,
  MainInput,
  MyLinearGradient
} from "@components/AllComponents";
import { keyboard } from "../../../hooks";

const s = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 65,
    marginBottom: 30
  },
  bottom_menu: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  bottom_menu_text: {
    color: "white",
    textDecorationLine: "underline",
    marginTop: 10
  }
});

export default function SignUpScreenForm({
  goLoginScreen,
  signUpUser,
  onChangeValue,
  formCredentials,
  isValid
}) {
  const [visible] = keyboard();

  return (
    <MyLinearGradient withScroll>
      {!visible && <LogoImage withText />}
      <View style={s.container}>
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
          <BlueButton text="Log In" onPress={signUpUser} disabled={!isValid} />
          <View style={s.bottom_menu}>
            <Text onPress={goLoginScreen} style={s.bottom_menu_text}>
              Продовжити
            </Text>
          </View>
        </Form>
      </View>
    </MyLinearGradient>
  );
}

SignUpScreenForm.propTypes = {
  goLoginScreen: T.func.isRequired,
  signUpUser: T.func.isRequired,
  onChangeValue: T.func.isRequired,
  isValid: T.bool.isRequired
};
