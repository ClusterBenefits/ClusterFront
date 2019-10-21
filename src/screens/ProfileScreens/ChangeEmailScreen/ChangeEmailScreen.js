import React, { useState, useEffect, useContext } from "react";
import { AsyncStorage } from "react-native";

import ChangeEmailScreenForm from "./ChangeEmailScreenForm";
import { changeEmail } from "../../../actions/userActions";
import { allFieldsValidation } from "./../../../utils/validation";
import { UserContext } from "./../../../reducers/context";
import { LoadingHOC } from "../../../components";
import { useBackButton } from "../../../hooks";

const ChangeEmailScreenWithLoading = LoadingHOC(ChangeEmailScreenForm);

export default function ChangeEmailScreen({ navigation }) {
  const [formCredentials, setFormCredentials] = useState({
    email: "",
    password_email: "",
    password_confirmation_email: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    getPasswordFromStorage();
  }, []);
  useBackButton(false);

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
    setFormErrors({ ...formErrors, [name]: "" });
  };

  // check if input fields are correct after typing

  const changeUserEmail = async () => {
    //settings custom error for password
    const { errors } = allFieldsValidation(formCredentials, {
      same: "Неправильний пароль",
      email: "Неправильний емейл"
    });
    if (errors) {
      setFormErrors(errors);
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
      changeEmail={changeUserEmail}
      formCredentials={formCredentials}
      navigation={navigation}
      formErrors={formErrors}
    />
  );
}
