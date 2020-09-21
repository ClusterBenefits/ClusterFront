import React, { useState, useContext, useEffect } from "react";
import { View, Text, Linking } from "react-native";

// import AddCreditInfoScreenForm from "./AddCreditInfoScreenForm";
// import { allFieldsValidation } from "../../../utils/validation";
import { UserContext } from "../../../reducers/context";
import { getInfoForSubscription } from "../../../actions/userActions";
// import formatStringByConfig from "../../../utils/formatStringByConfig";
// import { LoadingHOC } from "../../../components";
import { WebView } from "react-native-webview";
import { screens } from "../../../constants";

export default function AddCreditInfoScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [subscription, setInfoSubscription] = useState({ data: null, signature: null });
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    initData();
    Linking.addEventListener("message", event => console.log("message", event));
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
    console.log("event", event);
    if (event.url === "http://7h-sm9.anonymous.cluster.exp.direct/") {
      console.log("we are here");
      // navigation.navigate(screens.ListingScreen);
    }
  }

  function handleMessage(event) {
    let data = event.nativeEvent.data;
    data = JSON.parse(data);
    if (data.status == "success") {
      alert(data.reference);
    } else {
      alert("Failed, " + data.message);
    }
  }

  if (isLoading) return <Text>Loading...</Text>;

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}>
      <WebView
        originWhitelist={["*"]}
        mixedContentMode={"always"}
        source={{
          html: `
          <html lang="">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Liqpay</title>
          </head>
          <body style="display: flex; justify-content: center; align-items: center">
            <form method="POST" accept-charset="utf-8" action="https://www.liqpay.ua/api/3/checkout">
            <input type="hidden" name="data" value="${subscription.data}" />
            <input type="hidden" name="signature" value="${subscription.signature}" />
            <button style="border: none !important; display:inline-block !important;text-align: center !important;padding: 15px 35px !important;
              color: #fff !important; font-size:20px !important; font-weight: 600 !important; font-family:OpenSans, sans-serif; cursor: pointer !important; border-radius: 2px !important;
              background: rgba(122,183,43,1) !important;"onmouseover="this.style.opacity='0.5';" onmouseout="this.style.opacity='1';">
              <img src="https://static.liqpay.ua/buttons/logo-small.png" name="btn_text"
                style="margin-right: 7px !important; vertical-align: middle !important;"/>
              <span style="vertical-align:middle; !important">Сплатити 200 UAH</span>
            </button>
            </form>
          </body>
          </html>
        `
        }}
        onError={e => {
          console.log("Error Occured", e);
          // navigation.pop();
        }}
        onMessage={event => handleMessage(event)}
        onNavigationStateChange={event => handleNavigation(event)}
        javaScriptEnabled={true}
        allowUniversalAccessFromFileURLs={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </View>
  );
}
