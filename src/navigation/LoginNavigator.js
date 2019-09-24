import LoginNavigation from "./LoginNavigation";
import ProfileBottomTabNavigatior from "./BottomTabNavigator";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: LoginNavigation },
  ProfileBottomTabNavigatior
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default AppContainer;
