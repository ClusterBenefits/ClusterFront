import React from "react";
import { View, StyleSheet } from "react-native";
import { Form, H1, Text } from "native-base";
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
  },
  enterEmailText: {
    textAlign: "center",
    marginTop: 10
  }
});

export default function PasswordForm({
  onChangeValue,
  resetPassword,
  formCredentials,
  navigation,
  formErrors
}) {
  return (
    <MyLinearGradient>
      <Header navigation={navigation} />
      <View style={s.container}>
        <H1>Скидання паролю</H1>
        <Form>
          <MainInput
            placeholder="Email"
            onChangeText={onChangeValue}
            name={"email"}
            value={formCredentials.email}
            error={formErrors["email"]}
          />
        </Form>
        <Text style={s.enterEmailText}>Введіть емайл для відновлення паролю</Text>
        <View style={s.maxFlex} />
        <BlueButton text="Скинути пароль" onPress={resetPassword} />
      </View>
    </MyLinearGradient>
  );
}

PasswordForm.propTypes = {
  onChangeValue: T.func.isRequired,
  resetPassword: T.func.isRequired,
  formCredentials: T.object.isRequired,
  navigation: T.object.isRequired,
  formErrors: T.object.isRequired
};
