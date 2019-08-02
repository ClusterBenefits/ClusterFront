import React, { useState, useContext } from "react";
import { Alert, Linking } from "react-native";

import AddCreditInfoScreenForm from "./AddCreditInfoScreenForm";
import { LoadingHOC } from "@components/AllComponents";
import { allFieldsValidation } from "../../../utils/validation";
import { UserContext } from "../../../reducers/context";
import { addCreditCardSubscription } from "../../../actions/userActions";

const AddCreditInfoScreenWithLoading = LoadingHOC(AddCreditInfoScreenForm);

export default function AddCreditInfoScreen(props) {
  const [formCredentials, setFormCredentials] = useState({
    credit_card_number: "",
    expiration: "",
    cvv2: "",
    city: "",
    address: "",
    postal_code: "",
    checkBox: false
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(UserContext);

  const onChangeValue = (name, value) => {
    if (name === "checkBox") {
      setFormCredentials({
        ...formCredentials,
        [name]: !formCredentials.checkBox
      });
    } else {
      setFormCredentials({ ...formCredentials, [name]: value });
    }
  };

  // check where the user has come from(first time registration or billinginformation)
  const fromWho = props.navigation.getParam("name", "Registration");

  const skip = () => {
    if (fromWho === "Registration") {
      props.navigation.navigate("ProfileBottomTabNavigatior");
    } else {
      props.navigation.navigate("BillingInformationScreen");
    }
  };
  const post = async () => {
    const { isValid, errors } = allFieldsValidation({
      ...formCredentials,
      credit_card_number: formCredentials.credit_card_number.replace(/\D/g, "")
    });

    if (!isValid) {
      setFormErrors(errors);
    } else {
      setIsLoading(true);
      let response = await addCreditCardSubscription({
        token: state.token,
        dispatch,
        data: {
          credit_card_number: formCredentials.credit_card_number,
          expiration: formCredentials.expiration,
          cvv2: formCredentials.cvv2,
          city: formCredentials.city,
          address: formCredentials.address,
          postal_code: formCredentials.postal_code
        }
      });
      if (!response) {
        setIsLoading(false);
        return;
      }
      if (response.code === "wait_3ds") {
        let response1 = await AsyncAlert(response);
        if (response1 === "No") {
          console.log("nothing will happen");
        } else {
          console.log("doing");
        }
      }
      if (response.code === "phone_verify") {
        console.log("phone_verify");
        return;
      }
      if (response && fromWho === "Registration") {
        // after registration user has made a subscription
        setFormCredentials({ creditCardNumber: "", expiration: "", cvv2: "" });
        props.navigation.navigate("ProfileBottomTabNavigatior");
      } else if (response && fromWho !== "Registration") {
        // after billinginformation has user made a subscription
        setFormCredentials({ bcreditCardNumber: "", expiration: "", cvv2: "" });
        props.navigation.navigate("BillingInformationScreen");
      } else {
        // somthing was wrong with creditCard
        setIsLoading(false);
      }
    }
  };
  const AsyncAlert = async response =>
    new Promise(resolve => {
      Alert.alert(
        "Verify",
        "To verify payment , press OK and you will be redirected to browser ",
        [
          {
            text: "Cancel",
            onPress: () => {
              console.log("Cancel Pressed");
              resolve("No");
            },
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => {
              Linking.canOpenURL(response.verify_link).then(supported => {
                if (supported) {
                  Linking.openURL(response.verify_link);
                } else {
                  console.log(
                    "Don't know how to open URI: " + response.verify_link
                  );
                }
              });
              resolve("Yes");
            }
          }
        ],
        { cancelable: false }
      );
    });

  return (
    <AddCreditInfoScreenWithLoading
      isLoading={isLoading}
      post={post}
      onChangeValue={onChangeValue}
      formCredentials={formCredentials}
      formErrors={formErrors}
      skip={skip}
      fromWho={fromWho}
    />
  );
}
