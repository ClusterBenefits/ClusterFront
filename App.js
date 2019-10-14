import React from "react";
import AppNavigation from "./src/navigation/AppNavigation";
import { StyleProvider, Root } from "native-base";
import { StatusBar, View, Platform } from "react-native";
import getTheme from "./src/native-base-theme/components";
import platform from "./src/native-base-theme/variables/platform";
import { MyProvider } from "./src/reducers/context";
import { MainModalComponent } from "./src/services/mainModal";
import { isIphoneX } from "./src/utils";

const StyleProviderTheme = ({ children }) => (
  <StyleProvider style={getTheme(platform)}>{children}</StyleProvider>
);
const iosHeight = isIphoneX ? 44 : 20;
const Test = () => (
  <View
    style={{
      backgroundColor: "rgba(255, 255, 255, 1)",
      height: Platform.OS === "ios" ? iosHeight : StatusBar.currentHeight
    }}
  >
    <StatusBar translucent barStyle="dark-content" backgroundColor="white" />
  </View>
);

export default function App({ navigation }) {
  return (
    <StyleProviderTheme>
      <MyProvider>
        <Root>
          {/* <Test /> */}
          <AppNavigation />
          <MainModalComponent navigation={navigation} />
        </Root>
      </MyProvider>
    </StyleProviderTheme>
  );
}
