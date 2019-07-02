import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  Container,
  Form,
  Button,
  H3,
  Input,
  Item,
  CheckBox,
  ListItem,
  Body
} from "native-base";
import { MyLinearGradient } from "@components/AllComponents";
import { colors } from "../../../constants/Colors";
import T from "prop-types";

AddCreditInfoScreen.propTypes = {
  onChangeValue: T.func,
  post: T.func,
  formCredentials: T.object,
  formErrors: T.object
};

export default function AddCreditInfoScreen({
  post,
  onChangeValue,
  formCredentials,
  formErrors
}) {
  return (
    <MyLinearGradient>
      <Container style={{ justifyContent: "center" }}>
        <Form>
          <Text style={styles.text}>Card Number</Text>
          <Item style={styles.container}>
            <Input
              placeholderTextColor={"white"}
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
                  placeholder={"XXX"}
                  value={formCredentials.cvv2}
                  onChangeText={value => onChangeValue(value, "cvv2")}
                  style={styles.input}
                  maxLength={4}
                />
              </Item>
            </View>
          </View>
          {formErrors && (
            <Text style={{ color: "white", marginTop: 10 }}>
              {formErrors[Object.keys(formErrors)[0]]}
            </Text>
          )}
        </Form>
        <ListItem
          style={{ borderColor: "white", borderBottomWidth: 0, marginLeft: 0 }}
        >
          <View style={{ alignSelf: "flex-start", marginTop: 5 }}>
            <CheckBox
              style={{ borderColor: "white", backgroundColor: "transparent" }}
              checked={formCredentials.checkBox}
              onPress={value => onChangeValue(value, "checkBox")}
            />
          </View>

          <Body style={{ marginLeft: 15 }}>
            <Text style={{ color: "white" }}>
              Eu velit occaecat eu minim minim nostrud et sunt nostrud
              adipisicing ut aliqua sint. Exercitation qui Lorem ea qui fugiat
              eiusmod id velit. Nisi
            </Text>
          </Body>
        </ListItem>
        {formCredentials.checkBox ? (
          <Button
            full
            style={styles.button2}
            onPress={post}
            textTransform="none"
          >
            <Text style={{ color: "white", fontSize: 18 }}>Pay</Text>
          </Button>
        ) : (
          <Button
            full
            disabled
            style={styles.button1}
            onPress={post}
            textTransform="none"
          >
            <Text style={{ color: "white", fontSize: 18 }}>Pay</Text>
          </Button>
        )}
      </Container>
    </MyLinearGradient>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: "transparent",
    padding: 10
  },
  button1: {
    borderRadius: 3,
    marginTop: 50
  },
  button2: {
    borderRadius: 3,
    backgroundColor: `${colors.blue}`,
    marginTop: 50
  },
  container: {
    marginBottom: 5,
    marginLeft: 0,
    height: 40
  },
  input: {
    paddingBottom: 0,
    marginBottom: -10,
    height: 40,
    borderColor: "red"
  },
  text: {
    color: "white"
  }
});
