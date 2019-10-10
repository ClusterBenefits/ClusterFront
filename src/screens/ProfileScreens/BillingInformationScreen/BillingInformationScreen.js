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

const BillingInformationScreenWithLoading = LoadingHOC(BillingInformationScreenForm);

export default function ProfileEditScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    checkCreditInfo();
    BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);
  const checkCreditInfo = async () => {
    setIsLoading(true);
    await checkCreditCardSubscription({ token: state.token, dispatch });
    setIsLoading(false);
  };

  // remove payment subscription
  const cancelSubscription = async () => {
    deleteCreditCardSubscription({
      dispatch: dispatch,
      token: state.token,
      setIsLoading: setIsLoading
    });
  };
  return (
    <BillingInformationScreenWithLoading
      isLoading={isLoading}
      checkCreditInfo={checkCreditInfo}
      cancelSubscription={cancelSubscription}
      subscription={state.subscription}
      navigation={navigation}
    />
  );
}
