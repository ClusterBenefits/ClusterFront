import React, { useState, useContext } from "react";

import SignUpScreenForm from "./SignUpScreenForm";
import { registerUser } from "../../../actions/userActions";
import { allFieldsValidation } from "./../../../utils/validation";
import { saveDataToLocalStorage } from "../../../utils";
import { screens, navigation as navigationNames } from "../../../constants";
import { UserContext } from "./../../../reducers/context";
import { LoadingHOC } from "../../../components";
import { useBackButton } from "../../../hooks";

const SignUpScreenWithLoading = LoadingHOC(SignUpScreenForm);

export default function SignUpScreen({ navigation }) {
  const [formCredentials, setFormCredentials] = useState({
    email: "",
    password: "",
    password_confirmation: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPolicy, setPolicy] = useState(false);
  const [isHandlePersonalData, setHandlePersonalData] = useState(false)
  const [buttonIsActive, setActive] = useState(false);
  const { dispatch } = useContext(UserContext);

  useBackButton(false);
  const checkInputs = (state) => {
    return state.email && state.password && state.password_confirmation && state.isHandlePersonalData && state.isPolicy;

  }

  const onChangeValue = (name, value) => {
    setFormCredentials({ ...formCredentials, [name]: value });
    setFormErrors({ ...formErrors, [name]: ''});
    const newState = {
      ...formCredentials,
      isPolicy,
      isHandlePersonalData, 
      [name]: value 
    };

    checkInputs(newState)? setActive(true): setActive(false);
  };

  const signUpUser = async () => {
    const { errors } = allFieldsValidation(formCredentials, {
      email: "Неправильний емейл",
      same: "Пароль не співпадає",
      min: "Кількість символів в полі повинна бути не менше 8"
    });
    if (errors || !buttonIsActive) {
      setFormErrors({
        ...errors,
        isPolicy: !isPolicy? 'Ознайомтесь з політикою конфіденційності': '',
        isHandlePersonalData: !isHandlePersonalData? 'Ознайомтесь з угодою користувача': ''

      });
      return;
    }
    setIsLoading(true);
    //try to signup user with email/password

    let response = await registerUser({
      email: formCredentials.email,
      password: formCredentials.password,
      password_confirmation: formCredentials.password_confirmation,
      dispatch
    });
    if (response) {
       //if signup is successful , save password & email
      console.log(response);
      saveDataToLocalStorage({
        email: formCredentials.email,
        password: formCredentials.password
      });

      navigation.reset({
        index: 0,
        routes: [{name: navigationNames.FirstLoginNavigator}]
      });

    } else {

      setIsLoading(false);
    }
  };

  const openPrivacyPolicy = () => {
    navigation.navigate(screens.PrivacyPolicyScreen, {reg: true})
    console.log('awdawdawd');
  };
  const openContractInfo = () => navigation.navigate(screens.ContractInformationScreen);

  const togglePrivacy = (check) => {
    setPolicy(!isPolicy);
    const state = {
      ...formCredentials,
      isPolicy: !isPolicy,
      isHandlePersonalData
    }
    setFormErrors({
      ...formErrors,
      isPolicy: !isPolicy? '': 'Ознайомтесь з політикою конфіденційності'
    })
    checkInputs(state)? setActive(true): setActive(false);
  }

  const toggleHandlePersonalData = (check) => {
    setHandlePersonalData(!isHandlePersonalData);
    const state = {
      ...formCredentials,
      isPolicy,
      isHandlePersonalData: !isHandlePersonalData
    }
    setFormErrors({
      ...formErrors,
      isHandlePersonalData: !isHandlePersonalData? '': 'Ознайомтесь з угодою користувача'
    })

    checkInputs(state)? setActive(true): setActive(false);
  }

  return (
    <SignUpScreenWithLoading
      isLoading={isLoading}
      onChangeValue={onChangeValue}
      formCredentials={formCredentials}
      signUpUser={signUpUser}
      formErrors={formErrors}
      navigation={navigation}
      openPrivacyPolicy={openPrivacyPolicy}
      openContractInfo={openContractInfo}
      isPolicy={isPolicy}
      togglePrivacy={togglePrivacy}
      isHandlePersonalData={isHandlePersonalData}
      toggleHandlePersonalData={toggleHandlePersonalData}
      buttonActive={buttonIsActive}
    />
  );
}
