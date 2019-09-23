import React, { useState } from "react";

import SignUpConfirmScreenForm from "./SignUpConfirmScreenForm";
import { confirmUserCodeFromEmail } from "../../../actions/userActions";
import { LoadingHOC } from "@components/AllComponents";

const SignUpConfrimScreenWithLoading = LoadingHOC(SignUpConfirmScreenForm);

export default function SignUpConfirmScreen(props) {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const email = props.navigation.getParam("email", "Peter");

  const goNewPassword = async value => {
    console.log(verificationCode);
    // setIsLoading(true);

    // let response = await confirmUserCodeFromEmail({ email, value });
    // console.log(value);
    // // if code fron email is right , finish reseting password
    // if (response) {
    //   props.navigation.navigate("NewPasswordScreen", {
    //     token: response,
    //     email: email
    //   });
    // } else {
    //   setIsLoading(false);
    // }
  };

  return (
    <SignUpConfrimScreenWithLoading
      isLoading={isLoading}
      goNewPassword={goNewPassword}
      verificationCode={verificationCode}
      setVerificationCode={setVerificationCode}
    />
  );
}
