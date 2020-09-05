import { createStackNavigator } from "react-navigation";
import {
  ProfileScreen,
  ProfileEditScreen,
  ChangePasswordScreen,
  ChangeEmailScreen,
  BillingInformationScreen,
  FeedBackScreen,
  AddCreditInfoScreen,
  AgreementScreen
} from "../../screens";
import { screens } from "../../constants";

const ProfileNavigator = createStackNavigator(
  {
    [screens.ProfileScreen]: ProfileScreen,
    [screens.ProfileEditScreen]: ProfileEditScreen,
    [screens.ChangePasswordScreen]: ChangePasswordScreen,
    [screens.ChangeEmailScreen]: ChangeEmailScreen,
    [screens.BillingInformationScreen]: BillingInformationScreen,
    [screens.FeedBackScreen]: FeedBackScreen,
    [screens.AddCreditInfoScreen]: AddCreditInfoScreen,
    [screens.AgreementScreen]: AgreementScreen
  },
  {
    headerMode: "none"
  }
);

ProfileNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

export default ProfileNavigator;
