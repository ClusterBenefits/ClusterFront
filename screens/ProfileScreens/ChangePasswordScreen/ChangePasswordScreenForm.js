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

export default function ChangePasswordForm({
  onChangeValue,
  goProfileScreen,
  changePassword,
  formCredentials,
  formErrors
}) {
  return (
    <MyLinearGradient>
      <Container style={styles.center}>
        <Form>
          <H3 style={{ marginLeft: 0 }}>Change password</H3>
          <MainInput
            onChangeText={onChangeValue}
            placeholder={"Old Password*"}
            name={"oldPassword"}
            secureTextEntry={true}
            value={formCredentials.oldPassword}
            error={formErrors["oldPassword"]}
          />
          <MainInput
            onChangeText={onChangeValue}
            placeholder="New Password*"
            name={"password"}
            secureTextEntry={true}
            value={formCredentials.password}
            error={formErrors["password"]}
          />
          <MainInput
            onChangeText={onChangeValue}
            placeholder="Confirm Password*"
            name={"password_confirmation"}
            secureTextEntry={true}
            value={formCredentials.password_confirmation}
            error={formErrors["password_confirmation"]}
          />
          <View style={styles.bottom}>
            <IconButton onPress={goProfileScreen} text={"Profile"} />
            <SmallBlueButton onPress={changePassword} text={"Save"} />
          </View>
        </Form>
      </Container>
    </MyLinearGradient>
  );
}
ChangePasswordForm.propTypes = {
  onChangeValue: T.func.isRequired,
  goProfileScreen: T.func.isRequired,
  changePassword: T.func.isRequired,
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
