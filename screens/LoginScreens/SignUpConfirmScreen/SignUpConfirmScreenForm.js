import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Form, H1, H3 } from "native-base";
import T from "prop-types";
import CodeInput from "react-native-confirmation-code-field";

import {
  LogoImage,
  BlueButton,
  MyLinearGradient
} from "@components/AllComponents";

export default function SignUpForm({
  goNewPassword,
  verificationCode,
  setVerificationCode
}) {
  return (
    <MyLinearGradient>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        style={{
          paddingHorizontal: 20,
          marginTop: 30,
          marginBottom: 20
        }}
      >
        <LogoImage />
        <H1>Password reset confirm</H1>
        <H3>A confirmation code was sent to you'r email</H3>

        <CodeInput
          onFulfill={setVerificationCode}
          autoFocus
          codeLength={4}
          cellProps={{
            // placeholderTextColor: 'black',
            style: { borderBottomColor: "black" }
          }}
          activeColor={"white"}
          inactiveColor={"white"}
          cellBorderWidth={1}
          containerProps={{
            style: {
              justifyContent: "space-between"
            }
          }}
          inputProps={{
            onChangeText: setVerificationCode
          }}
        />

        {verificationCode.length === 4 && (
          <BlueButton text="Confirm" onPress={goNewPassword} />
        )}
      </ScrollView>
    </MyLinearGradient>
  );
}

SignUpForm.propTypes = {
  goNewPassword: T.func.isRequired,
  verificationCode: T.string.isRequired
};

const styles = StyleSheet.create({
  form: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between"
  }
});
