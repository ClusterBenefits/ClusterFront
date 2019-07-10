import React, { useState, useEffect, useContext } from "react";
import { AsyncStorage, BackHandler } from "react-native";
import ChangePasswordScreenForm from "./ChangePasswordScreenForm";
import { handleBackButton, changePassword } from "../../../actions/userActions";
import { LoadingHOC } from "@components/AllComponents";
import debounce from "lodash/debounce";
import {
  singleFieldValidation,
  allFieldsValidation
} from "./../../../utils/validation";
import { UserContext } from "./../../../reducers/context";

const ChangePasswordScreenWithLoading = LoadingHOC(ChangePasswordScreenForm);

export default function ChangePasswordScreen(props) {
  const [formCredentials, setFormCredentials] = useState({
    realPassword: "",
    oldPassword: "",
    password: "",
    password_confirmation: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    getPassword();
    BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  const getPassword = async () => {
    let password = (await AsyncStorage.getItem("password")) || "none";
    setFormCredentials({ ...formCredentials, realPassword: password });
  };

  const onChangeValue = (name, value) => {
    setFormCredentials({ ...formCredentials, [name]: value });
    debounceSingleFieldValidation({ name, value });
  };

  // check if input field is correct after typing

  const debounceSingleFieldValidation = debounce(({ name, value }) => {
    const { isValid, errors } = singleFieldValidation({ key: name, value });
    if (name === "oldPassword") {
      setFormErrors({ ...formErrors, [name]: null });
    } else if (name === "password_confirmation") {
      setFormErrors({ ...formErrors, [name]: null });
    } else if (!isValid) {
      setFormErrors({ ...formErrors, [name]: errors[name] });
    } else {
      setFormErrors({ ...formErrors, [name]: null });
    }
  }, 600);

  // saving email / password for autologin next time

  const goProfileScreen = () => {
    props.navigation.navigate("ProfileScreen");
  };

  const changeUserPassword = async () => {
    const { isValid, errors } = allFieldsValidation(formCredentials);
    if (!isValid) {
      setFormErrors(errors);
    } else {
      setIsLoading(true);
      // trying to change password
      await changePassword({
        token: state.token,
        old_password: formCredentials.oldPassword,
        new_password: formCredentials.password,
        new_password_confirmation: formCredentials.password_confirmation
      });
      setFormCredentials({ realPassword: formCredentials.realPassword });
      setIsLoading(false);
    }
  };

  return (
    <ChangePasswordScreenWithLoading
      isLoading={isLoading}
      onChangeValue={onChangeValue}
      goProfileScreen={goProfileScreen}
      changePassword={changeUserPassword}
      formCredentials={formCredentials}
      formErrors={formErrors}
    />
  );
}
