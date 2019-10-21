import React, { useState } from "react";

import { resetUserPassword } from "../../../actions/userActions";
import ForgotPasswordScreenForm from "./ForgotPasswordScreenForm";
import { allFieldsValidation } from "./../../../utils/validation";
import { screens } from "../../../constants";
import { LoadingHOC } from "../../../components";
import { useBackButton } from "../../../hooks";

const ForgotPasswordScreenWithLoading = LoadingHOC(ForgotPasswordScreenForm);

export default function ForgotPasswordScreen({ navigation }) {
  const [formCredentials, setFormCredentials] = useState({ email: "" });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { isValid } = allFieldsValidation(formCredentials);

  const onChangeValue = (name, value) => {
    setFormCredentials({ ...formCredentials, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };
  useBackButton(false);
  // check if input field is correct after typing

  const resetPassword = async () => {
    const { errors } = allFieldsValidation(formCredentials, {
      email: "Неправильний емейл"
    });
    if (errors) {
      setFormErrors(errors);
      return;
    }
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
      formErrors={formErrors}
    />
  );
}
