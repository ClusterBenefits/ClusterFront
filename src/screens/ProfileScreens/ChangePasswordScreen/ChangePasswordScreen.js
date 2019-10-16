import React, { useState, useEffect, useContext } from "react";
import { BackHandler } from "react-native";

import ChangePasswordScreenForm from "./ChangePasswordScreenForm";
import { handleBackButton, changePassword } from "../../../actions/userActions";
import { UserContext } from "./../../../reducers/context";
import { LoadingHOC } from "../../../components";

const ChangePasswordScreenWithLoading = LoadingHOC(ChangePasswordScreenForm);
const initialState = {
  oldPassword: "",
  password: "",
  password_confirmation: ""
};
export default function ChangePasswordScreen({ navigation }) {
  const [formCredentials, setFormCredentials] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(UserContext);

  const isValid =
    formCredentials.password.length > 6 &&
    formCredentials.password_confirmation.length > 6 &&
    formCredentials.oldPassword.length > 6;

  useEffect(() => {
    BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  const onChangeValue = (name, value) => {
    setFormCredentials({ ...formCredentials, [name]: value });
  };

  // saving email / password for autologin next time

  const changeUserPassword = async () => {
    setIsLoading(true);

    // trying to change password
    let response = await changePassword({
      token: state.token,
      old_password: formCredentials.oldPassword,
      new_password: formCredentials.password,
      new_password_confirmation: formCredentials.password_confirmation
    });
    if (response) setFormCredentials(initialState);

    setIsLoading(false);
  };

  return (
    <ChangePasswordScreenWithLoading
      isLoading={isLoading}
      onChangeValue={onChangeValue}
      changePassword={changeUserPassword}
      formCredentials={formCredentials}
      navigation={navigation}
      isValid={isValid}
    />
  );
}
