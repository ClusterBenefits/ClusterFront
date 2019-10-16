import React from "react";
import { StyleSheet, View } from "react-native";
import { H3 } from "native-base";
import T from "prop-types";
import { MyLinearGradient, MainInput, BlueButton, Header } from "../../../components";

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  flexMax: {
    flex: 1
  },
  extraMarginBottom: {
    marginBottom: 30
  }
});

export default function ChangePasswordForm({
  onChangeValue,
  changePassword,
  formCredentials,
  isValid,
  navigation
}) {
  return (
    <MyLinearGradient style={s.container}>
      <Header titleText="Змінити пароль" navigation={navigation} />
      <H3>Change password</H3>
      <MainInput
        onChangeText={onChangeValue}
        placeholder={"Пароль"}
        name={"oldPassword"}
        secureTextEntry={true}
        value={formCredentials.oldPassword}
      />
      <MainInput
        onChangeText={onChangeValue}
        placeholder="Новий пароль"
        name={"password"}
        secureTextEntry={true}
        value={formCredentials.password}
      />
      <MainInput
        onChangeText={onChangeValue}
        placeholder="Повторіть новий пароль"
        name={"password_confirmation"}
        secureTextEntry={true}
        value={formCredentials.password_confirmation}
      />
      <View style={s.flexMax} />
      <BlueButton
        text="Зберегти зміни"
        disabled={!isValid}
        onPress={changePassword}
        style={s.extraMarginBottom}
      />
    </MyLinearGradient>
  );
}
ChangePasswordForm.propTypes = {
  onChangeValue: T.func.isRequired,
  changePassword: T.func.isRequired,
  formCredentials: T.object.isRequired,
  isValid: T.bool.isRequired,
  navigation: T.object.isRequired
};
