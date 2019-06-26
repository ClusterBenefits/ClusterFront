import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./../../../reducers/context";
import ProfileFillingScreenForm from "./ProfileFillingScreenForm";
import {
  postUserInfo,
  registerForPushNotificationsAsync
} from "../../../actions/userActions";
import T from "prop-types";
import debounce from "lodash/debounce";
import {
  singleFieldValidation,
  allFieldsValidation
} from "./../../../utils/validation";
import { LoadingHOC } from "@components/AllComponents";

const ProfileFillingScreenWithLoading = LoadingHOC(ProfileFillingScreenForm);

export default function ProfileFillingScreen(props) {
  const [formCredentials, setFormCredentials] = useState({
    firstName: "",
    lastName: "",
    organization: "",
    position: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(UserContext);
  // trying to get user token for pushnotification

  useEffect(() => {
    registerForPushNotificationsAsync(state.token);
  });
  const onChangeValue = (name, value) => {
    setFormCredentials({ ...formCredentials, [name]: value });
    debounceSingleFieldValidation({ name, value });
  };

  // check if input field is correct after typing

  const debounceSingleFieldValidation = debounce(({ name, value }) => {
    const { isValid, errors } = singleFieldValidation({ key: name, value });
    if (!isValid) {
      setFormErrors({ ...formErrors, [name]: errors[name] });
    } else {
      setFormErrors({ ...formErrors, [name]: null });
    }
  }, 600);

  // filling profile information ( name last_name etc )

  const post = async () => {
    const { isValid, errors } = allFieldsValidation(formCredentials);

    if (!isValid) {
      setFormErrors(errors);
    } else {
      setIsLoading(true);
      let data = {
        first_name: formCredentials.firstName,
        last_name: formCredentials.lastName,
        company: formCredentials.organization,
        position: formCredentials.position
      };
      let response = await postUserInfo({ token: state.token, data, dispatch });
      if (response) {
        props.navigation.navigate("ProfileBottomTabNavigatior");
      } else {
        setIsLoading(false);
      }
    }
  };

  return (
    <ProfileFillingScreenWithLoading
      isLoading={isLoading}
      onChangeValue={onChangeValue}
      post={post}
      formCredentials={formCredentials}
      formErrors={formErrors}
    />
  );
}

ProfileFillingScreen.propTypes = {
  token: T.string,
  userInfo: T.object
};
