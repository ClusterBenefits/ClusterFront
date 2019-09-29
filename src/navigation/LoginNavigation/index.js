import { createSwitchNavigator, createStackNavigator } from "react-navigation";
import {
  IntroScreen,
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
    [screens.ForgotPasswordScreen]: ForgotPasswordScreen,
    [screens.NewPasswordScreen]: NewPasswordScreen,
    [screens.SignUpConfirmScreen]: SignUpConfirmScreen
  },
  {
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
  [screens.IntroScreen]: IntroScreen,
  [screens.SignUpScreen]: SignUpScreen,
  [screens.AddCreditInfoScreen]: AddCreditInfoScreen,
  ResetPasswordNavigation,
  FirstLogin
});
