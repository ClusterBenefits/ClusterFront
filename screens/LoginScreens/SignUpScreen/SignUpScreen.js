import React, { useState, useEffect, useContext } from "react";
import SignUpScreenForm from "./SignUpScreenForm";
import { AsyncStorage, BackHandler } from "react-native";
import { handleBackButton, registerUser } from "../../../actions/userActions";
import { LoadingHOC } from "@components/AllComponents";
import debounce from "lodash/debounce";
import {
  singleFieldValidation,
  allFieldsValidation
} from "./../../../utils/validation";
import { UserContext } from "./../../../reducers/context";

const SignUpScreenWithLoading = LoadingHOC(SignUpScreenForm);

export default function SignUpScreen(props) {
  const [formCredentials, setFormCredentials] = useState({
    email: "",
    password: "",
    password_confirmation: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  });

  const onChangeValue = (name, value) => {
    setFormCredentials({ ...formCredentials, [name]: value });
    debounceSingleFieldValidation({ name, value });
  };

  // check if input field is correct after typing

  const debounceSingleFieldValidation = debounce(({ name, value }) => {
    const { isValid, errors } = singleFieldValidation({ key: name, value });
    if (name === "password_confirmation") {
      setFormErrors({ ...formErrors, [name]: null });
      return;
    }
    if (!isValid) {
      setFormErrors({ ...formErrors, [name]: errors[name] });
    } else {
      setFormErrors({ ...formErrors, [name]: null });
    }
  }, 600);

  // saving email / password after successful try for autologin next time

  const saveDataToLocalStorage = async (email, password) => {
    try {
      console.log("password and email added to asyncstorage");
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("password", password);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signUpUser = async () => {
    const { isValid, errors } = allFieldsValidation(formCredentials);
    if (!isValid) {
      setFormErrors(errors);
    } else {
      setIsLoading(true);

      //try to signup user with email/password

      let response = await registerUser({
        email: formCredentials.email,
        password: formCredentials.password,
        password_confirmation: formCredentials.password_confirmation,
        dispatch
      });
      if (response) {
        // if signup is successful , we will have a token
        console.log("login time");
        saveDataToLocalStorage(formCredentials.email, formCredentials.password);
        props.navigation.navigate("WelcomeScreen", {});
        return;
      } else {
        console.log("wrong token");
      }

      setIsLoading(false);
    }
  };
  const goSignIn = () => {
    props.navigation.navigate("LoginScreen");
  };

  return (
    <SignUpScreenWithLoading
      isLoading={isLoading}
      onChangeValue={onChangeValue}
      formCredentials={formCredentials}
      formErrors={formErrors}
      goSignIn={goSignIn}
      signUpUser={signUpUser}
    />
  );
}
