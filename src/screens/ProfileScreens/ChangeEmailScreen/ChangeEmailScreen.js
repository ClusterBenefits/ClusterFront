import React, { useState, useEffect, useContext } from "react";
import { AsyncStorage, BackHandler } from "react-native";

import ChangeEmailScreenForm from "./ChangeEmailScreenForm";
import { handleBackButton, changeEmail } from "../../../actions/userActions";
import { allFieldsValidation } from "./../../../utils/validation";
import { LoadingHOC } from "@components/AllComponents";
import { UserContext } from "./../../../reducers/context";
import { screens } from "../../../constants";

const ChangeEmailScreenWithLoading = LoadingHOC(ChangeEmailScreenForm);

export default function ChangeEmailScreen({ navigation }) {
  const [formCredentials, setFormCredentials] = useState({
    email: "",
    password_email: "",
    password_confirmation_email: ""
  });
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(UserContext);
  const { isValid } = allFieldsValidation({ email: formCredentials.email });
  const isValidButton = isValid && formCredentials.password_email.length > 3;
  useEffect(() => {
    BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    getPasswordFromStorage();
    return () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);
  // get inital password for validation
  const getPasswordFromStorage = async () => {
    let response = (await AsyncStorage.getItem("password")) || "none";
    setFormCredentials({
      ...formCredentials,
      password_confirmation_email: response
    });
  };

  const onChangeValue = (name, value) => {
    setFormCredentials({ ...formCredentials, [name]: value });
    setErrorText("");
  };

  // check if input fields are correct after typing

  const goProfileScreen = () => {
    navigation.navigate(screens.ProfileScreen);
  };

  const changeUserEmail = async () => {
    //settings custom error for password
    const { errors } = allFieldsValidation(formCredentials);
    if (errors) {
      setErrorText("Неправильний пароль");
      return;
    }
    setIsLoading(true);

    //trying to change email
    let response = await changeEmail({
      token: state.token,
      email: formCredentials.email,
      dispatch
    });
    if (response) {
      setFormCredentials({
        ...formCredentials,
        email: "",
        password_email: ""
      });
    }

    setIsLoading(false);
  };
  return (
    <ChangeEmailScreenWithLoading
      isLoading={isLoading}
      onChangeValue={onChangeValue}
      goProfileScreen={goProfileScreen}
      changeEmail={changeUserEmail}
      formCredentials={formCredentials}
      isValid={isValidButton}
      navigation={navigation}
      errorText={errorText}
    />
  );
}
