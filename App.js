import React from "react";
import AppNavigation from "./src/navigation/AppNavigation";
import { StyleProvider, Root } from "native-base";

import getTheme from "./src/native-base-theme/components";
import platform from "./src/native-base-theme/variables/platform";
import { MyProvider } from "./src/reducers/context";
import { MainModalComponent } from "./src/services/mainModal";
import { StatusBar } from "./src/components/AllComponents";

const StyleProviderTheme = ({ children }) => (
  <StyleProvider style={getTheme(platform)}>{children}</StyleProvider>
);

export default function App({ navigation }) {
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
