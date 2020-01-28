import React from "react";
import { StyleSheet, View } from "react-native";
import T from "prop-types";
import { MyLinearGradient, MainInput, BlueButton, Header } from "../../../components";

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1
  },
  maxFlex: {
    flex: 1
  },
  extraMarginBottom: {
    marginBottom: 30
  }
});

export default function ChangeEmailForm({
  onChangeValue,
  changeEmail,
  formCredentials,
  formErrors,
  navigation
}) {
  return (
    <MyLinearGradient>
      <Header titleText="Змінити емейл" navigation={navigation} />
      <View style={s.container}>
        <MainInput
          onChangeText={onChangeValue}
          placeholder="Новий емейл"
          name={"email"}
          value={formCredentials.email}
          error={formErrors["email"]}
        />
        <MainInput
          onChangeText={onChangeValue}
          placeholder="Пароль"
          name={"password_email"}
          secureTextEntry={true}
          value={formCredentials.password_email}
          error={formErrors["password_email"]}
        />
        <View style={s.maxFlex} />
        <BlueButton onPress={changeEmail} text="Зберегти зміни" style={s.extraMarginBottom} />
      </View>
    </MyLinearGradient>
  );
}
ChangeEmailForm.propTypes = {
  onChangeValue: T.func.isRequired,
  changeEmail: T.func.isRequired,
  formCredentials: T.object.isRequired,
  formErrors: T.object.isRequired,
  navigation: T.object.isRequired
};
