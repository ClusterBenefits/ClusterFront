import React from "react";
import { StyleSheet } from "react-native";
import { Form, View, H1, Text } from "native-base";
import T from "prop-types";

import {
  BlueButton,
  LogoImage,
  MainInput,
  MyLinearGradient
} from "@components/AllComponents";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../../constants";
import { keyboard } from "../../../hooks";

const s = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 65
  },
  bottom_menu: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20
  },
  bottom_menu_text: {
    marginRight: 10
  },
  signUpText: {
    color: colors.mainBlue
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 20
  },
  forgotPasswordText: {
    fontWeight: "500"
  }
});

export default function LoginForm({
  logInUser,
  goSignUp,
  goForgotPassword,
  onChangeValue,
  formCredentials,
  isValid
}) {
  const [visible] = keyboard();

  return (
    <MyLinearGradient withScroll>
      {!visible && <LogoImage withText />}
      <View style={s.container}>
        <H1>Вітаємо!</H1>
        <Form>
          <MainInput
            placeholder="Емейл"
            focusedText="Введіть ваш емейл"
            name="email"
            onChangeText={onChangeValue}
            value={formCredentials.email}
          />
          <MainInput
            placeholder="Пароль"
            focusedText="Введіть ваш пароль"
            name="password"
            onChangeText={onChangeValue}
            value={formCredentials.password}
            secureTextEntry={true}
          />
          <View style={s.forgotPasswordContainer}>
            <TouchableOpacity onPress={goForgotPassword}>
              <Text style={s.forgotPasswordText}>Забули пароль?</Text>
            </TouchableOpacity>
            <View />
          </View>

          <BlueButton text="Log In" onPress={logInUser} disabled={!isValid} />

          <View style={s.bottom_menu}>
            <Text style={s.bottom_menu_text}>Ще не зареєстровані?</Text>

            <TouchableOpacity onPress={goSignUp}>
              <Text style={s.signUpText}>Зареєструйтесь</Text>
            </TouchableOpacity>
          </View>
        </Form>
      </View>
    </MyLinearGradient>
  );
}

LoginForm.propTypes = {
  logInUser: T.func.isRequired,
  goSignUp: T.func.isRequired,
  goForgotPassword: T.func.isRequired,
  onChangeValue: T.func.isRequired,
  formCredentials: T.object.isRequired,
  isValid: T.bool.isRequired
};
