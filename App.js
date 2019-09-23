import React, { useEffect } from "react";
import AppContainer from "./src/navigation/LoginNavigator";
import { StyleProvider, Root } from "native-base";
import getTheme from "./src/native-base-theme/components";
import platform from "./src/native-base-theme/variables/platform";
import { MyProvider } from "./src/reducers/context";

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
