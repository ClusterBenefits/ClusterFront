import React from "react";
import { StyleSheet, View } from "react-native";
import { Container, Form, H3 } from "native-base";
import T from "prop-types";
import {
  MyLinearGradient,
  MainInput,
  SmallBlueButton,
  IconButton
} from "@components/AllComponents";

profileEdit.propTypes = {
  onChangeValue: T.func,
  post: T.func,
  goProfileScreen: T.func,
  formCredentials: T.object,
  formErrors: T.object
};

export default function profileEdit({
  post,
  goProfileScreen,
  onChangeValue,
  formCredentials,
  formErrors
}) {
  return (
    <MyLinearGradient>
      <Container style={{ justifyContent: "center" }}>
        <Form>
          <H3 style={{ marginLeft: 0 }}>Profile edit</H3>
          <MainInput
            onChangeText={onChangeValue}
            placeholder={"First name*"}
            name={"firstName"}
            value={formCredentials.firstName}
            error={formErrors["firstName"]}
          />
          <MainInput
            onChangeText={onChangeValue}
            placeholder="Last name*"
            name="lastName"
            value={formCredentials.lastName}
            error={formErrors["lastName"]}
          />
          <MainInput
            onChangeText={onChangeValue}
            placeholder="Organization*"
            name="organization"
            value={formCredentials.organization}
            error={formErrors["organization"]}
          />
          <MainInput
            name="position"
            onChangeText={onChangeValue}
            placeholder="Position*"
            value={formCredentials.position}
            error={formErrors["position"]}
          />
          <View style={styles.bottom}>
            <IconButton onPress={goProfileScreen} text={"Profile"} />
            <SmallBlueButton onPress={post} text={"Edit"} />
          </View>
        </Form>
      </Container>
    </MyLinearGradient>
  );
}

const styles = StyleSheet.create({
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  }
});
