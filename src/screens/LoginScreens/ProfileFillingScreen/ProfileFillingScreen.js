import React, { useState, useContext } from "react";

import { UserContext } from "./../../../reducers/context";
import ProfileFillingScreenForm from "./ProfileFillingScreenForm";
import { postUserInfo } from "../../../actions/userActions";
import { allFieldsValidation } from "../../../utils";
import { screens } from "../../../constants";
import { LoadingHOC } from "../../../components";

const ProfileFillingScreenWithLoading = LoadingHOC(ProfileFillingScreenForm);

export default function ProfileFillingScreen({ navigation }) {
  const [formCredentials, setFormCredentials] = useState({
    firstName: "",
    lastName: "",
    organization: "",
    position: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { isValid } = allFieldsValidation(formCredentials);
  const { state, dispatch } = useContext(UserContext);

  const onChangeValue = (name, value) => {
    setFormCredentials({ ...formCredentials, [name]: value });
  };

  // filling profile information ( name last_name etc )

  const onSubmit = async () => {
    setIsLoading(true);
    let data = {
      first_name: formCredentials.firstName,
      last_name: formCredentials.lastName,
      company: formCredentials.organization,
      position: formCredentials.position
    };
    let response = await postUserInfo({ token: state.token, data, dispatch });
    response ? navigation.navigate(screens.ListingScreen) : setIsLoading(false);
  };
  const goWelcomeScreen = () => navigation.navigate(screens.WelcomeScreen);

  return (
    <ProfileFillingScreenWithLoading
      isLoading={isLoading}
      onChangeValue={onChangeValue}
      onSubmit={onSubmit}
      formCredentials={formCredentials}
      isValid={isValid}
      goWelcomeScreen={goWelcomeScreen}
    />
  );
}
