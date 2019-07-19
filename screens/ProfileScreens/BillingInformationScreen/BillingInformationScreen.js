import React, { useState, useEffect, useContext } from "react";
import { BackHandler } from "react-native";

import BillingInformationScreenForm from "./BillingInformationScreenForm";
import {
  deleteCreditCardSubscription,
  checkCreditCardSubscription,
  handleBackButton
} from "../../../actions/userActions";
import { LoadingHOC } from "@components/AllComponents";
import { UserContext } from "../../../reducers/context";

const BillingInformationScreenWithLoading = LoadingHOC(
  BillingInformationScreenForm
);

export default function ProfileEditScreen(props) {
  const [isLoading, setIsLoading] = useState(true);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    async function checkCreditInfo() {
      await checkCreditCardSubscription({ token: state.token, dispatch });
      setIsLoading(false);
    }
    checkCreditInfo();

    BackHandler.removeEventListener("hardwareBackPress", handleBackButton);

    return () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  const goProfileScreen = () => {
    props.navigation.navigate("ProfileScreen");
  };

  const goEditBillingInfoScreen = () => {
    props.navigation.navigate("AddCreditInfoScreen", { name: "Back" });
  };

  // remove payment subscription
  const cancelSubscription = async () => {
    setIsLoading(true);
    let response = await deleteCreditCardSubscription({
      dispatch: dispatch,
      token: state.token
    });

    setIsLoading(false);
  };

  return (
    <BillingInformationScreenWithLoading
      isLoading={isLoading}
      goProfileScreen={goProfileScreen}
      goEditBillingInfoScreen={goEditBillingInfoScreen}
      cancelSubscription={cancelSubscription}
      subscription={state.subscription}
    />
  );
}
