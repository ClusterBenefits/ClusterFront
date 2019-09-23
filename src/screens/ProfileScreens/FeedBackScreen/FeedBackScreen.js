import React, { useState, useContext, useEffect } from "react";
import { BackHandler } from "react-native";
import debounce from "lodash/debounce";

import FeedBackScreenForm from "./FeedBackScreenForm";
import {
  sendMessageToAdmin,
  handleBackButton
} from "../../../actions/userActions";
import { LoadingHOC } from "@components/AllComponents";
import {
  allFieldsValidation,
  singleFieldValidation
} from "../../../utils/validation";
import { UserContext } from "../../../reducers/context";

const FeedBackScreenWithLoading = LoadingHOC(FeedBackScreenForm);

export default function AddCommentsScreen(props) {
  const [formCredentials, setFormCredentials] = useState({
    myComment: "",
    subject: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  const onChangeValue = (name, value) => {
    setFormCredentials({ ...formCredentials, [name]: value });
    debounceSingleFieldValidation({ name, value });
  };

  const debounceSingleFieldValidation = debounce(({ name, value }) => {
    const { isValid, errors } = singleFieldValidation({ key: name, value });
    if (!isValid) {
      setFormErrors({ ...formErrors, [name]: errors[name] });
    } else {
      setFormErrors({ ...formErrors, [name]: null });
    }
  }, 600);

  const goBack = async () => {
    props.navigation.pop();
  };

  // feedback to admin
  const sendMessage = async () => {
    const { isValid, errors } = allFieldsValidation(formCredentials);
    if (!isValid) {
      setFormErrors(errors);
    } else {
      setIsLoading(true);

      await sendMessageToAdmin({
        subject: formCredentials.subject,
        comment: formCredentials.myComment,
        name: state.userInfo.first_name,
        email: state.userInfo.email,
        token: state.token
      });

      setIsLoading(false);
      setFormCredentials({});
    }
  };

  return (
    <FeedBackScreenWithLoading
      isLoading={isLoading}
      goBack={goBack}
      onChangeValue={onChangeValue}
      sendMessage={sendMessage}
      formCredentials={formCredentials}
      formErrors={formErrors}
    />
  );
}
