import React, { useState, useContext } from "react";

import SignUpScreenForm from "./SignUpScreenForm";
import { registerUser } from "../../../actions/userActions";
import { allFieldsValidation } from "./../../../utils/validation";
import { saveDataToLocalStorage } from "../../../utils";
import { screens } from "../../../constants";
import { UserContext } from "./../../../reducers/context";
import { LoadingHOC } from "../../../components";
import { useBackButton } from "../../../hooks";

const SignUpScreenWithLoading = LoadingHOC(SignUpScreenForm);

export default function SignUpScreen({ navigation }) {
  const [formCredentials, setFormCredentials] = useState({
    email: "",
    password: "",
    password_confirmation: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(UserContext);

  useBackButton(false);
  const onChangeValue = (name, value) => {
    setFormCredentials({ ...formCredentials, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const signUpUser = async () => {
    const { errors } = allFieldsValidation(formCredentials, {
      email: "Неправильний емейл",
      same: "Пароль не співпадає",
      min: "Кількість символів в полі повинна бути не менше 8"
    });
    if (errors) {
      setFormErrors(errors);
      return;
    }
    setIsLoading(true);
    //try to signup user with email/password

    let response = await registerUser({
      email: formCredentials.email,
      password: formCredentials.password,
      password_confirmation: formCredentials.password_confirmation,
      dispatch
    });
    if (response) {
      // if signup is successful , save password & email

      saveDataToLocalStorage({
        email: formCredentials.email,
        password: formCredentials.password
      });
      navigation.navigate(screens.WelcomeScreen);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <SignUpScreenWithLoading
      isLoading={isLoading}
      onChangeValue={onChangeValue}
      formCredentials={formCredentials}
      signUpUser={signUpUser}
      formErrors={formErrors}
      navigation={navigation}
    />
  );
}
