import React, { useState, useContext } from "react";
import debounce from "lodash/debounce";

import AddCommentsScreenForm from "./AddCommentsScreenForm";
import { sendComment, getComments } from "../../../actions/userActions";

import { allFieldsValidation, singleFieldValidation } from "./../../../utils/validation";
import { UserContext } from "./../../../reducers/context";
import { LoadingHOC } from "../../../components";

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

  // send comment from user

  const addComment = async () => {
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

      // getting list of new comments back

      getComments({ id: item.id, token: state.token, dispatch });
      setIsLoading(false);
      setFormCredentials({});
    }
  };

  // getting item for comments from navigation

  const item = props.navigation.getParam("item", "NO-ID");

  return (
    <AddCommentsScreenWithLoading
      isLoading={isLoading}
      goBack={goBack}
      onChangeValue={onChangeValue}
      addComment={addComment}
      formCredentials={formCredentials}
      formErrors={formErrors}
    />
  );
}
