import React, { useState, useContext, useEffect } from "react";
import AddCreditInfoScreenForm from "./AddCreditInfoScreenForm";
import { UserContext } from "../../../reducers/context";
import { getInfoForSubscription } from "../../../actions/userActions";
import { LoadingHOC } from "../../../components";

const AddCreditInfoScreenWithLoading = LoadingHOC(AddCreditInfoScreenForm);

export default function AddCreditInfoScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [subscription, setInfoSubscription] = useState({ data: null, signature: null });
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    initData();
    // Linking.addEventListener("message", event => console.log("message", event));
  }, []);

  const initData = async () => {
    setIsLoading(true);
    try {
      let response = await getInfoForSubscription({
        dispatch,
        token: state.token
      });
      setInfoSubscription({
        data: response.data,
        signature: response.signature
      });
      setIsLoading(false);
    } catch (e) {
      console.log("front", e);
    }
  };

  // const post = async () => {
  //   const { errors } = allFieldsValidation(
  //     { ...formCredentials, credit_card_number: formCredentials.credit_card_number.replace(/\D/g, "") },
  //     { min: "Кількість символів в полі повинна бути не менше 3" }
  //   );
  //   if (errors) {
  //     setFormErrors(errors);
  //     return;
  //   }
  //   setIsLoading(true);
  //   let response = await addCreditCardSubscription({
  //     token: state.token,
  //     dispatch,
  //     data: {
  //       credit_card_number: formCredentials.credit_card_number,
  //       expiration: formCredentials.expiration,
  //       cvv2: formCredentials.cvv2,
  //       city: formCredentials.city,
  //       address: formCredentials.address,
  //       postal_code: formCredentials.postal_code
  //     }
  //   });
  //   setIsLoading(false);
  //   console.log(response);
  //   if (!response) {
  //     return;
  //   }
  //   // If liqpay wants other validation like web/phone
  //   if (response.code === "wait_3ds") {
  //     let response1 = await AsyncAlert(response);
  //     if (response1 === "No") {
  //       dispatch({
  //         type: dispatchTypes.SUBSCRIPTION,
  //         payload: response
  //       });
  //       navigation.pop();
  //     } else {
  //       navigation.pop();
  //     }
  //     return;
  //   }
  //   if (response.code === "phone_verify") {
  //     console.log("phone_verify");
  //     return;
  //   }
  //   if (response) {
  //     navigation.pop();
  //   }
  // };

  // creditCard validation with web redirection
  // const AsyncAlert = async response => {
  //   console.log(response);
  //   return new Promise(resolve => {
  //     Alert.alert(
  //       "Verify",
  //       "To verify payment , press OK and you will be redirected to browser ",
  //       [
  //         {
  //           text: "Cancel",
  //           onPress: () => {
  //             console.log("Cancel Pressed");
  //             resolve("No");
  //           },
  //           style: "cancel"
  //         },
  //         {
  //           text: "OK",
  //           onPress: () => {
  //             Linking.canOpenURL(response.verify_link).then(supported => {
  //               if (supported) {
  //                 Linking.openURL(response.verify_link);
  //               } else {
  //                 console.log("Don't know how to open URI: " + response.verify_link);
  //               }
  //             });
  //             resolve("Yes");
  //           }
  //         }
  //       ],
  //       { cancelable: false }
  //     );
  //   });
  // };

  function handleNavigation(event) {
    if (event.url === "http://7h-sm9.anonymous.cluster.exp.direct/") {
      console.log("we are here");
      // navigation.navigate(screens.ListingScreen);
    }
  }

  function handleMessage(event) {
    let data = event.nativeEvent.data;
    data = JSON.parse(data);
    if (data.status === "success") {
      alert(data.reference);
    } else {
      alert("Failed, " + data.message);
    }
  }

  return (
    <AddCreditInfoScreenWithLoading
      handleNavigation={handleNavigation}
      handleMessage={handleMessage}
      subscription={subscription}
      isLoading={isLoading}
      navigation={navigation}
    />
  );
}
