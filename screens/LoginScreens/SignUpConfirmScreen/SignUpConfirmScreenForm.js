import React from "react";
import { StyleSheet, Text } from "react-native";
import { Container, Form, H1, H3 } from "native-base";
import T from "prop-types";

import {
  LogoImage,
  BlueButton,
  MyLinearGradient,
  MainInput
} from "@components/AllComponents";

singUp.propTypes = {
  goNewPassword: T.func,
  onChangeValue: T.func,
  formCredentials: T.object
};

export default function singUp({
  goNewPassword,
  onChangeValue,
  formCredentials,
  formErrors
}) {
  return (
    <MyLinearGradient>
      <Container>
        <LogoImage />
        <H1>Password reset confirm</H1>
        <H3>A confirmation code was sent to you'r email</H3>
        <Form style={styles.form}>
          <MainInput
            width={50}
            paddingLeft={20}
            placeholder="1"
            keyboardType="numeric"
            onChangeText={onChangeValue}
            name="email1"
            value={formCredentials.email1}
            maxLength={1}
          />

          <MainInput
            width={50}
            paddingLeft={20}
            placeholder="2"
            keyboardType="numeric"
            onChangeText={onChangeValue}
            name="email2"
            value={formCredentials.email2}
            maxLength={1}
          />

          <MainInput
            width={50}
            paddingLeft={20}
            placeholder="3"
            keyboardType="numeric"
            onChangeText={onChangeValue}
            name="email3"
            value={formCredentials.email3}
            maxLength={1}
          />

          <MainInput
            width={50}
            paddingLeft={20}
            placeholder="4"
            keyboardType="numeric"
            onChangeText={onChangeValue}
            name="email4"
            value={formCredentials.email4}
            maxLength={1}
          />

          <MainInput
            width={50}
            paddingLeft={20}
            placeholder="5"
            keyboardType="numeric"
            onChangeText={onChangeValue}
            name="email5"
            value={formCredentials.email5}
            maxLength={1}
          />
        </Form>
        {/* {formErrors && <Text>Please enter all required numbers</Text>} */}
        <BlueButton text="Confirm" onPress={goNewPassword} />
      </Container>
    </MyLinearGradient>
  );
}

const styles = StyleSheet.create({
  form: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between"
  }
});
