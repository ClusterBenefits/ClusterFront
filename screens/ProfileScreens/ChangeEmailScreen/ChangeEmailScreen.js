import React, { useState, useEffect, useContext } from "react";
import { AsyncStorage, BackHandler } from "react-native";
import debounce from "lodash/debounce";

import ChangeEmailScreenForm from "./ChangeEmailScreenForm";
import { handleBackButton, changeEmail } from "../../../actions/userActions";
import {
  singleFieldValidation,
  allFieldsValidation
} from "./../../../utils/validation";
import { LoadingHOC } from "@components/AllComponents";
import { UserContext } from "./../../../reducers/context";

const ChangeEmailScreenWithLoading = LoadingHOC(ChangeEmailScreenForm);

export default function IntroScreen(props) {
  const [formCredentials, setFormCredentials] = useState({
    email: "",
    password_email: "",
    password_confirmation_email: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    getPassword();
    return () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);
  // get inital password for validation
  const getPassword = async () => {
    let response = (await AsyncStorage.getItem("password")) || "none";
    setFormCredentials({
      ...formCredentials,
      password_confirmation_email: response
    });
  };

  const onChangeValue = (name, value) => {
    setFormCredentials({ ...formCredentials, [name]: value });
    debounceSingleFieldValidation({ name, value });
  };

  // check if input fields are correct after typing

  const debounceSingleFieldValidation = debounce(({ name, value }) => {
    const { isValid, errors } = singleFieldValidation({ key: name, value });
    if (name === "password_email") {
      setFormErrors({ ...formErrors, [name]: null });
      return;
    }
    if (!isValid) {
      setFormErrors({ ...formErrors, [name]: errors[name] });
    } else {
      setFormErrors({ ...formErrors, [name]: null });
    }
  }, 600);

  const goProfileScreen = () => {
    props.navigation.navigate("ProfileScreen");
  };

  const changeUserEmail = async () => {
    const { isValid, errors } = allFieldsValidation(formCredentials);
    if (!isValid) {
      setFormErrors(errors);
    } else {
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
    }
  };
  return (
    <ChangeEmailScreenWithLoading
      isLoading={isLoading}
      onChangeValue={onChangeValue}
      goProfileScreen={goProfileScreen}
      changeEmail={changeUserEmail}
      formCredentials={formCredentials}
      formErrors={formErrors}
    />
  );
}
