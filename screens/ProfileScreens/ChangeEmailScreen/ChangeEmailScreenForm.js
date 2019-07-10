import React from "react";
import { StyleSheet, View } from "react-native";
import { Container, Form, H3 } from "native-base";
import {
  MyLinearGradient,
  MainInput,
  SmallBlueButton,
  IconButton
} from "@components/AllComponents";
import T from "prop-types";

changeEmail.propTypes = {
  onChangeValue: T.func,
  goProfileScreen: T.func,
  changeEmail: T.func,
  formCredentials: T.object,
  formErrors: T.object
};

export default function changeEmail({
  onChangeValue,
  goProfileScreen,
  changeEmail,
  formCredentials,
  formErrors
}) {
  return (
    <MyLinearGradient>
      <Container style={styles.center}>
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
      </Container>
    </MyLinearGradient>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: "center"
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  }
});
