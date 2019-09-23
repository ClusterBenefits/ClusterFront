import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Form, CheckBox, ListItem, Body, Text } from "native-base";
import T from "prop-types";

import {
  MyLinearGradient,
  SmallBlueButton,
  SimpleInput
} from "@components/AllComponents";

export default function AddCreditInfoScreen({
  post,
  onChangeValue,
  formCredentials,
  formErrors,
  skip,
  fromWho
}) {
  return (
    <MyLinearGradient>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          flexGrow: 1
        }}
        style={{ paddingHorizontal: 20, marginTop: 30, marginBottom: 20 }}
      >
        <Form style={{ flex: 1 }}>
          <Text style={styles.text}>Card Number</Text>

          <SimpleInput
            placeholder={"XXXX-XXXX-XXXX-XXXX"}
            onChangeText={onChangeValue}
            maxLength={19}
            name="credit_card_number"
            value={formCredentials.credit_card_number}
            error={formErrors["credit_card_number"]}
          />

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ marginRight: 40 }}>
              <Text style={styles.text}>Expiration</Text>

              <SimpleInput
                placeholder={"MM/YY"}
                onChangeText={onChangeValue}
                maxLength={5}
                width={80}
                name="expiration"
                value={formCredentials.expiration}
                error={formErrors["expiration"]}
              />
            </View>
            <View>
              <Text style={styles.text}>CVV2</Text>

              <SimpleInput
                placeholder={"XXX"}
                onChangeText={onChangeValue}
                maxLength={4}
                width={50}
                name="cvv2"
                value={formCredentials.cvv2}
                error={formErrors["cvv2"]}
              />
            </View>
          </View>
          <View>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.text}>City</Text>

              <SimpleInput
                placeholder={"City"}
                onChangeText={onChangeValue}
                maxLength={20}
                name="city"
                value={formCredentials.city}
                error={formErrors["city"]}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.text}>Address</Text>
              <SimpleInput
                placeholder={"Address"}
                onChangeText={onChangeValue}
                maxLength={25}
                name="address"
                value={formCredentials.address}
                error={formErrors["address"]}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.text}>Postal Code</Text>

              <SimpleInput
                placeholder={"Postal Code"}
                onChangeText={onChangeValue}
                maxLength={10}
                name="postal_code"
                value={formCredentials.postal_code}
                error={formErrors["postal_code"]}
              />
            </View>
          </View>
          {formErrors && (
            <Text style={{ marginTop: 10 }}>
              {formErrors[Object.keys(formErrors)[0]]}
            </Text>
          )}
        </Form>
        <ListItem
          style={{
            borderColor: "white",
            borderBottomWidth: 0,
            marginLeft: 0
          }}
        >
          <View style={{ alignSelf: "flex-start", marginTop: 5 }}>
            <CheckBox
              style={{ borderColor: "white", backgroundColor: "transparent" }}
              checked={formCredentials.checkBox}
              onPress={value => onChangeValue("checkBox", value)}
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

        <View style={styles.bottom}>
          <SmallBlueButton
            onPress={skip}
            text={fromWho === "Registration" ? "Skip" : fromWho}
          />

          {formCredentials.checkBox ? (
            <SmallBlueButton onPress={post} text={"Pay"} />
          ) : (
            <SmallBlueButton disabled={true} onPress={post} text={"Pay"} />
          )}
        </View>
      </ScrollView>
    </MyLinearGradient>
  );
}

AddCreditInfoScreen.propTypes = {
  onChangeValue: T.func.isRequired,
  post: T.func.isRequired,
  formCredentials: T.object.isRequired,
  formErrors: T.object.isRequired,
  skip: T.func.isRequired,
  fromWho: T.string.isRequired
};

const styles = StyleSheet.create({
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5
  }
});
