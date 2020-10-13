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
const prefix1 = Linking.makeUrl("https://46-hh8.expotest32.cluster.exp.direct:80/");
const prefix2 = Linking.makeUrl("/");

export default function App({ navigation }) {
  // const linking = {
  //   prefixes: [prefix1, prefix2],
  //   config: {
  //     screens: {
  //       ProfileBottomTabNavigatior: {
  //         path: "bottom_tabs",
  //         screens: {
  //           ListingScreen: {
  //             path: "listing",
  //             exact: true
  //           },
  //           FavoritesScreen: {
  //             path: "favorites",
  //             exact: true
  //           }
  //         }
  //       }
  //     }
  //   }
  // };

  useEffect(() => {
    function urlRedirect(url) {
      if (!url) return;
      // parse and redirect to new url
      let { path, queryParams } = Linking.parse(url);
      console.log(`Linked to app with path: ${path} and data: ${JSON.stringify(queryParams)}`);
      navigation.replace(path, queryParams);
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
          <AppNavigation uriPrefix={prefix2} />
          <MainModalComponent navigation={navigation} />
        </Root>
      </MyProvider>
    </StyleProviderTheme>
  );
}
