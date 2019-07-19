import React from "react";
import { StyleSheet, View } from "react-native";
import { Container, Form, H3, Item, Text } from "native-base";
import T from "prop-types";

import {
  MyLinearGradient,
  SmallBlueButton,
  IconButton
} from "@components/AllComponents";

BillingInformationScreen.propTypes = {
  goProfileScreen: T.func,
  goEditBillingInfoScreen: T.func,
  cancelSubscription: T.func,
  signOutUser: T.func
};

export default function BillingInformationScreen({
  goProfileScreen,
  goEditBillingInfoScreen,
  cancelSubscription,
  subscription
}) {
  return (
    <MyLinearGradient>
      <Container style={{ justifyContent: "center" }}>
        <Form>
          <H3 style={{ marginLeft: 0, marginBottom: 20 }}>
            Billing information
          </H3>
          {subscription ? (
            <>
              <Text style={styles.text}>Card Number</Text>
              <Item style={styles.container}>
                <H3>XXXX-XXXX-XXXX-1234</H3>
              </Item>
            </>
          ) : (
            <Text> You have no subscription</Text>
          )}
          <View style={styles.bottom}>
            <IconButton onPress={goProfileScreen} text={"Profile"} />
            {subscription ? (
              <SmallBlueButton
                onPress={cancelSubscription}
                text={"Cancel Subscription"}
              />
            ) : (
              <SmallBlueButton
                onPress={goEditBillingInfoScreen}
                text={"Subscribe"}
              />
            )}
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
  },
  container: {
    marginBottom: 5,
    marginLeft: 0,
    height: 40
  }
});
