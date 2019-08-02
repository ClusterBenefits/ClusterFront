import React from "react";
import { Container, Form, H1, H3 } from "native-base";
import T from "prop-types";

import {
  BlueButton,
  LogoImage,
  MainInput,
  MyLinearGradient
} from "@components/AllComponents";

export default function PasswordForm({
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

PasswordForm.propTypes = {
  onChangeValue: T.func.isRequired,
  resetPassword: T.func.isRequired,
  formCredentials: T.object.isRequired,
  formErrors: T.object.isRequired
};
