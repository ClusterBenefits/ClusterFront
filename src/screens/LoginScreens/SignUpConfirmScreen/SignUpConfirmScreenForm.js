import React from "react";
import { StyleSheet, View } from "react-native";
import { Form, H1, H3 } from "native-base";
import T from "prop-types";
import CodeInput from "react-native-confirmation-code-field";

import {
  LogoImage,
  BlueButton,
  MyLinearGradient
} from "@components/AllComponents";

const s = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 65,
    marginBottom: 30
  }
});

export default function SignUpForm({
  goNewPassword,
  verificationCode,
  setVerificationCode
}) {
  return (
    <MyLinearGradient>
      <LogoImage />
      <View style={s.container}>
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
      </View>
    </MyLinearGradient>
  );
}

SignUpForm.propTypes = {
  goNewPassword: T.func.isRequired,
  verificationCode: T.string.isRequired
};
