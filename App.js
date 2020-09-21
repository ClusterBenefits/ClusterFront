import React, { useEffect } from "react";
import AppNavigation from "./src/navigation/AppNavigation";
import { StyleProvider, Root } from "native-base";
import { Linking as LinkingExpo } from "expo";
import Constants from "expo-constants";
import { Linking } from "react-native";

import getTheme from "./src/native-base-theme/components";
import platform from "./src/native-base-theme/variables/platform";
import { MyProvider } from "./src/reducers/context";
import { MainModalComponent } from "./src/services/mainModal";
import { StatusBar } from "./src/components";

const StyleProviderTheme = ({ children }) => (
  <StyleProvider style={getTheme(platform)}>{children}</StyleProvider>
);

export default function App({ navigation }) {
  useEffect(() => {
    console.log(`${Constants.linkingUri}`);
    // const prefix = LinkingExpo.makeUrl("/");
    // console.log({ prefix });
    Linking.addEventListener("url", ({ url }) => {
      console.log("boom", url);
      // urlRedirect(url);
    });
    Linking.getInitialURL().then(url => {
      console.log("url", url);
    });
  }, []);
  // function urlRedirect(url) {
  //   if (!url) return;
  //   // parse and redirect to new url
  //   let { path, queryParams } = LinkingExpo.parse(url);
  //   console.log(`Linked to app with path: ${path} and data: ${JSON.stringify(queryParams)}`);
  //   navigation.replace(path, queryParams);
  // }
  return (
    <StyleProviderTheme>
      <MyProvider>
        <Root>
          <StatusBar />
          <AppNavigation />
          <MainModalComponent navigation={navigation} />
        </Root>
      </MyProvider>
    </StyleProviderTheme>
  );
}
