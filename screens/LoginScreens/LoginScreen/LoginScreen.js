import React, { useState, useEffect, useContext } from "react";
import { AsyncStorage, BackHandler } from "react-native";
import debounce from "lodash/debounce";

import { UserContext } from "./../../../reducers/context";
import LoginScreenForm from "./LoginScreenForm";
import { LoadingHOC } from "@components/AllComponents";
import { handleBackButton, loginUser } from "../../../actions/userActions";
import {
  singleFieldValidation,
  allFieldsValidation
} from "./../../../utils/validation";

const LoginScreenWithLoading = LoadingHOC(LoginScreenForm);

export default function LoginScreen(props) {
  const [formCredentials, setFormCredentials] = useState({
    email: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

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
  // saving email / password for autologin next time

  const saveDataToLocalStorage = async (email, password) => {
    try {
      console.log("password and email added to asyncstorage");
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("password", password);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logInUser = async () => {
    const { isValid, errors } = allFieldsValidation(formCredentials);
    if (!isValid) {
      setFormErrors(errors);
    } else {
      setIsLoading(true);
      // try to login with email/password

      let response = await loginUser({
        dispatch,
        email: formCredentials.email,
        password: formCredentials.password
      });
      if (response) {
        // if login is successful we will have a token

        saveDataToLocalStorage(formCredentials.email, formCredentials.password);
        props.navigation.navigate("WelcomeScreen", {});
      } else {
        console.log("wrong token");
        setIsLoading(false);
      }
    }
  };

  const goForgotPassword = () => {
    props.navigation.navigate("ForgotPasswordScreen");
  };

  const goSignUp = () => {
    props.navigation.navigate("SignUpScreen");
  };
  return (
    <LoginScreenWithLoading
      isLoading={isLoading}
      logInUser={logInUser}
      goForgotPassword={goForgotPassword}
      goSignUp={goSignUp}
      onChangeValue={onChangeValue}
      formCredentials={formCredentials}
      formErrors={formErrors}
    />
  );
}
