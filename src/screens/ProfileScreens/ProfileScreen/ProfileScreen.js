import React, { useEffect, useContext } from "react";
import { BackHandler } from "react-native";

import { UserContext } from "./../../../reducers/context";
import { handleBackButton, clearUserLocal } from "../../../actions/userActions";
import ProfileScreenForm from "./ProfileScreenForm";
import { screens } from "../../../constants";

export default function ProfileScreen({ navigation }) {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  const redirectToScreen = (screenName, props) => {
    navigation.navigate(screenName, { props });
  };
  // const goChangeEmailScreen = () => {
  //   navigation.navigate(screens.ChangeEmailScreen);
  // };
  // const goChangePasswordScreen = () => {
  //   navigation.navigate(screens.ChangePasswordScreen);
  // };
  // const goBillingInformation = () => {
  //   navigation.navigate(screens.BillingInformationScreen);
  // };
  // const goAddCommentScreen = () => {
  //   navigation.navigate(screens.FeedBackScreen, {
  //     userInfo: state.userInfo
  //   });
  // };
  const signOutUser = async () => {
    let response = await clearUserLocal({ dispatch });
    if (response === "Yes") {
      navigation.navigate(screens.LoginScreen);
    }
  };

  return (
    <ProfileScreenForm
      redirectToScreen={redirectToScreen}
      signOutUser={signOutUser}
      userInfo={state.userInfo}
    />
  );
}
