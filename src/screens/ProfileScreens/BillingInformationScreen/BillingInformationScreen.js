import React, { useState, useEffect, useContext } from "react";

import BillingInformationScreenForm from "./BillingInformationScreenForm";
import { deleteCreditCardSubscription, checkCreditCardSubscription } from "../../../actions/userActions";
import { UserContext } from "../../../reducers/context";
import { isSubscribed } from "../../../utils";
import { LoadingHOC } from "../../../components";
import { useBackButton } from "../../../hooks";

const BillingInformationScreenWithLoading = LoadingHOC(BillingInformationScreenForm);

export default function ProfileEditScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(UserContext);
  const subscribed = isSubscribed(state.subscription);

  useEffect(() => {
    checkCreditInfo();
  }, []);

  useBackButton(false);
  const checkCreditInfo = async () => {
    setIsLoading(true);
    await checkCreditCardSubscription({ token: state.token, dispatch });
    setIsLoading(false);
  };

  const checkSubscription = async () => {
    setIsLoading(true);
    await checkCreditCardSubscription({ token: state.token, dispatch });
    setIsLoading(false);
  };

  // remove payment subscription
  const cancelSubscription = async () => {
    await deleteCreditCardSubscription({
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
      checkSubscription={checkSubscription}
      subscription={state.subscription}
      navigation={navigation}
      subscribed={subscribed}
    />
  );
}
