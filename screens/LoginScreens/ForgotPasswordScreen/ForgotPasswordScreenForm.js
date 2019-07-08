import React from "react";
import { Container, Form, H1, H3 } from "native-base";
import {
  BlueButton,
  LogoImage,
  MainInput,
  MyLinearGradient
} from "@components/AllComponents";
import T from "prop-types";

password.propTypes = {
  onChangeValue: T.func,
  resetPassword: T.func,
  formCredentials: T.object,
  formErrors: T.object
};

export default function password({
  onChangeValue,
  resetPassword,
  formCredentials,
  formErrors
}) {
  return (
    <MyLinearGradient>
      <Container>
        <LogoImage />
        <H1>Forgot Password</H1>
        <H3>UpEnim consectetur reprehenderit minim anim fugiat</H3>
        <Form>
          <MainInput
            placeholder="Email"
            onChangeText={onChangeValue}
            name={"email"}
            value={formCredentials.email}
            error={formErrors["email"]}
          />
          <BlueButton text="Reset" onPress={resetPassword} />
        </Form>
      </Container>
    </MyLinearGradient>
  );
}
