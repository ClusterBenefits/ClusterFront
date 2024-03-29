import React from "react";
import { StyleSheet, View } from "react-native";
import { H1, Text } from "native-base";
import T from "prop-types";
import CodeInput from 'react-native-confirmation-code-input';
import { colors } from "../../../constants";
import { BlueButton, Container, Header } from "../../../components";

const s = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
    flex: 1
  },
  inputContainer: {
    justifyContent: "space-between",
    marginTop: 80,
    marginHorizontal: 25
  },
  inputCell: {
    borderWidth: 1,
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
  resendVerificationCode,
  navigation
}) {
  const isValid = code.length === 5;

  return (
    <Container>
      <Header
        navigation={navigation}
        onTitleRightPress={resendVerificationCode}
        titleRightText="Надіслати код знову"
      />
      <View style={s.container}>
        <H1>Підтвердження</H1>
        <CodeInput
          onFulfill={setVerificationCode}
          codeLength={5}
          codeInputStyle={s.inputCell}
          activeColor={colors.mainBlack}
          cellBorderWidth={1}
          keyboardType="numeric"
          containerProps={{ style: s.inputContainer }}
          inputProps={{ onChangeText: setVerificationCode }}
        />
        <View style={s.maxFlex} />
        <Text style={s.enterText}>Введіть отриманий на емейл 5-ти значний код</Text>

        <BlueButton text="Підтвердити скидання паролю" onPress={goNewPassword} disabled={!isValid} />
      </View>
    </Container>
  );
}

SignUpForm.propTypes = {
  goNewPassword: T.func.isRequired,
  code: T.string.isRequired,
  setVerificationCode: T.func.isRequired,
  resendVerificationCode: T.func.isRequired,
  navigation: T.object.isRequired
};
