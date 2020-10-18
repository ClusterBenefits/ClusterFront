import React, { useEffect } from "react";
import AppNavigation from "./src/navigation/AppNavigation";
import { StyleProvider, Root } from "native-base";
import * as Linking from "expo-linking";
import Constants from "expo-constants";

import getTheme from "./src/native-base-theme/components";
import platform from "./src/native-base-theme/variables/platform";
import { MyProvider } from "./src/reducers/context";
import { MainModalComponent } from "./src/services/mainModal";
import { StatusBar } from "./src/components";

const StyleProviderTheme = ({ children }) => (
  <StyleProvider style={getTheme(platform)}>{children}</StyleProvider>
);

const prefix = Linking.makeUrl("127.0.0.1:19000/");

export default function App({ navigation }) {
  useEffect(() => {
    function urlRedirect(url) {
      if (!url) return;
      let { path, queryParams } = Linking.parse(url);
      console.log(`Linked to app with path: ${path} and data: ${JSON.stringify(queryParams)}`);
      // navigation.replace(path, queryParams);
    }

    console.log(`${Constants.linkingUri}`);
    Linking.addEventListener("url", ({ url }) => {
      console.log("boom", url);
      urlRedirect(url);
    });
    Linking.getInitialURL().then(url => {
      console.log(url);
    });
  }, []);

  return (
    <StyleProviderTheme>
      <MyProvider>
        <Root>
          <StatusBar />
          <AppNavigation uriPrefix={prefix} />
          <MainModalComponent navigation={navigation} />
        </Root>
      </MyProvider>
    </StyleProviderTheme>
  );
}
