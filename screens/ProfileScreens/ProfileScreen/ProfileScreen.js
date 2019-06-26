import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./../../../reducers/context";
import { handleBackButton } from "../../../actions/userActions";
import { BackHandler } from "react-native";
import ProfileScreenForm from "./ProfileScreenForm";
import T from "prop-types";

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
  return (
    <ProfileScreenForm
      goProfileEditScreen={goProfileEditScreen}
      goChangeEmailScreen={goChangeEmailScreen}
      goChangePasswordScreen={goChangePasswordScreen}
      goBillingInformation={goBillingInformation}
      goAddCommentScreen={goAddCommentScreen}
      userInfo={state.userInfo}
    />
  );
}

ProfileScreen.propTypes = {
  userInfo: T.object
};
