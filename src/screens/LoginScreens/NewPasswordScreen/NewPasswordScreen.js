import React, { useState } from "react";

import NewPasswordScreenForm from "./NewPasswordScreenForm";
import { setNewUserPassword } from "../../../actions/userActions";
import { screens } from "../../../constants";
import { LoadingHOC } from "../../../components";
import { allFieldsValidation } from "../../../utils";
import { useBackButton } from "../../../hooks";

const NewPasswordScreenWithLoading = LoadingHOC(NewPasswordScreenForm);

export default function ForgotPasswordScreen(props) {
  const [formCredentials, setFormCredentials] = useState({
    password: "",
    password_confirmation: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onChangeValue = (name, value) => {
    setFormCredentials({ ...formCredentials, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };
  useBackButton(false);
  // check if input field is correct after typing

  const goLogin = async () => {
    const { errors } = allFieldsValidation(formCredentials, {
      same: "Пароль не співпадає",
      min: "Кількість символів в полі повинна бути не менше 6"
    });
    if (errors) {
      setFormErrors(errors);
      return;
    }
    setIsLoading(true);
    const {email, token} = props.route.params;
    // setting new passowrd

    let response = await setNewUserPassword({
      email,
      token,
      password: formCredentials.password,
      password_confirmation: formCredentials.password_confirmation
    });
    if (response) {
      // new password ready to go
      console.log("password response", response);
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
      formErrors={formErrors}
      navigation={props.navigation}
    />
  );
}
