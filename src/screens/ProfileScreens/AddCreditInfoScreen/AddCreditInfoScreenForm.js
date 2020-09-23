import React from "react";
import { StyleSheet, View } from "react-native";
import T from "prop-types";
import WebView from "react-native-webview";

const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  }
});

export default function AddCreditInfoScreenForm({
  handleMessage,
  handleNavigation,
  navigation,
  subscription
}) {
  return (
    <View style={s.container}>
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
          navigation.pop();
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

AddCreditInfoScreenForm.propTypes = {
  handleMessage: T.func.isRequired,
  handleNavigation: T.func.isRequired,
  subscription: T.object.isRequired,
  navigation: T.object.isRequired,
  subscription: T.object.isRequired
};
