import { createStackNavigator } from "react-navigation";
import {
  ProfileScreen,
  ProfileEditScreen,
  ChangePasswordScreen,
  ChangeEmailScreen,
  BillingInformationScreen,
  FeedBackScreen,
  AddCreditInfoScreen,
  CameraScreen
} from "../../screens";
import { screens } from "../../constants";

export default createStackNavigator(
  {
    [screens.ProfileScreen]: ProfileScreen,
    [screens.ProfileEditScreen]: ProfileEditScreen,
    [screens.ChangePasswordScreen]: ChangePasswordScreen,
    [screens.ChangeEmailScreen]: ChangeEmailScreen,
    [screens.BillingInformationScreen]: BillingInformationScreen,
    [screens.FeedBackScreen]: FeedBackScreen,
    [screens.AddCreditInfoScreen]: AddCreditInfoScreen,
    [screens.CameraScreen]: CameraScreen
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
