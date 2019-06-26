import React, { useState, useContext, useEffect } from "react";
import FeedBackScreenForm from "./FeedBackScreenForm";
import T from "prop-types";
import {
  sendMessageToAdmin,
  sendComment,
  getComments
} from "../../../actions/userActions";
import { LoadingHOC } from "@components/AllComponents";
import {
  allFieldsValidation,
  singleFieldValidation
} from "../../../utils/validation";
import debounce from "lodash/debounce";
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

  // getting item that needs to be rendered from navigation

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

AddCommentsScreen.propTypes = {
  fromWho: T.string,
  userInfo: T.object
};
