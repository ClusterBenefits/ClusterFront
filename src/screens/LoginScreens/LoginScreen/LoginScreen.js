import React, { useState, useEffect, useContext } from "react";

import { UserContext } from "./../../../reducers/context";
import LoginScreenForm from "./LoginScreenForm";
import { loginUser, fetchUserInfo, checkCreditCardSubscription } from "../../../actions/userActions";
import { saveDataToLocalStorage, getDataFromLocalStorage, allFieldsValidation } from "../../../utils";
import { screens, navigation as navName } from "../../../constants";
import { LoadingHOC } from "../../../components";
import { useBackButton } from "../../../hooks";

const LoginScreenWithLoading = LoadingHOC(LoginScreenForm);

export default function LoginScreen({ navigation }) {
  const [formCredentials, setFormCredentials] = useState({
    email: "",
    password: ""
  });

  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    const autoAuth = async () => {
      let { email, password } = await getDataFromLocalStorage();
      if (!(email === "none") && !(password === "none")) {

        let response = await loginUser({
          email,
          password,
          dispatch
        });

        if (response) {
          navigation.reset({
            index: 0,
            routes: [{name: navName.FirstLoginNavigator}]
          });
        } else {
          setIsLoading(false);
        }
      } else {
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
    
    console.log(formCredentials);
    let response = await loginUser({
      dispatch,
      email: formCredentials.email,
      password: formCredentials.password
    });

    console.log(response);

    if (response) {
      // if login is successful save password/login
      saveDataToLocalStorage({
        email: formCredentials.email,
        password: formCredentials.password
      });

      const userInfo = await fetchUserInfo({ token: response, dispatch });

      if (userInfo.first_name && userInfo.last_name) {
        await checkCreditCardSubscription({
          token: response,
          dispatch
        });
      }
      
      navigation.reset({
        index: 0,
        routes: [{name: navName.ProfileBottomTabNavigator}]
      });

      //navigation.navigate(screens.WelcomeScreen);
    } else {
      // console.log("wrong token");
      
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
