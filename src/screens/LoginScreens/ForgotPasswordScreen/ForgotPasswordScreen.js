import React, { useState, useEffect } from "react";
import { BackHandler } from "react-native";

import { handleBackButton, resetUserPassword } from "../../../actions/userActions";
import ForgotPasswordScreenForm from "./ForgotPasswordScreenForm";
import { allFieldsValidation } from "./../../../utils/validation";
import { screens } from "../../../constants";
import { LoadingHOC } from "../../../components";

const ForgotPasswordScreenWithLoading = LoadingHOC(ForgotPasswordScreenForm);

export default function ForgotPasswordScreen({ navigation }) {
  const [formCredentials, setFormCredentials] = useState({ email: "" });
  const [isLoading, setIsLoading] = useState(false);

  const { isValid } = allFieldsValidation(formCredentials);

  const onChangeValue = (name, value) => {
    setFormCredentials({ ...formCredentials, [name]: value });
  };

  // check if input field is correct after typing

  const resetPassword = async () => {
    setIsLoading(true);
    // trying to reset password, if email is in database go to the next screen
    let response = await resetUserPassword({
      email: formCredentials.email
    });
    if (response) {
      // sending email to the next screen
      navigation.navigate(screens.SignUpConfirmScreen, {
        email: formCredentials.email
      });
    }
    setIsLoading(false);
  };

  return (
    <ForgotPasswordScreenWithLoading
      isLoading={isLoading}
      onChangeValue={onChangeValue}
      resetPassword={resetPassword}
      formCredentials={formCredentials}
      navigation={navigation}
      isValid={isValid}
    />
  );
}
