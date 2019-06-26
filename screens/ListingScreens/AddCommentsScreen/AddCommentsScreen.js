import React, { useState, useContext } from "react";
import AddCommentsScreenForm from "./AddCommentsScreenForm";
import T from "prop-types";
import { sendComment, getComments } from "../../../actions/userActions";
import { LoadingHOC } from "@components/AllComponents";
import {
  allFieldsValidation,
  singleFieldValidation
} from "./../../../utils/validation";
import debounce from "lodash/debounce";
import { UserContext } from "./../../../reducers/context";

const AddCommentsScreenWithLoading = LoadingHOC(AddCommentsScreenForm);

export default function AddCommentsScreen(props) {
  const [formCredentials, setFormCredentials] = useState({
    myComment: ""
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

      await sendComment({
        message: formCredentials.myComment,
        token: state.token,
        id: item.id
      });
      // dispatch({
      //   type: ADD_COMMENTS,
      //   payload: [response, ...state.comments.data]
      // });
      getComments({ id: item.id, token: state.token, dispatch });
      setIsLoading(false);
      setFormCredentials({});
    }
  };

  // getting item that needs to be rendered from navigation

  const item = props.navigation.getParam("item", "NO-ID");
  const fromWho = props.navigation.getParam("fromWho", "NO-ID");

  return (
    <AddCommentsScreenWithLoading
      isLoading={isLoading}
      goBack={goBack}
      onChangeValue={onChangeValue}
      sendMessage={sendMessage}
      fromWho={fromWho}
      formCredentials={formCredentials}
      formErrors={formErrors}
    />
  );
}

AddCommentsScreen.propTypes = {
  fromWho: T.string,
  userInfo: T.object
};
