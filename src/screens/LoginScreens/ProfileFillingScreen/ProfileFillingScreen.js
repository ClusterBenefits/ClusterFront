import React, { useState, useContext } from "react";

import { UserContext } from "./../../../reducers/context";
import ProfileFillingScreenForm from "./ProfileFillingScreenForm";
import { postUserInfo } from "../../../actions/userActions";
import { LoadingHOC } from "@components/AllComponents";
import { allFieldsValidation } from "../../../utils";
import { screens } from "../../../constants";

const ProfileFillingScreenWithLoading = LoadingHOC(ProfileFillingScreenForm);

export default function ProfileFillingScreen({ navigation }) {
  const [formCredentials, setFormCredentials] = useState({
    firstName: "",
    lastName: "",
    organization: "",
    position: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { isValid, errors } = allFieldsValidation(formCredentials);
  const { state, dispatch } = useContext(UserContext);
  // trying to get user token for pushnotification

  const onChangeValue = (name, value) => {
    setFormCredentials({ ...formCredentials, [name]: value });
  };

  // filling profile information ( name last_name etc )

  const onSubmit = async () => {
    console.log(errors, isValid);
    setIsLoading(true);
    let data = {
      first_name: formCredentials.firstName,
      last_name: formCredentials.lastName,
      company: formCredentials.organization,
      position: formCredentials.position
    };
    let response = await postUserInfo({ token: state.token, data, dispatch });
    response
      ? navigation.navigate(screens.AddCreditInfoScreen)
      : setIsLoading(false);
  };
  const goWelcomeScreen = () => navigation.pop();

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
