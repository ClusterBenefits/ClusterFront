import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Container, Form, Button, H1, H3 } from "native-base";
import { MyLinearGradient, MainInput } from "@components/AllComponents";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../../../constants/Colors";
import T from "prop-types";

changeEmail.propTypes = {
  onChangeValue: T.func,
  goProfileScreen: T.func,
  changeEmail: T.func,
  state: T.object
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
            <Button
              onPress={goProfileScreen}
              white
              bordered
              style={styles.button}
            >
              <Icon
                style={{ marginRight: 10 }}
                name="md-arrow-back"
                color="white"
                size={25}
              />
              <Text style={{ fontSize: 18, color: "white" }}>Profile</Text>
            </Button>
            <Button style={styles.button2} onPress={changeEmail}>
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
