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

export default function ChangeEmailForm({
  onChangeValue,
  goProfileScreen,
  changeEmail,
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
      </ScrollView>
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
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  }
});
