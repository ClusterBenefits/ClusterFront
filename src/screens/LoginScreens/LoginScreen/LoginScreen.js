import React, { useState, useEffect, useContext } from "react";
import { BackHandler } from "react-native";

import { UserContext } from "./../../../reducers/context";
import LoginScreenForm from "./LoginScreenForm";
import { LoadingHOC } from "@components/AllComponents";
import { handleBackButton, loginUser } from "../../../actions/userActions";
import { saveDataToLocalStorage, getDataFromLocalStorage, allFieldsValidation } from "../../../utils";
import { screens } from "../../../constants";

const LoginScreenWithLoading = LoadingHOC(LoginScreenForm);

export default function LoginScreen({ navigation }) {
  const [formCredentials, setFormCredentials] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const autoAuth = async () => {
      let { email, password } = await getDataFromLocalStorage();
      console.log(email, password);
      if (!(email === "none") && !(password === "none")) {
        let response = await loginUser({
          email,
          password,
          dispatch
        });

        if (response) {
          navigation.navigate(screens.WelcomeScreen);
        } else {
          console.log("wrong token");
          setIsLoading(false);
        }
      } else {
        console.log("no data at async storage");
        setIsLoading(false);
      }
    };
    autoAuth();

    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  const onChangeValue = (name, value) => {
    setFormCredentials({ ...formCredentials, [name]: value });
  };
  const { isValid } = allFieldsValidation(formCredentials);

  const logInUser = async () => {
    setIsLoading(true);
    // try to login with email/password

    let response = await loginUser({
      dispatch,
      email: formCredentials.email,
      password: formCredentials.password
    });
    if (response) {
      // if login is successful save password/login

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

  const goForgotPassword = () => {
    navigation.navigate(screens.ForgotPasswordScreen);
  };

  const goSignUp = () => {
    navigation.navigate(screens.SignUpScreen);
  };

  return (
    <LoginScreenWithLoading
      isLoading={isLoading}
      logInUser={logInUser}
      goForgotPassword={goForgotPassword}
      goSignUp={goSignUp}
      onChangeValue={onChangeValue}
      formCredentials={formCredentials}
      isValid={isValid}
    />
  );
}
