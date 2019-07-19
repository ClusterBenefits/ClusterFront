import React, { useState, useEffect } from "react";
import debounce from "lodash/debounce";

import NewPasswordScreenForm from "./NewPasswordScreenForm";
import { setNewUserPassword } from "../../../actions/userActions";
import { LoadingHOC } from "@components/AllComponents";
import {
  singleFieldValidation,
  allFieldsValidation
} from "./../../../utils/validation";

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
    debounceSingleFieldValidation({ name, value });
  };

  // check if input field is correct after typing

  const debounceSingleFieldValidation = debounce(({ name, value }) => {
    const { isValid, errors } = singleFieldValidation({ key: name, value });
    if (!isValid) {
      setFormErrors({ ...formErrors, [name]: errors[name] });
    } else {
      setFormErrors({ ...formErrors, [name]: null });
    }
  }, 600);

  const goLogin = async () => {
    const { isValid, errors } = allFieldsValidation(formCredentials);

    if (!isValid) {
      setFormErrors(errors);
    } else {
      setIsLoading(true);
      const email = props.navigation.getParam("email", "Peter");
      const token = props.navigation.getParam("token", "Peter");

      // setting new passowrd

      let response = await setNewUserPassword({
        email,
        token,
        password: formCredentials.password,
        password_confirmation: formCredentials.password_confirmation
      });
      if (response) {
        // new password ready to go
        props.navigation.navigate("LoginScreen");
      }
      setIsLoading(false);
    }
  };

  return (
    <NewPasswordScreenWithLoading
      isLoading={isLoading}
      onChangeValue={onChangeValue}
      goLogin={goLogin}
      formCredentials={formCredentials}
      formErrors={formErrors}
    />
  );
}
