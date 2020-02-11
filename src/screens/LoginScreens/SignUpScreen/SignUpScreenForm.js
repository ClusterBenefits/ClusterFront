import React from "react";
import { StyleSheet } from "react-native";
import { Form, View, H1 } from "native-base";
import T from "prop-types";
import { BlueButton, Header, MainInput, Container } from "../../../components";

const s = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
    flex: 1
  },
  flexMax: {
    flex: 1
  }
});

export default function SignUpScreenForm({
  signUpUser,
  onChangeValue,
  formCredentials,
  navigation,
  formErrors
}) {
  return (
    <Container withScroll>
      <Header navigation={navigation} />
      <View style={s.container}>
        <H1>Реєстрація</H1>
        <Form>
          <MainInput
            placeholder="Емейл"
            onChangeText={onChangeValue}
            name="email"
            value={formCredentials.email}
            error={formErrors["email"]}
          />
          <MainInput
            placeholder="Пароль"
            secureTextEntry={true}
            onChangeText={onChangeValue}
            name="password"
            value={formCredentials.password}
            error={formErrors["password"]}
          />
          <MainInput
            placeholder="Повторіть пароль"
            secureTextEntry={true}
            onChangeText={onChangeValue}
            name="password_confirmation"
            value={formCredentials.password_confirmation}
            error={formErrors["password_confirmation"]}
          />
        </Form>
        <View style={s.flexMax} />
        <BlueButton text=" Продовжити" onPress={signUpUser} />
      </View>
    </Container>
  );
}

SignUpScreenForm.propTypes = {
  signUpUser: T.func.isRequired,
  onChangeValue: T.func.isRequired,
  formCredentials: T.object.isRequired,
  formErrors: T.object.isRequired,
  navigation: T.object.isRequired
};
