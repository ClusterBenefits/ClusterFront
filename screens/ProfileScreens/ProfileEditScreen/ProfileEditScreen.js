import React, { useState, useEffect, useContext } from "react";
import ProfileEditScreenForm from "./ProfileEditScreenForm";
import { AsyncStorage, BackHandler } from "react-native";
import {
  postUserInfo,
  handleBackButton,
  clearUserLocal
} from "../../../actions/userActions";
import { LoadingHOC, ShowToast } from "@components/AllComponents";
import debounce from "lodash/debounce";
import {
  singleFieldValidation,
  allFieldsValidation
} from "./../../../utils/validation";
import { UserContext } from "./../../../reducers/context";

const ProfileEditScreenWithLoading = LoadingHOC(ProfileEditScreenForm);

export default function ProfileEditScreen(props) {
  const [formCredentials, setFormCredentials] = useState({
    firstName: "",
    lastName: "",
    organization: "",
    position: ""
  });
  const [formErrors, setFormErrors] = useState({});
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

  const goProfileScreen = () => {
    props.navigation.navigate("ProfileScreen");
  };

  // post user info

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

      // trying to change user info

      let response = await postUserInfo({
        token: state.token,
        data,
        dispatch
      });
      if (response) {
        ShowToast("Your information has been updated successfully!");
      }
      setFormCredentials({
        firstName: "",
        lastName: "",
        organization: "",
        position: ""
      });
      setIsLoading(false);
    }
  };
  // full signout user
  const signOutUser = async () => {
    AsyncStorage.clear().catch(e => console.log(e));
    clearUserLocal({ dispatch });
    props.navigation.navigate("IntroScreen");
  };

  return (
    <ProfileEditScreenWithLoading
      isLoading={isLoading}
      goProfileScreen={goProfileScreen}
      post={post}
      signOutUser={signOutUser}
      onChangeValue={onChangeValue}
      formCredentials={formCredentials}
      formErrors={formErrors}
    />
  );
}
