import React, { useContext } from "react";

import { UserContext } from "../../../reducers/context";
import { clearUserLocal } from "../../../actions/userActions";
import ProfileScreenForm from "./ProfileScreenForm";
import { screens } from "../../../constants";
import { useBackButton } from "../../../hooks";

export default function ProfileScreen({ navigation }) {
  const {
    state: { userInfo },
    dispatch
  } = useContext(UserContext);

  useBackButton(true);

  const redirectToScreen = (screenName, props) => {
    navigation.navigate(screenName, { props });
  };

  const signOutUser = async () => {
    const response = await clearUserLocal({ dispatch });
    if (response === "Yes") navigation.navigate(screens.LoginScreen);
  };

  return (
    <ProfileScreenForm redirectToScreen={redirectToScreen} signOutUser={signOutUser} userInfo={userInfo} />
  );
}
