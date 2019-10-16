import React, { useState, useContext, useEffect } from "react";
import { BackHandler } from "react-native";

import FeedBackScreenForm from "./FeedBackScreenForm";
import { sendMessageToAdmin, handleBackButton } from "../../../actions/userActions";
import { UserContext } from "../../../reducers/context";
import { LoadingHOC } from "../../../components";

const FeedBackScreenWithLoading = LoadingHOC(FeedBackScreenForm);

const initialState = { comment: "", subject: "" };

export default function AddCommentsScreen({ navigation }) {
  const [formCredentials, setFormCredentials] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useContext(UserContext);
  const isValid = formCredentials.comment.length > 6 && formCredentials.subject.length > 3;

  useEffect(() => {
    BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  const onChangeValue = (name, value) => {
    setFormCredentials({ ...formCredentials, [name]: value });
  };

  // feedback to admin
  const sendMessage = async () => {
    setIsLoading(true);

    let response = await sendMessageToAdmin({
      subject: formCredentials.subject,
      comment: formCredentials.comment,
      name: state.userInfo.first_name,
      email: state.userInfo.email,
      token: state.token
    });
    response && setFormCredentials(initialState);
    setIsLoading(false);
  };

  return (
    <FeedBackScreenWithLoading
      isLoading={isLoading}
      onChangeValue={onChangeValue}
      sendMessage={sendMessage}
      formCredentials={formCredentials}
      isValid={isValid}
      navigation={navigation}
    />
  );
}
