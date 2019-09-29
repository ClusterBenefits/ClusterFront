import React, { useEffect } from "react";
import AppContainer from "./src/navigation/LoginNavigator";
import { StyleProvider, Root } from "native-base";
import { StatusBar, View, Platform } from "react-native";
import getTheme from "./src/native-base-theme/components";
import platform from "./src/native-base-theme/variables/platform";
import { MyProvider } from "./src/reducers/context";

const StyleProviderTheme = ({ children }) => (
  <StyleProvider style={getTheme(platform)}>{children}</StyleProvider>
);
const Test = () => (
  <View
    style={{
      backgroundColor: "#fff",
      height: Platform.OS === "ios" ? 20 : StatusBar.currentHeight
    }}
  >
    <StatusBar translucent barStyle="dark-content" backgroundColor="#fff" />
  </View>
);

export default function App() {
  return (
    <StyleProviderTheme>
      <MyProvider>
        <Root>
          <Test />
          <AppContainer />
        </Root>
      </MyProvider>
    </StyleProviderTheme>
  );
}
