import React, { useState, useEffect, useContext } from "react";
import { BackHandler } from "react-native";

import ProfileEditScreenForm from "./ProfileEditScreenForm";
import { postUserInfo, handleBackButton } from "../../../actions/userActions";
import { allFieldsValidation } from "./../../../utils/validation";
import { UserContext } from "./../../../reducers/context";
import { LoadingHOC, ShowToast } from "../../../components";

const ProfileEditScreenWithLoading = LoadingHOC(ProfileEditScreenForm);

export default function ProfileEditScreen({ navigation }) {
  const [formCredentials, setFormCredentials] = useState({
    firstName: "",
    lastName: "",
    organization: "",
    position: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  const onChangeValue = (name, value) => {
    setFormCredentials({ ...formCredentials, [name]: value });
  };

  // check if input field is correct after typing
  const { isValid } = allFieldsValidation(formCredentials);

  const goProfileScreen = () => {
    navigation.navigate("ProfileScreen");
  };

  // edit profile user info
  const editUserProfile = async () => {
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

      setFormCredentials({
        firstName: "",
        lastName: "",
        organization: "",
        position: ""
      });
    }
    setIsLoading(false);
  };

  return (
    <ProfileEditScreenWithLoading
      isLoading={isLoading}
      goProfileScreen={goProfileScreen}
      editUserProfile={editUserProfile}
      onChangeValue={onChangeValue}
      formCredentials={formCredentials}
      navigation={navigation}
      isValid={isValid}
      userInfo={state.userInfo}
    />
  );
}
