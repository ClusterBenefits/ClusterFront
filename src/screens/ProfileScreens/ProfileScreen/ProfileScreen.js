import React, { useEffect, useContext } from "react";
import { BackHandler } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

import { UserContext } from "../../../reducers/context";
import { handleBackButton, clearUserLocal } from "../../../actions/userActions";
import ProfileScreenForm from "./ProfileScreenForm";
import { screens } from "../../../constants";

export default function ProfileScreen({ navigation }) {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    getPermissionAsync();
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") alert("Sorry, we need camera roll permissions to make this work!");
    }
  };

  const redirectToScreen = (screenName, props) => {
    navigation.navigate(screenName, { props });
  };

  const signOutUser = async () => {
    const response = await clearUserLocal({ dispatch });
    if (response === "Yes") navigation.navigate(screens.LoginScreen);
  };

  return (
    <ProfileScreenForm
      redirectToScreen={redirectToScreen}
      signOutUser={signOutUser}
      userInfo={state.userInfo}
    />
  );
}
