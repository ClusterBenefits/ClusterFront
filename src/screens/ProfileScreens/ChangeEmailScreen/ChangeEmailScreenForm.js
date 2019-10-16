import React from "react";
import { StyleSheet, View } from "react-native";
import { H3 } from "native-base";
import T from "prop-types";
import { MyLinearGradient, MainInput, BlueButton, Header } from "../../../components";

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 20
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
  isValid,
  errorText,
  navigation
}) {
  return (
    <MyLinearGradient style={s.container}>
      <Header titleText="Змінити емейл" navigation={navigation} />
      <H3>Change email</H3>
      <MainInput
        onChangeText={onChangeValue}
        placeholder={"New email*"}
        name={"email"}
        value={formCredentials.email}
      />
      <MainInput
        onChangeText={onChangeValue}
        placeholder="Password*"
        name={"password_email"}
        secureTextEntry={true}
        value={formCredentials.password_email}
        error={errorText}
      />
      <View style={s.maxFlex} />
      <BlueButton
        onPress={changeEmail}
        text="Зберегти зміни"
        disabled={!isValid}
        style={s.extraMarginBottom}
      />
    </MyLinearGradient>
  );
}
ChangeEmailForm.propTypes = {
  onChangeValue: T.func.isRequired,
  goProfileScreen: T.func.isRequired,
  changeEmail: T.func.isRequired,
  formCredentials: T.object.isRequired,
  errorText: T.string.isRequired
};
