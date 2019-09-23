import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Container, Form, H3 } from "native-base";
import T from "prop-types";

import {
  MyLinearGradient,
  MainInput,
  SmallBlueButton,
  IconButton
} from "@components/AllComponents";

export default function ProfileEditForm({
  editUserProfile,
  goProfileScreen,
  onChangeValue,
  formCredentials,
  formErrors
}) {
  return (
    <MyLinearGradient>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          flexGrow: 1
        }}
        style={{ paddingHorizontal: 20, marginTop: 30, marginBottom: 20 }}
        indicatorStyle={"white"}
        scrollbarThumbVertical="@android:color/white"
      >
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
            <SmallBlueButton onPress={editUserProfile} text={"Edit"} />
          </View>
        </Form>
      </ScrollView>
    </MyLinearGradient>
  );
}

ProfileEditForm.propTypes = {
  onChangeValue: T.func.isRequired,
  editUserProfile: T.func.isRequired,
  goProfileScreen: T.func.isRequired,
  formCredentials: T.object.isRequired,
  formErrors: T.object.isRequired
};

const styles = StyleSheet.create({
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 5
  }
});
