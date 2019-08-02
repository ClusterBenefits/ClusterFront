import React from "react";
import { StyleSheet, View } from "react-native";
import { Container, Form, H3, Item, Text } from "native-base";
import T from "prop-types";

import {
  MyLinearGradient,
  SmallBlueButton,
  IconButton
} from "@components/AllComponents";

export default function BillingInformationScreen({
  goProfileScreen,
  goEditBillingInfoScreen,
  cancelSubscription,
  checkCreditInfo,
  subscription
}) {
  return (
    <MyLinearGradient>
      <Container style={{ justifyContent: "center" }}>
        <Form>
          <H3 style={{ marginLeft: 0, marginBottom: 20 }}>
            Billing information
          </H3>
          {(subscription &&
            subscription.expired_at &&
            new Date(subscription.expired_at).getTime() >
              new Date().getTime() && (
              <>
                <Text style={styles.text}>
                  Expiration Date: {subscription.expired_at}
                </Text>
                <Text style={styles.text}>Card Number</Text>
                <Item style={styles.container}>
                  <H3>{subscription.credit_card_number}</H3>
                </Item>
              </>
            )) ||
            (subscription && (
              <Text> Checking subscription , it may take few minutes</Text>
            )) || <Text> You have no subscription</Text>}
          <View style={styles.bottom}>
            <IconButton onPress={goProfileScreen} text={"Profile"} />
            {(subscription &&
              subscription.expired_at &&
              new Date(subscription.expired_at).getTime() >
                new Date().getTime() && (
                <SmallBlueButton
                  onPress={cancelSubscription}
                  text={"Cancel Subscription"}
                />
              )) ||
              (subscription && subscription.expired_at && (
                <SmallBlueButton onPress={checkCreditInfo} text={"Update"} />
              )) || (
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
BillingInformationScreen.propTypes = {
  goProfileScreen: T.func.isRequired,
  goEditBillingInfoScreen: T.func.isRequired,
  cancelSubscription: T.func.isRequired
};

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
