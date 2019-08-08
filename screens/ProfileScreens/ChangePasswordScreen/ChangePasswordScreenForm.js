import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Form, H3 } from "native-base";
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
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          flexGrow: 1
        }}
        style={{ paddingHorizontal: 20, marginTop: 30, marginBottom: 20 }}
      >
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
      </ScrollView>
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
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 5
  }
});
