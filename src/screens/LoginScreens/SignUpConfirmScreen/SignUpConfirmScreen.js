import React, { useState } from "react";

import SignUpConfirmScreenForm from "./SignUpConfirmScreenForm";
import { confirmUserCodeFromEmail, resetUserPassword } from "../../../actions/userActions";
import { screens } from "../../../constants";
import { LoadingHOC } from "../../../components";

const SignUpConfirmScreenWithLoading = LoadingHOC(SignUpConfirmScreenForm);

export default function SignUpConfirmScreen({ navigation }) {
  const [code, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const email = navigation.getParam("email", "");

  // Resend varificationCode with resend && ShowToast('text')
  const resendVerificationCode = () => resetUserPassword({ email, resend: true });

  const goNewPassword = async () => {
    setIsLoading(true);

    let response = await confirmUserCodeFromEmail({ email, code });
    // Check if code is right
    if (response) {
      navigation.navigate(screens.NewPasswordScreen, {
        token: response,
        email: email
      });
    } else {
      setIsLoading(false);
    }
  };

  return (
    <SignUpConfirmScreenWithLoading
      isLoading={isLoading}
      goNewPassword={goNewPassword}
      code={code}
      setVerificationCode={setVerificationCode}
      navigation={navigation}
      resendVerificationCode={resendVerificationCode}
    />
  );
}
