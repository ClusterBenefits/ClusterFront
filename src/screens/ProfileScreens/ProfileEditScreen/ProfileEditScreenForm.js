import React from "react";
import { StyleSheet, View } from "react-native";
import T from "prop-types";

import { MyLinearGradient, MainInput, BlueButton, Header } from "../../../components";

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1
  },

  maxFlex: {
    flex: 1
  },
  extraMarginBottom: {
    marginBottom: 30
  }
});

export default function ProfileEditForm({
  editUserProfile,
  onChangeValue,
  formCredentials,
  navigation,
  formErrors
}) {
  return (
    <MyLinearGradient withScroll>
      <Header navigation={navigation} titleText="Редагування" />
      <View style={s.container}>
        <MainInput
          onChangeText={onChangeValue}
          placeholder="Ім'я"
          name="firstName"
          value={formCredentials.firstName}
          error={formErrors["firstName"]}
        />
        <MainInput
          onChangeText={onChangeValue}
          placeholder="Прізвище"
          name="lastName"
          value={formCredentials.lastName}
          error={formErrors["lastName"]}
        />
        <MainInput
          onChangeText={onChangeValue}
          placeholder="Компанія"
          name="organization"
          value={formCredentials.organization}
          error={formErrors["organization"]}
        />
        <MainInput
          name="position"
          onChangeText={onChangeValue}
          placeholder="Позиція(не обов'язково)"
          value={formCredentials.position}
        />

        <View style={s.maxFlex} />

        <BlueButton onPress={editUserProfile} text="Зберегти зміни" style={s.extraMarginBottom} />
      </View>
    </MyLinearGradient>
  );
}

ProfileEditForm.propTypes = {
  onChangeValue: T.func.isRequired,
  editUserProfile: T.func.isRequired,
  formCredentials: T.object.isRequired,
  navigation: T.object.isRequired,
  formErrors: T.object.isRequired
};
