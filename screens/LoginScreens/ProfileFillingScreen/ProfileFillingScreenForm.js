import React from "react";
import { Form, H1 } from "native-base";
import { ScrollView } from "react-native";
import T from "prop-types";

import {
  BlueButton,
  MainInput,
  MyLinearGradient
} from "@components/AllComponents";

export default function ProfileFillingForm({
  onChangeValue,
  onSubmit,
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
        <BlueButton text="Next" onPress={onSubmit} />
        <Form />
      </ScrollView>
    </MyLinearGradient>
  );
}

ProfileFillingForm.propTypes = {
  onChangeValue: T.func.isRequired,
  onSubmit: T.func.isRequired,
  formCredentials: T.object.isRequired,
  formErrors: T.object.isRequired
};
