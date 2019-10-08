import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { Text } from "native-base";
import T from "prop-types";

import {
  MyLinearGradient,
  MainInput,
  BlueButton,
  Header
} from "@components/AllComponents";
import { ButtonModal } from "../../../services/mainModal";
import { url, colors } from "../../../constants";

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  imageStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 15,
    marginTop: 30
  },
  maxFlex: {
    flex: 1
  },
  extraMarginBottom: {
    marginBottom: 30
  },
  uploadText: {
    color: colors.mainBlue
  }
});

export default function ProfileEditForm({
  editUserProfile,
  onChangeValue,
  formCredentials,
  navigation,
  isValid,
  userInfo
}) {
  const { image } = userInfo;
  const imageUrl = image && image.tiny;

  return (
    <MyLinearGradient withScroll style={s.container}>
      <Header navigation={navigation} titleText="Редагування" />
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={
            imageUrl
              ? { uri: `${url}${imageUrl.url}` }
              : require("../../../assets/images/DefaultAvatar.png")
          }
          style={s.imageStyle}
        />
        <TouchableOpacity
          onPress={() => ButtonModal.showModal(navigation, true)}
        >
          <Text style={s.uploadText}>Завантажити фото</Text>
        </TouchableOpacity>
      </View>
      <MainInput
        onChangeText={onChangeValue}
        placeholder="Ім'я"
        name={"firstName"}
        value={formCredentials.firstName}
      />
      <MainInput
        onChangeText={onChangeValue}
        placeholder="Прізвище"
        name="lastName"
        value={formCredentials.lastName}
      />
      <MainInput
        onChangeText={onChangeValue}
        placeholder="Компанія"
        name="organization"
        value={formCredentials.organization}
      />
      <MainInput
        name="position"
        onChangeText={onChangeValue}
        placeholder="Позиція(не обов'язково)"
        value={formCredentials.position}
      />

      <View style={s.maxFlex} />

      <BlueButton
        onPress={editUserProfile}
        text="Зберегти зміни"
        disabled={!isValid}
        style={s.extraMarginBottom}
      />
    </MyLinearGradient>
  );
}

ProfileEditForm.propTypes = {
  onChangeValue: T.func.isRequired,
  editUserProfile: T.func.isRequired,
  goProfileScreen: T.func.isRequired,
  formCredentials: T.object.isRequired,
  navigation: T.object.isRequired,
  isValid: T.bool.isRequired
};
