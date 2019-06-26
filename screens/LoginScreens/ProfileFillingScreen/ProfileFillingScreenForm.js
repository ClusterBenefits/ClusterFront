import React from "react";
import { StyleSheet, Text } from "react-native";
import { Container, Form, View, H1 } from "native-base";
import {
  BlueButton,
  MainInput,
  MyLinearGradient
} from "@components/AllComponents";
import T from "prop-types";

profile.propTypes = {
  onChangeValue: T.func,
  post: T.func,
  state: T.object
};

export default function profile({
  onChangeValue,
  post,
  formCredentials,
  formErrors
}) {
  return (
    <MyLinearGradient>
      <Container>
        <H1>Welcome</H1>
        <MainInput
          onChangeText={onChangeValue}
          placeholder="First name*"
          name="firstName"
          value={formCredentials.firstName}
          error={formErrors["firstName"]}
        />
        <MainInput
          onChangeText={onChangeValue}
          placeholder="Last name*"
          name="lastName"
          value={formCredentials.lastName}
          error={formErrors["lastName"]}
        />
        <MainInput
          onChangeText={onChangeValue}
          placeholder="Organization*"
          name="organization"
          value={formCredentials.organization}
          error={formErrors["organization"]}
        />
        <MainInput
          onChangeText={onChangeValue}
          placeholder="Position*"
          name="position"
          value={formCredentials.position}
          error={formErrors["position"]}
        />
        <BlueButton text="Next" onPress={post} />
        <Form />
      </Container>
    </MyLinearGradient>
  );
}

const styles = StyleSheet.create({});
