import React from "react";
import { StyleSheet, View } from "react-native";
import { H1, Text } from "native-base";
import T from "prop-types";

import { MyLinearGradient, BlueButton, Header } from "@components/AllComponents";
import { CreditCardBigIcon } from "../../../assets/svg";
import { screens } from "../../../constants";

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 16
  },
  flexMax: {
    flex: 1
  },
  imageStyle: {
    marginVertical: 45,
    alignSelf: "center"
  }
});

export default function BillingInformationScreen({ navigation, subscribed, subscription }) {
  return (
    <MyLinearGradient style={s.container}>
      <>
        {/* {subscribed ? (
          <>
            <Text style={styles.text}>Expiration Date: 2019.09.10</Text>
            <Text style={styles.text}>Card Number</Text>
            <Item style={styles.container}>
              <H3>{credit_card_number}</H3>
            </Item>
            
          </>
        ) : null} */}
        <Header navigation={navigation} titleText="інформація про оплату" />
        <CreditCardBigIcon style={s.imageStyle} />
        <H1>Платіжну карту не додано</H1>
        <Text>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </Text>
        <View style={s.flexMax} />
        <BlueButton
          text="Додати карту"
          withMarginBottom
          onPress={() => navigation.navigate(screens.AddCreditInfoScreen)}
        />
      </>
    </MyLinearGradient>
  );
}
BillingInformationScreen.propTypes = {
  navigation: T.object.isRequired
};

// const isSubscriptionActive =
// subscription &&
// subscription.expired_at &&
// new Date(subscription.expired_at).getTime() > new Date().getTime();
// <H3 style={{ marginLeft: 0, marginBottom: 20 }}>Billing information</H3>
// {(isSubscriptionActive && (
//   <>
//     <Text style={styles.text}>Expiration Date: 2019.09.10</Text>
//     <Text style={styles.text}>Card Number</Text>
//     <Item style={styles.container}>
//       <H3>4444**44</H3>
//     </Item>
//   </>
// )) ||
//   (subscription && <Text> Checking subscription , it may take few minutes</Text>) || (
//     <Text> You have no subscription</Text>
//   )}
// <View style={styles.bottom}>
//   <IconButton onPress={goProfileScreen} text={"Profile"} />
//   {(isSubscriptionActive && (
//     <SmallBlueButton onPress={cancelSubscription} text={"Cancel Subscription"} />
//   )) ||
//     (subscription && subscription.expired_at && (
//       <SmallBlueButton onPress={checkCreditInfo} text={"Update"} />
//     )) || <SmallBlueButton onPress={goEditBillingInfoScreen} text={"Subscribe"} />}
// </View>
