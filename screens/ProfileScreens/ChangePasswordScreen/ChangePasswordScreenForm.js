import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Container, Form, Button, H3 } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import { MyLinearGradient, MainInput } from "@components/AllComponents";
import { colors } from "../../../constants/Colors";
import T from "prop-types";

changePassword.propTypes = {
  onChangeValue: T.func,
  goProfileScreen: T.func,
  changePassword: T.func,
  state: T.object
};

export default function changePassword({
  onChangeValue,
  goProfileScreen,
  changePassword,
  formCredentials,
  formErrors
}) {
  return (
    <MyLinearGradient>
      <Container style={styles.center}>
        <Form>
          <H3 style={{ marginLeft: 0 }}>Change password</H3>
          <MainInput
            onChangeText={onChangeValue}
            placeholder={"Old Password*"}
            name={"oldPassword"}
            secureTextEntry={true}
            value={formCredentials.oldPassword}
            error={formErrors["oldPassword"]}
          />
          <MainInput
            onChangeText={onChangeValue}
            placeholder="New Password*"
            name={"password"}
            secureTextEntry={true}
            value={formCredentials.password}
            error={formErrors["password"]}
          />
          <MainInput
            onChangeText={onChangeValue}
            placeholder="Confirm Password*"
            name={"password_confirmation"}
            secureTextEntry={true}
            value={formCredentials.password_confirmation}
            error={formErrors["password_confirmation"]}
          />
          <View style={styles.bottom}>
            <Button onPress={goProfileScreen} bordered style={styles.button}>
              <Icon
                style={{ marginRight: 10 }}
                name="md-arrow-back"
                color="white"
                size={25}
              />
              <Text style={{ fontSize: 18, color: "white" }}>Profile</Text>
            </Button>
            <Button style={styles.button2} onPress={changePassword}>
              <Text style={{ color: "white", fontSize: 18 }}>Save</Text>
            </Button>
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
  button: {
    borderColor: "transparent",
    padding: 10
  },
  button2: {
    borderRadius: 3,
    backgroundColor: `${colors.blue}`,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  }
});
