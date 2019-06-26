import React, { useState, useEffect, useContext } from "react";
import BillingInformationScreenForm from "./BillingInformationScreenForm";
import { AsyncStorage, BackHandler } from "react-native";
import { handleBackButton } from "../../../actions/userActions";
import { LoadingHOC, ShowToast } from "@components/AllComponents";
import { allFieldsValidation } from "../../../utils/validation";
import { UserContext } from "../../../reducers/context";

const BillingInformationScreenWithLoading = LoadingHOC(
  BillingInformationScreenForm
);

export default function ProfileEditScreen(props) {
  const [formCredentials, setFormCredentials] = useState({
    creditCardNumber: "",
    expiration: "",
    cvv2: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(UserContext);

  const onChangeValue = (value, name) => {
    setFormCredentials({ ...formCredentials, [name]: value });
  };

  const goProfileScreen = () => {
    props.navigation.navigate("ProfileScreen");
  };

  // post user info

  const post = async () => {
    const { isValid, errors } = allFieldsValidation(formCredentials);
    if (!isValid) {
      setFormErrors(errors);
      console.log(errors);
    } else {
      setIsLoading(true);
      // await postCreditInfo();
      setIsLoading(false);
      setFormCredentials({ creditCardNumber: "", expiration: "", cvv2: "" });
    }
  };

  return (
    <BillingInformationScreenWithLoading
      isLoading={isLoading}
      goProfileScreen={goProfileScreen}
      post={post}
      onChangeValue={onChangeValue}
      formCredentials={formCredentials}
      formErrors={formErrors}
    />
  );
}
