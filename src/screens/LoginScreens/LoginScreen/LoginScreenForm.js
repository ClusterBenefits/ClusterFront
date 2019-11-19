import React, { useEffect } from "react";
import { StyleSheet, Animated, StatusBar } from "react-native";
import { View, H1, Text } from "native-base";
import T from "prop-types";

import { BlueButton, LogoImage, MainInput, MyLinearGradient } from "../../../components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../../constants";

const s = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 40
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
  },
  subView: {
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    flex: 1
  }
});

export default function LoginForm({
  logInUser,
  goSignUp,
  goForgotPassword,
  onChangeValue,
  formCredentials,
  formErrors
}) {
  return (
    <MyLinearGradient withScroll>
      <LogoImage withText />

      <View style={s.container}>
        <H1>Вітаємо!</H1>

        <MainInput
          placeholder="Емейл"
          name="email"
          onChangeText={onChangeValue}
          value={formCredentials.email}
          error={formErrors["email"]}
        />
        <MainInput
          placeholder="Пароль"
          name="password"
          onChangeText={onChangeValue}
          value={formCredentials.password}
          error={formErrors["password"]}
          secureTextEntry={true}
        />
        <View style={s.forgotPasswordContainer}>
          <TouchableOpacity onPress={goForgotPassword}>
            <Text style={s.forgotPasswordText}>Забули пароль?</Text>
          </TouchableOpacity>
          <View />
        </View>

        <BlueButton text="Увійти" onPress={logInUser} />

        <View style={s.bottom_menu}>
          <Text style={s.bottom_menu_text}>Ще не зареєстровані?</Text>

          <TouchableOpacity onPress={goSignUp}>
            <Text style={s.signUpText}>Зареєструйтесь</Text>
          </TouchableOpacity>
        </View>
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
  formErrors: T.object.isRequired
};
