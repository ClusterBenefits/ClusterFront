import React from "react";
import { Form, H1 } from "native-base";
import { StyleSheet, View } from "react-native";
import T from "prop-types";

import { MyLinearGradient, BlueButton, MainInput, Header } from "../../../components";

const s = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
    flex: 1
  },
  maxFlex: {
    flex: 1
  }
});

export default function NewPasswordForm({ goLogin, onChangeValue, formCredentials, formErrors }) {
  return (
    <MyLinearGradient>
      <Header />
      <View style={s.container}>
        <H1>Новий пароль</H1>
        <Form>
          <MainInput
            placeholder="Пароль"
            onChangeText={onChangeValue}
            secureTextEntry={true}
            name={"password"}
            value={formCredentials.password}
            error={formErrors["password"]}
          />
          <MainInput
            placeholder="Повторіть пароль"
            onChangeText={onChangeValue}
            secureTextEntry={true}
            name={"password_confirmation"}
            value={formCredentials.password_confirmation}
            error={formErrors["password_confirmation"]}
          />
        </Form>
        <View style={s.maxFlex} />
        <BlueButton text="Зберегти" onPress={goLogin} />
      </View>
    </MyLinearGradient>
  );
}

NewPasswordForm.propTypes = {
  goLogin: T.func.isRequired,
  onChangeValue: T.func.isRequired,
  formCredentials: T.object.isRequired,
  formErrors: T.object.isRequired
};
