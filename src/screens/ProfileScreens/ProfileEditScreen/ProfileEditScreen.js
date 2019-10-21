import React, { useState, useContext } from "react";

import ProfileEditScreenForm from "./ProfileEditScreenForm";
import { postUserInfo } from "../../../actions/userActions";
import { allFieldsValidation } from "./../../../utils/validation";
import { UserContext } from "./../../../reducers/context";
import { LoadingHOC, ShowToast } from "../../../components";
import { useBackButton } from "../../../hooks";

const ProfileEditScreenWithLoading = LoadingHOC(ProfileEditScreenForm);

const initialState = { firstName: "", lastName: "", organization: "", position: "" };

export default function ProfileEditScreen({ navigation }) {
  const [formCredentials, setFormCredentials] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(UserContext);

  useBackButton(false);

  const onChangeValue = (name, value) => {
    setFormCredentials({ ...formCredentials, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const editUserProfile = async () => {
    const { errors } = allFieldsValidation(formCredentials, {
      min: "Кількість символів в полі повинна бути не менше 3"
    });
    if (errors) {
      setFormErrors(errors);
      return;
    }
    setIsLoading(true);

    let data = {
      first_name: formCredentials.firstName,
      last_name: formCredentials.lastName,
      company: formCredentials.organization
    };
    // cant send an empty string as value for position //
    formCredentials.position.length > 0 && (data.position = formCredentials.position);

    // trying to change user info

    let response = await postUserInfo({
      token: state.token,
      data,
      dispatch
    });

    if (response) {
      ShowToast("Ваш профайл оновлено успішно!");

      setFormCredentials(initialState);
    }
    setIsLoading(false);
  };

  return (
    <ProfileEditScreenWithLoading
      isLoading={isLoading}
      editUserProfile={editUserProfile}
      onChangeValue={onChangeValue}
      formCredentials={formCredentials}
      navigation={navigation}
      formErrors={formErrors}
    />
  );
}
