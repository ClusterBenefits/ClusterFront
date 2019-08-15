import React from "react";
import { Form, H1 } from "native-base";
import { ScrollView } from "react-native";
import T from "prop-types";

import {
  BlueButton,
  LogoImage,
  MainInput,
  MyLinearGradient
} from "@components/AllComponents";

export default function NewPasswordForm({
  goLogin,
  onChangeValue,
  formCredentials,
  formErrors
}) {
  return (
    <MyLinearGradient>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        style={{ paddingHorizontal: 20, marginTop: 30, marginBottom: 20 }}
      >
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
      </ScrollView>
    </MyLinearGradient>
  );
}

NewPasswordForm.propTypes = {
  goLogin: T.func.isRequired,
  onChangeValue: T.func.isRequired,
  formCredentials: T.object.isRequired,
  formErrors: T.object.isRequired
};
