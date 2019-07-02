import React, { useState, useEffect, useContext } from "react";
import AddCreditInfoScreenForm from "./AddCreditInfoScreenForm";
import { LoadingHOC, ShowToast } from "@components/AllComponents";
import { allFieldsValidation } from "../../../utils/validation";
import { UserContext } from "../../../reducers/context";

const AddCreditInfoScreenWithLoading = LoadingHOC(AddCreditInfoScreenForm);

export default function AddCreditInfoScreen(props) {
  const [formCredentials, setFormCredentials] = useState({
    creditCardNumber: "",
    expiration: "",
    cvv2: "",
    checkBox: false
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(UserContext);

  const onChangeValue = (value, name) => {
    if (name === "checkBox") {
      setFormCredentials({
        ...formCredentials,
        [name]: !formCredentials.checkBox
      });
    } else {
      setFormCredentials({ ...formCredentials, [name]: value });
    }
  };

  // post user info

  const post = async () => {
    const { isValid, errors } = allFieldsValidation({
      ...formCredentials,
      creditCardNumber: formCredentials.creditCardNumber.replace(/\D/g, "")
    });

    if (!isValid) {
      setFormErrors(errors);
    } else {
      setIsLoading(true);
      // await postCreditInfo();
      setIsLoading(false);
      setFormCredentials({ creditCardNumber: "", expiration: "", cvv2: "" });
      props.navigation.navigate("ProfileBottomTabNavigatior");
    }
  };

  return (
    <AddCreditInfoScreenWithLoading
      isLoading={isLoading}
      post={post}
      onChangeValue={onChangeValue}
      formCredentials={formCredentials}
      formErrors={formErrors}
    />
  );
}
