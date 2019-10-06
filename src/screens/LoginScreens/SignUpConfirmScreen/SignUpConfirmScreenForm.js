import React from "react";
import { StyleSheet, View } from "react-native";
import { H1, Text } from "native-base";
import T from "prop-types";
import CodeInput from "react-native-confirmation-code-field";

import {
  BlueButton,
  MyLinearGradient,
  Header
} from "@components/AllComponents";
import { colors } from "../../../constants";

const s = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 20
  },
  inputContainer: {
    justifyContent: "space-between",
    marginTop: 80,
    marginHorizontal: 25
  },
  inputCell: {
    borderColor: colors.mainBlack,
    height: 50,
    width: 45
  },
  maxFlex: {
    flex: 1
  },
  enterText: {
    textAlign: "center",
    marginBottom: 5
  }
});

export default function SignUpForm({
  goNewPassword,
  code,
  setVerificationCode,
  resendVarificationCode,
  navigation
}) {
  const isValid = code.length === 4;

  return (
    <MyLinearGradient style={s.container}>
      <Header
        navigation={navigation}
        onTitleRightPress={resendVarificationCode}
        titleRightText="Надіслати код знову"
      />
      <H1>Підтвердження</H1>

      <CodeInput
        onFulfill={setVerificationCode}
        codeLength={4}
        cellProps={{ style: s.inputCell }}
        activeColor={colors.mainBlack}
        cellBorderWidth={1}
        containerProps={{ style: s.inputContainer }}
        inputProps={{ onChangeText: setVerificationCode }}
      />
      <View style={s.maxFlex} />
      <Text style={s.enterText}>
        Введіть отриманий на емейл 4-ти значний код
      </Text>

      <BlueButton
        text="Підтвердити скидання паролю"
        onPress={goNewPassword}
        isValid={isValid}
      />
    </MyLinearGradient>
  );
}

SignUpForm.propTypes = {
  goNewPassword: T.func.isRequired,
  code: T.string.isRequired,
  setVerificationCode: T.func.isRequired,
  resendVarificationCode: T.func.isRequired,
  navigation: T.object.isRequired
};
