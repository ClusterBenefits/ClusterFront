import React, { useState, useEffect } from "react";
import { BackHandler } from "react-native";
import debounce from "lodash/debounce";

import {
  handleBackButton,
  resetUserPassword
} from "../../../actions/userActions";
import ForgotPasswordScreenForm from "./ForgotPasswordScreenForm";
import {
  singleFieldValidation,
  allFieldsValidation
} from "./../../../utils/validation";
import { LoadingHOC } from "@components/AllComponents";

const ForgotPasswordScreenWithLoading = LoadingHOC(ForgotPasswordScreenForm);

export default function ForgotPasswordScreen(props) {
  const [formCredentials, setFormCredentials] = useState({
    email: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  const onChangeValue = (name, value) => {
    setFormCredentials({
      ...formCredentials,
      [name]: value
    });
    debounceSingleFieldValidation({ name, value });
  };

  // check if input field is correct after typing

  const debounceSingleFieldValidation = debounce(({ name, value }) => {
    const { isValid, errors } = singleFieldValidation({ key: name, value });
    if (!isValid) {
      setFormErrors({
        ...formErrors,
        [name]: errors[name]
      });
    } else {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  }, 600);

  const resetPassword = async () => {
    const { isValid, errors } = allFieldsValidation(formCredentials);
    if (!isValid) {
      setFormErrors(errors);
    } else {
      setIsLoading(true);
      // trying to resetpassword, if email is in database go to the next screen
      let response = await resetUserPassword({
        email: formCredentials.email
      });
      if (response) {
        // sending email to the next screen
        props.navigation.navigate("SignUpConfirmScreen", {
          email: formCredentials.email
        });
        return;
      }
      setIsLoading(false);
    }
  };

  return (
    <ForgotPasswordScreenWithLoading
      isLoading={isLoading}
      onChangeValue={onChangeValue}
      resetPassword={resetPassword}
      formCredentials={formCredentials}
      formErrors={formErrors}
    />
  );
}
