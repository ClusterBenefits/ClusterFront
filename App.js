import React, { useEffect } from "react";
import AppContainer from "./navigation/LoginNavigator";
import { StyleProvider, Root } from "native-base";
import getTheme from "./native-base-theme/components";
import platform from "./native-base-theme/variables/platform";
import { MyProvider } from "./reducers/context";

const StyleProviderTheme = ({ children }) => (
  <StyleProvider style={getTheme(platform)}>{children}</StyleProvider>
);

export default function App() {
  return (
    <StyleProviderTheme>
      <MyProvider>
        <Root>
          <AppContainer />
        </Root>
      </MyProvider>
    </StyleProviderTheme>
  );
}
