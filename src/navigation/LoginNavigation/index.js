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

export default createSwitchNavigator({
  [screens.IntroScreen]: IntroScreen,
  [screens.SignUpScreen]: SignUpScreen,
  [screens.WelcomeScreen]: WelcomeScreen,
  [screens.ProfileFillingScreen]: ProfileFillingScreen,
  [screens.AddCreditInfoScreen]: AddCreditInfoScreen,
  ResetPasswordNavigation
});
