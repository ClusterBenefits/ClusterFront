import React, { useEffect, useContext } from "react";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

import { UserContext } from "../../../reducers/context";
import { clearUserLocal } from "../../../actions/userActions";
import ProfileScreenForm from "./ProfileScreenForm";
import { screens } from "../../../constants";
import { useBackButton } from "../../../hooks";

export default function ProfileScreen({ navigation }) {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    getPermissionAsync();
  }, []);
  useBackButton(true);

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
