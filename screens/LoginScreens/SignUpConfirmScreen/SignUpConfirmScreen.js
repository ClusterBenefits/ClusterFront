import React, { useState, useEffect, useRef } from "react";

import SignUpConfirmScreenForm from "./SignUpConfirmScreenForm";
import { confirmUserCodeFromEmail } from "../../../actions/userActions";
import { allFieldsValidation } from "./../../../utils/validation";
import { LoadingHOC } from "@components/AllComponents";

const SignUpConfrimScreenWithLoading = LoadingHOC(SignUpConfirmScreenForm);

export default function SignUpConfirmScreen(props) {
  const [formCredentials, setFormCredentials] = useState({
    email1: "",
    email2: "",
    email3: "",
    email4: "",
    email5: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isEditing, setEditing] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef();
  useEffect(() => {
    // if (isEditing) {
    //   inputRef.focus();
    // }
  }, [isEditing]);

  const onChangeValue = (name, value) => {
    setFormCredentials({ ...formCredentials, [name]: value });
    if (name === "email1") {
      inputRef.current.focus();
    }
  };

  const goNewPassword = async () => {
    const { isValid, errors } = allFieldsValidation(formCredentials);

    if (!isValid) {
      setFormErrors(errors);
    } else {
      setIsLoading(true);
      const email = props.navigation.getParam("email", "Peter");
      const code =
        formCredentials.email1 +
        formCredentials.email2 +
        formCredentials.email3 +
        formCredentials.email4 +
        formCredentials.email5;

      let response = await confirmUserCodeFromEmail({ email, code });
      // if code fron email is right , finish reseting password
      if (response) {
        props.navigation.navigate("NewPasswordScreen", {
          token: response,
          email: email
        });
      } else {
        setIsLoading(false);
      }
    }
  };

  return (
    <SignUpConfrimScreenWithLoading
      isLoading={isLoading}
      onChangeValue={onChangeValue}
      goNewPassword={goNewPassword}
      formCredentials={formCredentials}
      formErrors={formErrors}
      inputRef={inputRef}
    />
  );
}
