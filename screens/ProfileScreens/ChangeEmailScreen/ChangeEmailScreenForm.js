import React from "react";
import { StyleSheet, View } from "react-native";
import { Container, Form, H3 } from "native-base";
import T from "prop-types";

import {
  MyLinearGradient,
  MainInput,
  SmallBlueButton,
  IconButton
} from "@components/AllComponents";

export default function ChangeEmailForm({
  onChangeValue,
  goProfileScreen,
  changeEmail,
  formCredentials,
  formErrors
}) {
  return (
    <MyLinearGradient>
      <Container style={styles.center}>
        <Form>
          <H3 style={{ marginLeft: 0 }}>Change email</H3>
          <MainInput
            onChangeText={onChangeValue}
            placeholder={"New email*"}
            name={"email"}
            value={formCredentials.email}
            error={formErrors["email"]}
          />
          <MainInput
            onChangeText={onChangeValue}
            placeholder="Password*"
            name={"password_email"}
            secureTextEntry={true}
            value={formCredentials.password_email}
            error={formErrors["password_email"]}
          />
          <View style={styles.bottom}>
            <IconButton onPress={goProfileScreen} text={"Profile"} />
            <SmallBlueButton onPress={changeEmail} text={"Save"} />
          </View>
        </Form>
      </Container>
    </MyLinearGradient>
  );
}
ChangeEmailForm.propTypes = {
  onChangeValue: T.func.isRequired,
  goProfileScreen: T.func.isRequired,
  changeEmail: T.func.isRequired,
  formCredentials: T.object.isRequired,
  formErrors: T.object.isRequired
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center"
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  }
});
