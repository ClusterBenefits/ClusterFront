import React, { useState, useEffect, useContext } from "react";
import { BackHandler } from "react-native";

import { UserContext } from "./../../../reducers/context";
import WelcomeScreenForm from "./WelcomeScreenForm";
import {
  fetchUserInfo,
  handleBackButton,
  registerForPushNotificationsAsync,
  checkCreditCardSubscription
} from "../../../actions/userActions";
import { LoadingHOC } from "@components/AllComponents";

const WelcomeScreenWithLoading = LoadingHOC(WelcomeScreenForm);

export default function WelcomeScreen(props) {
  const [isLoading, setIsLoading] = useState(true);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    // trying to get user info
    async function fetchUserData() {
      let response = await fetchUserInfo({ token: state.token, dispatch });

      // trying to autoloign if userinfo is there , otherwise stay here and fill info

      if (response.first_name && response.last_name) {
        await checkCreditCardSubscription({
          token: state.token,
          dispatch
        });
        props.navigation.navigate("ProfileBottomTabNavigatior");
      } else {
        setIsLoading(false);
      }
    }
    fetchUserData();
    registerForPushNotificationsAsync(state.token);
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  // attantion please

  const goProfileFillingScreen = () => {
    props.navigation.navigate("ProfileFillingScreen");
  };

  return (
    <WelcomeScreenWithLoading
      isLoading={isLoading}
      goProfileFillingScreen={goProfileFillingScreen}
    />
  );
}