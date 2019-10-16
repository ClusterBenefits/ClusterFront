import React from "react";
import { StyleSheet, View } from "react-native";
import { Form, Text } from "native-base";
import T from "prop-types";
import { MyLinearGradient, MainInput, BlueButton, Header } from "../../../components";

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  extraMarginTop: {
    marginTop: 25
  },
  flexMax: {
    flex: 1
  },
  inputMaxHeight: {
    maxHeight: 80
  }
});

export default function commentsForm({ onChangeValue, formCredentials, sendMessage, isValid, navigation }) {
  return (
    <MyLinearGradient style={s.container}>
      <Header titleText="Новий запит" navigation={navigation} />
      <Text style={s.extraMarginTop}>
        Щоб подати новий запит в службу підтримки, вкажіть тему запиту та опишіть проблему
      </Text>
      <Form>
        <MainInput
          placeholder="Тема"
          onChangeText={onChangeValue}
          name="subject"
          value={formCredentials.subject}
        />
        <MainInput
          placeholder={"Довільний опис"}
          onChangeText={onChangeValue}
          name="comment"
          value={formCredentials.myComment}
          style={s.inputMaxHeight}
          multiline
        />
      </Form>
      <View style={s.flexMax} />
      <BlueButton
        text="Подати зміни"
        disabled={!isValid}
        onPress={sendMessage}
        style={s.extraMarginBottom}
        withMarginBottom
      />
    </MyLinearGradient>
  );
}

commentsForm.propTypes = {
  onChangeValue: T.func.isRequired,
  sendMessage: T.func.isRequired,
  formCredentials: T.object.isRequired,
  navigation: T.object.isRequired,
  isValid: T.bool.isRequired
};
