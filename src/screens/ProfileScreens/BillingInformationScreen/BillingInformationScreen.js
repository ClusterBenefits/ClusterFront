import React, { useState, useEffect, useContext } from "react";

import BillingInformationScreenForm from "./BillingInformationScreenForm";
import {
  deleteCreditCardSubscription,
  checkCreditCardSubscription,
  fetchUserInfo
} from "../../../actions/userActions";
import { UserContext } from "../../../reducers/context";
import { isSubscribed } from "../../../utils";
import { LoadingHOC } from "../../../components";
import { useBackButton } from "../../../hooks";

const BillingInformationScreenWithLoading = LoadingHOC(BillingInformationScreenForm);

export default function ProfileEditScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    state: { userInfo, token, subscription },
    dispatch
  } = useContext(UserContext);
  const subscribed = isSubscribed(userInfo, subscription);

  useEffect(() => {
    checkSubscription();
  }, []);

  useBackButton(false);

  const checkSubscription = async () => {
    setIsLoading(true);
    await checkCreditCardSubscription({ token, dispatch });
    setIsLoading(false);
  };

  // remove payment subscription
  const cancelSubscription = async () => {
    await deleteCreditCardSubscription({
      dispatch: dispatch,
      token,
      setIsLoading: setIsLoading
    });
  };

  const checkUserInfo = async () => {
    setIsLoading(true);
    await fetchUserInfo({ dispatch: dispatch, token });
    setIsLoading(false);
  };

  return (
    <BillingInformationScreenWithLoading
      isLoading={isLoading}
      cancelSubscription={cancelSubscription}
      checkSubscription={checkSubscription}
      subscription={subscription}
      navigation={navigation}
      subscribed={subscribed}
      userInfo={userInfo}
      checkUserInfo={checkUserInfo}
    />
  );
}
