import { createSwitchNavigator, createStackNavigator } from "react-navigation";
import {
  SignUpScreen,
  WelcomeScreen,
  ProfileFillingScreen,
  AddCreditInfoScreen,
  LoginScreen,
  ForgotPasswordScreen,
  NewPasswordScreen,
  SignUpConfirmScreen
} from "../../screens";
import { screens } from "../../constants";

const ResetPasswordNavigation = createStackNavigator(
  {
    [screens.LoginScreen]: LoginScreen,
    [screens.SignUpScreen]: SignUpScreen,
    [screens.ForgotPasswordScreen]: ForgotPasswordScreen,
    [screens.NewPasswordScreen]: NewPasswordScreen,
    [screens.SignUpConfirmScreen]: SignUpConfirmScreen
  },
  {
    initialRouteName: screens.LoginScreen,
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const FirstLogin = createStackNavigator(
  {
    [screens.WelcomeScreen]: WelcomeScreen,
    [screens.ProfileFillingScreen]: ProfileFillingScreen
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

export default createSwitchNavigator({
  ResetPasswordNavigation,
  [screens.AddCreditInfoScreen]: AddCreditInfoScreen,
  FirstLogin
});
