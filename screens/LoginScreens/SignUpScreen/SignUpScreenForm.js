import React from "react";
import { StyleSheet, Text } from "react-native";
import { Container, Form, View, H1 } from "native-base";
import T from "prop-types";

import {
  BlueButton,
  LogoImage,
  MainInput,
  MyLinearGradient
} from "@components/AllComponents";

export default function SignUpScreenForm({
  goLoginScreen,
  signUpUser,
  onChangeValue,
  formCredentials,
  formErrors
}) {
  return (
    <MyLinearGradient>
      <Container>
        <LogoImage />
        <H1>Sign Up</H1>
        <Form>
          <MainInput
            placeholder="Email"
            onChangeText={onChangeValue}
            name="email"
            value={formCredentials.email}
            error={formErrors["email"]}
          />
          <MainInput
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={onChangeValue}
            name="password"
            value={formCredentials.password}
            error={formErrors["password"]}
          />
          <MainInput
            placeholder="Password Confirm"
            secureTextEntry={true}
            onChangeText={onChangeValue}
            name="password_confirmation"
            value={formCredentials.password_confirmation}
            error={formErrors["password_confirmation"]}
          />
          <BlueButton text="Log In" onPress={signUpUser} />
          <View style={styles.bottom_menu}>
            <Text onPress={goLoginScreen} style={styles.bottom_menu_text}>
              Sign in
            </Text>
          </View>
        </Form>
      </Container>
    </MyLinearGradient>
  );
}

SignUpScreenForm.propTypes = {
  goLoginScreen: T.func.isRequired,
  signUpUser: T.func.isRequired,
  onChangeValue: T.func.isRequired,
  formCredentials: T.object.isRequired,
  formErrors: T.object.isRequired
};

const styles = StyleSheet.create({
  bottom_menu: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  bottom_menu_text: {
    color: "white",
    textDecorationLine: "underline",
    marginTop: 10
  }
});
