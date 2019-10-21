import React, { useState, useContext } from "react";

import FeedBackScreenForm from "./FeedBackScreenForm";
import { sendMessageToAdmin } from "../../../actions/userActions";
import { UserContext } from "../../../reducers/context";
import { LoadingHOC } from "../../../components";
import { allFieldsValidation } from "../../../utils";
import { useBackButton } from "../../../hooks";

const FeedBackScreenWithLoading = LoadingHOC(FeedBackScreenForm);

const initialState = { subject: "", comment: "" };

export default function AddCommentsScreen({ navigation }) {
  const [formCredentials, setFormCredentials] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useContext(UserContext);

  useBackButton(false);

  const onChangeValue = (name, value) => {
    setFormCredentials({ ...formCredentials, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  // feedback to admin
  const sendMessage = async () => {
    const { errors } = allFieldsValidation(formCredentials, {
      same: "Пароль не співпадає",
      min: "Кількість символів в полі повинна бути не менше 5"
    });
    if (errors) {
      setFormErrors(errors);
      return;
    }
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
      formErrors={formErrors}
      navigation={navigation}
    />
  );
}
