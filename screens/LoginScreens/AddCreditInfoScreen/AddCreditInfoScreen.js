import React, { useState, useContext } from "react";
import AddCreditInfoScreenForm from "./AddCreditInfoScreenForm";
import { LoadingHOC } from "@components/AllComponents";
import { allFieldsValidation } from "../../../utils/validation";
import { UserContext } from "../../../reducers/context";
import { addCreditCardSubscription } from "../../../actions/userActions";

const AddCreditInfoScreenWithLoading = LoadingHOC(AddCreditInfoScreenForm);

export default function AddCreditInfoScreen(props) {
  const [formCredentials, setFormCredentials] = useState({
    creditCardNumber: "",
    expiration: "",
    cvv2: "",
    checkBox: false
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(UserContext);

  const onChangeValue = (value, name) => {
    if (name === "checkBox") {
      setFormCredentials({
        ...formCredentials,
        [name]: !formCredentials.checkBox
      });
    } else {
      setFormCredentials({ ...formCredentials, [name]: value });
    }
  };

  // check where the user has come from(registration or billinginformation)
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
      creditCardNumber: formCredentials.creditCardNumber.replace(/\D/g, "")
    });

    if (!isValid) {
      setFormErrors(errors);
    } else {
      setIsLoading(true);
      let response = await addCreditCardSubscription({
        token: state.token,
        dispatch,
        data: {
          creditCardNumber: formCredentials.creditCardNumber,
          expiration: formCredentials.expiration,
          cvv2: formCredentials.cvv2
        }
      });
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
