import React from "react";
import { StyleSheet, View } from "react-native";
import { Form, CheckBox, ListItem, Body, Text } from "native-base";
import T from "prop-types";

import { MyLinearGradient, BlueButton, MainInput, Header } from "../../../components";
import { colors } from "../../../constants";

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 16
  },
  flexMax: {
    flex: 1
  },
  extraMarginTop: {
    marginTop: 20
  },
  extraMarginLeft: {
    marginLeft: 20
  },
  checkBoxContainer: {
    marginLeft: 10,
    borderBottomWidth: 0
  },
  checkBox: {
    backgroundColor: "transparent"
  }
});

export default function AddCreditInfoScreen({ post, onChangeValue, formCredentials, navigation, isValid }) {
  return (
    <MyLinearGradient withScroll style={s.container}>
      <Header titleText="Нова карта" navigation={navigation} />
      <MainInput
        placeholder="Номер карти"
        onChangeText={onChangeValue}
        maxLength={19}
        name="credit_card_number"
        value={formCredentials.credit_card_number}
        containerStyle={s.extraMarginTop}
      />

      <MainInput
        placeholder="Термін дії"
        onChangeText={onChangeValue}
        maxLength={5}
        name="expiration"
        value={formCredentials.expiration}
      />

      <MainInput
        placeholder={"CVV"}
        onChangeText={onChangeValue}
        maxLength={3}
        name="cvv2"
        value={formCredentials.cvv2}
      />

      {/* <MainInput
        placeholder={"City"}
        onChangeText={onChangeValue}
        maxLength={20}
        name="city"
        value={formCredentials.city}
        error={formErrors["city"]}
      />

      <MainInput
        placeholder={"Address"}
        onChangeText={onChangeValue}
        maxLength={25}
        name="address"
        value={formCredentials.address}
        error={formErrors["address"]}
      />

      <MainInput
        placeholder={"Postal Code"}
        onChangeText={onChangeValue}
        maxLength={10}
        name="postal_code"
        value={formCredentials.postal_code}
        error={formErrors["postal_code"]}
      /> */}

      <ListItem style={s.checkBoxContainer}>
        <CheckBox
          style={s.checkBox}
          checked={!formCredentials.checkBox}
          onPress={value => onChangeValue("checkBox", value)}
        />
        <Body style={s.extraMarginLeft}>
          <Text>Я погоджуюсь з умовами користування сервісом</Text>
        </Body>
      </ListItem>

      <View style={s.flexMax} />
      <BlueButton text="Зберегти" onPress={post} disabled={!isValid} withMarginBottom />
    </MyLinearGradient>
  );
}

AddCreditInfoScreen.propTypes = {
  onChangeValue: T.func.isRequired,
  post: T.func.isRequired,
  navigation: T.object.isRequired,
  isValid: T.bool.isRequired
};
