import React from "react";
import { H1, View } from "native-base";
import { StyleSheet } from "react-native";
import T from "prop-types";
import { MyLinearGradient, BlueButton, MainInput, Header } from "../../../components";

const s = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginHorizontal: 20,
    flex: 1
  },
  flexMax: {
    flex: 1
  }
});

export default function ProfileFillingForm({
  onChangeValue,
  onSubmit,
  formCredentials,
  navigation,
  formErrors
}) {
  return (
    <MyLinearGradient withScroll>
      <Header titleText="Додаткова Інформація" navigation={navigation} />
      <View style={s.container}>
        <H1>Реєстрація</H1>
        <MainInput
          placeholder="Ім'я"
          name="firstName"
          value={formCredentials.firstName}
          onChangeText={onChangeValue}
          error={formErrors["firstName"]}
        />
        <MainInput
          placeholder="Прізвище"
          name="lastName"
          value={formCredentials.lastName}
          onChangeText={onChangeValue}
          error={formErrors["lastName"]}
        />
        <MainInput
          placeholder="Компанія"
          name="organization"
          value={formCredentials.organization}
          onChangeText={onChangeValue}
          error={formErrors["organization"]}
        />
        <MainInput
          placeholder="Позиція (не обов'язково)"
          name="position"
          value={formCredentials.position}
          onChangeText={onChangeValue}
          error={formErrors["position"]}
        />
        <View style={s.flexMax} />
        <BlueButton text="Next" onPress={onSubmit} />
      </View>
    </MyLinearGradient>
  );
}

ProfileFillingForm.propTypes = {
  onChangeValue: T.func.isRequired,
  onSubmit: T.func.isRequired,
  formCredentials: T.object.isRequired,
  navigation: T.object.isRequired
};
