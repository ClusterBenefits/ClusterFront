import React, { useState, useContext } from "react";
import { Alert, Linking } from "react-native";

import AddCreditInfoScreenForm from "./AddCreditInfoScreenForm";
import { allFieldsValidation } from "../../../utils/validation";
import { UserContext } from "../../../reducers/context";
import { addCreditCardSubscription } from "../../../actions/userActions";
import formatStringByConfig from "../../../utils/formatStringByConfig";
import { LoadingHOC } from "../../../components";

const AddCreditInfoScreenWithLoading = LoadingHOC(AddCreditInfoScreenForm);

export default function AddCreditInfoScreen({ navigation }) {
  const [formCredentials, setFormCredentials] = useState({
    credit_card_number: "",
    expiration: "",
    cvv2: "",
    city: "dfsdf",
    address: "dfgddd",
    postal_code: "123123",
    checkBox: false
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(UserContext);

  const formatNumberCard = formatStringByConfig({ 4: "-", 8: "-", 12: "-" });
  const formatMonthAndYear = formatStringByConfig({ 2: "/" });

  const onChangeValue = (name, value) => {
    if (name === "checkBox") {
      setFormCredentials({ ...formCredentials, [name]: !formCredentials.checkBox });
    } else if (name === "expiration") {
      // add slash to month/year
      const formatedNumberCard = formatMonthAndYear(value);
      setFormCredentials({ ...formCredentials, [name]: formatedNumberCard });
    } else if (name === "credit_card_number") {
      // add dash to creditCard number
      const formatedNumberCard = formatNumberCard(value);
      setFormCredentials({ ...formCredentials, [name]: formatedNumberCard });
    } else {
      setFormCredentials({ ...formCredentials, [name]: value });
    }
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const post = async () => {
    const { errors } = allFieldsValidation(
      { ...formCredentials, credit_card_number: formCredentials.credit_card_number.replace(/\D/g, "") },
      { min: "Кількість символів в полі повинна бути не менше 3" }
    );
    if (errors) {
      setFormErrors(errors);
      return;
    }
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
    setIsLoading(false);
    if (!response) {
      return;
    }
    // If liqpay wants other validation like web/phone
    if (response.code === "wait_3ds") {
      let response1 = await AsyncAlert(response);
      response1 === "No" ? console.log("no redirection") : console.log("doing redirection");
      return;
    }
    if (response.code === "phone_verify") {
      console.log("phone_verify");
      return;
    }
    if (response) {
      navigation.pop();
    }
  };

  // creditCard validation with web redirection
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
                  console.log("Don't know how to open URI: " + response.verify_link);
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
      navigation={navigation}
      formErrors={formErrors}
    />
  );
}
