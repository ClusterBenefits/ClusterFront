import React, { useContext, useState } from "react";

import { UserContext } from "../../../reducers/context";
import { clearUserLocal } from "../../../actions/userActions";
import ProfileScreenForm from "./ProfileScreenForm";
import { screens, navigation as navName } from "../../../constants";
import { useBackButton } from "../../../hooks";

export default function ProfileScreen({ navigation }) {
  const {
    state: { userInfo },
    dispatch
  } = useContext(UserContext);

  const [isModal, toggleModal] = useState(false);

  useBackButton(true);

  const redirectToScreen = (screenName, props) => {
    if(screenName === screens.BillingInformationScreen) {
      toggleModal(true);
    } else {
      navigation.navigate(screenName, { props });
    }
  };

  const signOutUser = async () => {
    const response = await clearUserLocal({ dispatch });
    if (response === "Yes") navigation.reset({
      index: 0,
      routes: [{name: navName.WelcomeNavigator}]
    });
  };

  return (
    <ProfileScreenForm 
      hideModal={() => toggleModal(false)}
      isModal={isModal}
      redirectToScreen={redirectToScreen} 
      signOutUser={signOutUser} 
      userInfo={userInfo} />
  );
}
