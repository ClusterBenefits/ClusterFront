import React, { useState, useEffect, useContext } from "react";
import { AsyncStorage } from "react-native";

import ChangePasswordScreenForm from "./ChangePasswordScreenForm";
import { changePassword } from "../../../actions/userActions";
import { UserContext } from "./../../../reducers/context";
import { LoadingHOC } from "../../../components";
import { allFieldsValidation } from "../../../utils";
import { useBackButton } from "../../../hooks";

const ChangePasswordScreenWithLoading = LoadingHOC(ChangePasswordScreenForm);

const initialState = { oldPassword: "", password: "", password_confirmation: "", realPassword: "" };

export default function ChangePasswordScreen({ navigation }) {
  const [formCredentials, setFormCredentials] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { state } = useContext(UserContext);

  useEffect(() => {
    getPasswordFromStorage();
  }, []);

  useBackButton(false);

  const getPasswordFromStorage = async () => {
    let response = (await AsyncStorage.getItem("password")) || "";
    setFormCredentials({
      ...formCredentials,
      realPassword: response
    });
  };

  const onChangeValue = (name, value) => {
    setFormCredentials({ ...formCredentials, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };
  // saving email / password for autologin next time

  const changeUserPassword = async () => {
    const { errors } = allFieldsValidation(formCredentials, {
      same: "Пароль не співпадає",
      min: "Кількість символів в полі повинна бути не менше 8"
    });
    if (errors) {
      setFormErrors(errors);
      return;
    }
    setIsLoading(true);

    // trying to change password
    let response = await changePassword({
      token: state.token,
      old_password: formCredentials.oldPassword,
      new_password: formCredentials.password,
      new_password_confirmation: formCredentials.password_confirmation
    });
    if (response) setFormCredentials({ ...initialState, realPassword: formCredentials.password });

    setIsLoading(false);
  };

  return (
    <ChangePasswordScreenWithLoading
      isLoading={isLoading}
      onChangeValue={onChangeValue}
      changePassword={changeUserPassword}
      formCredentials={formCredentials}
      navigation={navigation}
      formErrors={formErrors}
    />
  );
}
