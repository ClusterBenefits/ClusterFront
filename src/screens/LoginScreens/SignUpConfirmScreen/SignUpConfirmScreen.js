import React, { useState } from "react";

import SignUpConfirmScreenForm from "./SignUpConfirmScreenForm";
import {
  confirmUserCodeFromEmail,
  resetUserPassword
} from "../../../actions/userActions";
import { LoadingHOC } from "@components/AllComponents";
import { screens } from "../../../constants";

const SignUpConfrimScreenWithLoading = LoadingHOC(SignUpConfirmScreenForm);

export default function SignUpConfirmScreen({ navigation }) {
  const [code, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const email = navigation.getParam("email", "");

  // Resend varificationCode with resend && ShowToast('text')
  const resendVarificationCode = () =>
    resetUserPassword({ email, resend: true });

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
    <SignUpConfrimScreenWithLoading
      isLoading={isLoading}
      goNewPassword={goNewPassword}
      code={code}
      setVerificationCode={setVerificationCode}
      navigation={navigation}
      resendVarificationCode={resendVarificationCode}
    />
  );
}
