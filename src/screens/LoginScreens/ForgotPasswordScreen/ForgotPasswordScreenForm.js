import React from "react";
import { View, StyleSheet } from "react-native";
import { Form, H1, Text } from "native-base";
import T from "prop-types";

import {
  BlueButton,
  MainInput,
  MyLinearGradient,
  Header
} from "@components/AllComponents";

const s = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 20
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
  isValid
}) {
  return (
    <MyLinearGradient style={s.container}>
      <Header navigation={navigation} />
      <H1>Скидання паролю</H1>
      <Form>
        <MainInput
          placeholder="Email"
          onChangeText={onChangeValue}
          name={"email"}
          value={formCredentials.email}
        />
      </Form>
      <Text style={s.enterEmailText}>Введіть емайл для відновлення паролю</Text>
      <View style={s.maxFlex} />
      <BlueButton
        text="Скинути пароль"
        onPress={resetPassword}
        disabled={!isValid}
      />
    </MyLinearGradient>
  );
}

PasswordForm.propTypes = {
  onChangeValue: T.func.isRequired,
  resetPassword: T.func.isRequired,
  formCredentials: T.object.isRequired,
  navigation: T.object.isRequired,
  isValid: T.bool.isRequired
};
