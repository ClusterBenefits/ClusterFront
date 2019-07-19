import React, { useState, useEffect, useContext } from "react";
import { BackHandler } from "react-native";

import { UserContext } from "./../../../reducers/context";
import { handleBackButton, clearUserLocal } from "../../../actions/userActions";
import ProfileScreenForm from "./ProfileScreenForm";

export default function ProfileScreen(props) {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  const goProfileEditScreen = () => {
    props.navigation.navigate("ProfileEditScreen");
  };
  const goChangeEmailScreen = () => {
    props.navigation.navigate("ChangeEmailScreen");
  };
  const goChangePasswordScreen = () => {
    props.navigation.navigate("ChangePasswordScreen");
  };
  const goBillingInformation = () => {
    props.navigation.navigate("BillingInformationScreen");
  };
  const goAddCommentScreen = () => {
    props.navigation.navigate("FeedBackScreen", {
      userInfo: state.userInfo
    });
  };
  const signOutUser = async () => {
    await clearUserLocal({ dispatch, props });
  };

  return (
    <ProfileScreenForm
      goProfileEditScreen={goProfileEditScreen}
      goChangeEmailScreen={goChangeEmailScreen}
      goChangePasswordScreen={goChangePasswordScreen}
      goBillingInformation={goBillingInformation}
      goAddCommentScreen={goAddCommentScreen}
      signOutUser={signOutUser}
      userInfo={state.userInfo}
    />
  );
}
