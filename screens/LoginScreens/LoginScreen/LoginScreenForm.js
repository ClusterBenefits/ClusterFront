import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import { Container, Form, View, H1 } from "native-base";
import T from "prop-types";

import {
  BlueButton,
  LogoImage,
  MainInput,
  MyLinearGradient
} from "@components/AllComponents";

export default function LoginForm({
  logInUser,
  goSignUp,
  goForgotPassword,
  onChangeValue,
  formCredentials,
  formErrors
}) {
  return (
    <MyLinearGradient>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          flexGrow: 1
        }}
        style={{ paddingHorizontal: 20, marginTop: 30, marginBottom: 20 }}
      >
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
          <BlueButton text="Log In" onPress={logInUser} testID="button" />
          <View style={styles.bottom_menu}>
            <Text onPress={goForgotPassword} style={styles.bottom_menu_text}>
              Forgot password
            </Text>
            <Text onPress={goSignUp} style={styles.bottom_menu_text}>
              Sign up
            </Text>
          </View>
        </Form>
      </ScrollView>
    </MyLinearGradient>
  );
}

LoginForm.propTypes = {
  logInUser: T.func.isRequired,
  goSignUp: T.func.isRequired,
  goForgotPassword: T.func.isRequired,
  onChangeValue: T.func.isRequired,
  formCredentials: T.object.isRequired,
  formErrors: T.object.isRequired
};

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
