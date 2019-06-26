import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Container, Form, Button, H3, Input, Item } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import { MyLinearGradient } from "@components/AllComponents";
import { colors } from "../../../constants/Colors";
import T from "prop-types";

BillingInformationScreen.propTypes = {
  onChangeValue: T.func,
  post: T.func,
  goProfileScreen: T.func,
  signOutUser: T.func,
  state: T.object
};

export default function BillingInformationScreen({
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
          <H3 style={{ marginLeft: 0, marginBottom: 20 }}>
            Billing information
          </H3>
          <Text style={styles.text}>Card Number</Text>
          <Item style={styles.container}>
            <Input
              placeholderTextColor={"white"}
              selectionColor={"white"}
              placeholder={"XXXX-XXXX-XXXX-XXXX"}
              value={formCredentials.creditCardNumber}
              onChangeText={value => onChangeValue(value, "creditCardNumber")}
              style={styles.input}
              maxLength={19}
            />
          </Item>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ marginRight: 40 }}>
              <Text style={styles.text}>Expiration</Text>

              <Item style={[styles.container, { width: 80 }]}>
                <Input
                  placeholderTextColor={"white"}
                  selectionColor={"white"}
                  placeholder={"MM/YY"}
                  value={formCredentials.expiration}
                  onChangeText={value => onChangeValue(value, "expiration")}
                  style={styles.input}
                  maxLength={5}
                />
              </Item>
            </View>
            <View>
              <Text style={styles.text}>CVV2</Text>
              <Item style={[styles.container, { width: 50 }]}>
                <Input
                  placeholderTextColor={"white"}
                  selectionColor={"white"}
                  placeholder={"XXX"}
                  value={formCredentials.cvv2}
                  onChangeText={value => onChangeValue(value, "cvv2")}
                  style={styles.input}
                  maxLength={4}
                />
              </Item>
            </View>
          </View>
          {formErrors ? <Text>{formErrors.value}</Text> : null}
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
            <Button style={styles.button2} onPress={post} textTransform="none">
              <Text style={{ color: "white", fontSize: 18 }}>Save</Text>
            </Button>
          </View>
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
  },
  container: {
    marginBottom: 5,
    marginLeft: 0,
    height: 40
  },
  input: {
    paddingBottom: 0,
    marginBottom: -10,
    height: 40
  },
  text: {
    color: "white"
  }
});
