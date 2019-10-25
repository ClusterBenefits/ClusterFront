import React, { useState, useEffect, useContext, useCallback } from "react";
import { StatusBar } from "react-native";

import { UserContext } from "./../../../reducers/context";
import LoginScreenForm from "./LoginScreenForm";
import { loginUser } from "../../../actions/userActions";
import { saveDataToLocalStorage, getDataFromLocalStorage, allFieldsValidation } from "../../../utils";
import { screens, colors } from "../../../constants";
import { LoadingHOC } from "../../../components";
import { useNavigationIsFocus, useBackButton } from "../../../hooks";

const LoginScreenWithLoading = LoadingHOC(LoginScreenForm);

export default function LoginScreen({ navigation }) {
  const [formCredentials, setFormCredentials] = useState({
    email: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState({});
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
  }, []);
  useBackButton(true);

  const onChangeValue = (name, value) => {
    setFormCredentials({ ...formCredentials, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const logInUser = async () => {
    const { errors } = allFieldsValidation(formCredentials, {
      email: "Неправильний емейл",
      min: "Кількість символів в полі повинна бути не менше 8"
    });
    if (errors) {
      setFormErrors(errors);
      return;
    }
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
      formErrors={formErrors}
    />
  );
}
