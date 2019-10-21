import React, { useState, useEffect, useContext } from "react";

import { UserContext } from "./../../../reducers/context";
import WelcomeScreenForm from "./WelcomeScreenForm";
import {
  fetchUserInfo,
  registerForPushNotificationsAsync,
  checkCreditCardSubscription
} from "../../../actions/userActions";
import { screens } from "../../../constants";
import { LoadingHOC } from "../../../components";
import { useBackButton } from "../../../hooks";

const WelcomeScreenWithLoading = LoadingHOC(WelcomeScreenForm);

export default function WelcomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    // trying to get user info
    async function fetchUserData() {
      let response = await fetchUserInfo({ token: state.token, dispatch });

      // trying to auto login if userInfo is there , otherwise stay here and fill info

      if (response.first_name && response.last_name) {
        await checkCreditCardSubscription({
          token: state.token,
          dispatch
        });
        navigation.navigate(screens.ListingScreen);
      } else {
        setIsLoading(false);
      }
    }
    fetchUserData();

    // update expoPushNotificationKey
    registerForPushNotificationsAsync(state.token);
  }, []);

  useBackButton(true);

  const goProfileFillingScreen = () => {
    navigation.push(screens.ProfileFillingScreen);
  };

  return <WelcomeScreenWithLoading isLoading={isLoading} goProfileFillingScreen={goProfileFillingScreen} />;
}
