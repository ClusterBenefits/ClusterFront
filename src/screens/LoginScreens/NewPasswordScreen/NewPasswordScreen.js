import React, { useState } from "react";

import NewPasswordScreenForm from "./NewPasswordScreenForm";
import { setNewUserPassword } from "../../../actions/userActions";
import { LoadingHOC } from "@components/AllComponents";
import { screens } from "../../../constants";

const NewPasswordScreenWithLoading = LoadingHOC(NewPasswordScreenForm);

export default function ForgotPasswordScreen(props) {
  const [formCredentials, setFormCredentials] = useState({
    password: "",
    password_confirmation: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const onChangeValue = (name, value) => {
    setFormCredentials({ ...formCredentials, [name]: value });
  };

  // check if input field is correct after typing

  const goLogin = async () => {
    setIsLoading(true);
    const email = props.navigation.getParam("email", "");
    const token = props.navigation.getParam("token", "");

    // setting new passowrd

    let response = await setNewUserPassword({
      email,
      token,
      password: formCredentials.password,
      password_confirmation: formCredentials.password_confirmation
    });
    if (response) {
      // new password ready to go
      props.navigation.navigate(screens.LoginScreen);
    }
    setIsLoading(false);
  };

  return (
    <NewPasswordScreenWithLoading
      isLoading={isLoading}
      onChangeValue={onChangeValue}
      goLogin={goLogin}
      formCredentials={formCredentials}
    />
  );
}
