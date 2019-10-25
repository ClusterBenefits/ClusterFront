import React, { useState, useContext } from "react";

import { UserContext } from "./../../../reducers/context";
import ProfileFillingScreenForm from "./ProfileFillingScreenForm";
import { postUserInfo } from "../../../actions/userActions";
import { allFieldsValidation } from "../../../utils";
import { screens } from "../../../constants";
import { LoadingHOC } from "../../../components";

const ProfileFillingScreenWithLoading = LoadingHOC(ProfileFillingScreenForm);

export default function ProfileFillingScreen({ navigation }) {
  const [formCredentials, setFormCredentials] = useState({
    firstName: "",
    lastName: "",
    organization: "",
    position: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(UserContext);

  const onChangeValue = (name, value) => {
    setFormCredentials({ ...formCredentials, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  // filling profile information ( name last_name etc )

  const onSubmit = async () => {
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
    formCredentials.position.length > 0 && (data.position = formCredentials.position);

    let response = await postUserInfo({ token: state.token, data, dispatch });
    response ? navigation.navigate(screens.ListingScreen) : setIsLoading(false);
  };

  return (
    <ProfileFillingScreenWithLoading
      isLoading={isLoading}
      onChangeValue={onChangeValue}
      onSubmit={onSubmit}
      formCredentials={formCredentials}
      formErrors={formErrors}
      navigation={navigation}
    />
  );
}
