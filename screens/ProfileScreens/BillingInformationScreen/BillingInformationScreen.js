import React, { useState, useEffect, useContext } from "react";
import BillingInformationScreenForm from "./BillingInformationScreenForm";
import {
  deleteCreditCardSubscription,
  checkCreditCardSubscription
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
    async function bob() {
      await checkCreditCardSubscription({ token: state.token, dispatch });
      setIsLoading(false);
    }
    bob();
  }, []);

  const goProfileScreen = () => {
    props.navigation.navigate("ProfileScreen");
  };

  const goEditBillingInfoScreen = () => {
    props.navigation.navigate("AddCreditInfoScreen", { name: "Back" });
  };

  const cancelSubscription = () => {
    deleteCreditCardSubscription({
      dispatch: dispatch,
      token: state.token,
      id: state.subscription.id
    });
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
