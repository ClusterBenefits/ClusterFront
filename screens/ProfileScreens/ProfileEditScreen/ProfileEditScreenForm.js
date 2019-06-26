import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Container, Form, Button, H3 } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import { MyLinearGradient, MainInput } from "@components/AllComponents";
import { colors } from "../../../constants/Colors";
import T from "prop-types";

profileEdit.propTypes = {
  onChangeValue: T.func,
  post: T.func,
  goProfileScreen: T.func,
  signOutUser: T.func,
  state: T.object
};

export default function profileEdit({
  post,
  goProfileScreen,
  signOutUser,
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
            <Button onPress={goProfileScreen} bordered style={styles.button}>
              <Icon
                style={{ marginRight: 10 }}
                name="md-arrow-back"
                color="white"
                size={25}
              />
              <Text style={{ fontSize: 18, color: "white" }}>Profile</Text>
            </Button>
            <Button style={styles.button2} onPress={post}>
              <Text style={{ color: "white", fontSize: 18 }}>Edit</Text>
            </Button>
          </View>
          <Button
            full
            style={(styles.button2, { marginTop: 10 })}
            onPress={signOutUser}
          >
            <Text style={{ color: "white", fontSize: 18 }}>logout</Text>
          </Button>
        </Form>
      </Container>
    </MyLinearGradient>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: "transparent",
    padding: 10
  },
  button2: {
    borderRadius: 3,
    backgroundColor: `${colors.blue}`,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  }
});
