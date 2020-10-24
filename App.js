import React from "react";
import AppNavigation from "./src/navigation/AppNavigation";
import { StyleProvider, Root } from "native-base";

import getTheme from "./src/native-base-theme/components";
import platform from "./src/native-base-theme/variables/platform";
import { MyProvider } from "./src/reducers/context";
import { MainModalComponent } from "./src/services/mainModal";
import { StatusBar } from "./src/components";

const StyleProviderTheme = ({ children }) => (
  <StyleProvider style={getTheme(platform)}>{children}</StyleProvider>
);

const App = ({ navigation }) => (
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

export default App;
