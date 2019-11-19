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
  formErrors,
  navigation
}) {
  return (
    <MyLinearGradient style={s.container} withScroll>
      <Header titleText="Змінити пароль" navigation={navigation} />
      <MainInput
        onChangeText={onChangeValue}
        placeholder={"Пароль"}
        name={"oldPassword"}
        secureTextEntry={true}
        value={formCredentials.oldPassword}
        error={formErrors["oldPassword"]}
      />
      <MainInput
        onChangeText={onChangeValue}
        placeholder="Новий пароль"
        name={"password"}
        secureTextEntry={true}
        value={formCredentials.password}
        error={formErrors["password"]}
      />
      <MainInput
        onChangeText={onChangeValue}
        placeholder="Повторіть новий пароль"
        name={"password_confirmation"}
        secureTextEntry={true}
        value={formCredentials.password_confirmation}
        error={formErrors["password_confirmation"]}
      />
      <View style={s.flexMax} />
      <BlueButton text="Зберегти зміни" onPress={changePassword} style={s.extraMarginBottom} />
    </MyLinearGradient>
  );
}
ChangePasswordForm.propTypes = {
  onChangeValue: T.func.isRequired,
  changePassword: T.func.isRequired,
  formCredentials: T.object.isRequired,
  formErrors: T.object.isRequired,
  navigation: T.object.isRequired
};
