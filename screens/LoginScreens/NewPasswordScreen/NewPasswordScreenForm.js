import React from "react";
import { StyleSheet } from "react-native";
import { Container, Form, H1 } from "native-base";
import {
  BlueButton,
  LogoImage,
  MainInput,
  MyLinearGradient
} from "@components/AllComponents";
import T from "prop-types";

newPassword.propTypes = {
  goLogin: T.func,
  onChangeValue: T.func,
  state: T.object
};

export default function newPassword({
  goLogin,
  onChangeValue,
  formCredentials,
  formErrors
}) {
  return (
    <MyLinearGradient>
      <Container>
        <LogoImage />
        <H1>Please create a new passowrd</H1>
        <Form>
          <MainInput
            placeholder="New password"
            onChangeText={onChangeValue}
            secureTextEntry={true}
            name={"password"}
            value={formCredentials.password}
            error={formErrors["password"]}
          />
          <MainInput
            placeholder="Password Confirm"
            onChangeText={onChangeValue}
            secureTextEntry={true}
            name={"password_confirmation"}
            value={formCredentials.password_confirmation}
            error={formErrors["password_confirmation"]}
          />
          <BlueButton text="Confirm" onPress={goLogin} />
        </Form>
      </Container>
    </MyLinearGradient>
  );
}

const styles = StyleSheet.create({});
