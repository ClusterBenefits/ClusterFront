import React from "react";
import { StyleSheet, Text } from "react-native";
import { Container, Form, View, H1 } from "native-base";
import {
  BlueButton,
  LogoImage,
  MainInput,
  MyLinearGradient
} from "@components/AllComponents";
import T from "prop-types";

Login.propTypes = {
  logInUser: T.func,
  goSignUp: T.func,
  goForgotPassword: T.func,
  onChangeValue: T.func,
  state: T.object
};

export default function Login({
  logInUser,
  goSignUp,
  goForgotPassword,
  onChangeValue,
  formCredentials,
  formErrors
}) {
  return (
    <MyLinearGradient>
      <Container>
        <LogoImage />
        <H1>Sign In </H1>
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
          <BlueButton text="Log In" onPress={logInUser} />
          <View style={styles.bottom_menu}>
            <Text onPress={goForgotPassword} style={styles.bottom_menu_text}>
              Forgot password
            </Text>
            <Text onPress={goSignUp} style={styles.bottom_menu_text}>
              Sign up
            </Text>
          </View>
        </Form>
      </Container>
    </MyLinearGradient>
  );
}

const styles = StyleSheet.create({
  bottom_menu: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bottom_menu_text: {
    textDecorationLine: "underline",
    marginTop: 10,
    color: "white"
  }
});
