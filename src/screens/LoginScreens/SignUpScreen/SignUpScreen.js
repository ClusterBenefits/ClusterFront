import React, { useState, useEffect, useContext } from "react";
import { AsyncStorage, BackHandler } from "react-native";

import SignUpScreenForm from "./SignUpScreenForm";
import { handleBackButton, registerUser } from "../../../actions/userActions";
import { LoadingHOC } from "@components/AllComponents";
import { allFieldsValidation } from "./../../../utils/validation";
import { saveDataToLocalStorage } from "../../../utils";
import { screens } from "../../../constants";
import { UserContext } from "./../../../reducers/context";

const SignUpScreenWithLoading = LoadingHOC(SignUpScreenForm);

export default function SignUpScreen({ navigation }) {
  const [formCredentials, setFormCredentials] = useState({
    email: "",
    password: "",
    password_confirmation: ""
  });
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
  };

  const { isValid } = allFieldsValidation(formCredentials);

  const signUpUser = async () => {
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

      console.log("login time");
      saveDataToLocalStorage({
        email: formCredentials.email,
        password: formCredentials.password
      });
      navigation.navigate(screens.WelcomeScreen);
    } else {
      console.log("wrong token");
      setIsLoading(false);
    }
  };
  const goLoginScreen = () => {
    navigation.navigate(screens.SignUpConfirmScreen);
  };

  return (
    <SignUpScreenWithLoading
      isLoading={isLoading}
      onChangeValue={onChangeValue}
      formCredentials={formCredentials}
      goLoginScreen={goLoginScreen}
      signUpUser={signUpUser}
      isValid={isValid}
    />
  );
}
