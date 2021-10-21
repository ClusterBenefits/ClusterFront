import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ProfileScreen,
  ProfileEditScreen,
  ChangePasswordScreen,
  ChangeEmailScreen,
  BillingInformationScreen,
  FeedBackScreen,
  AddCreditInfoScreen,
  AgreementScreen,
  PrivacyPolicyScreen
} from "../../screens";
import { screens } from "../../constants";

const Stack = createStackNavigator();

const ProfileNavigator = () => (
  <Stack.Navigator   
    screenOptions={{
      headerShown: false
    }}>
    
    <Stack.Screen name={screens.ProfileScreen} component={ProfileScreen} />
    <Stack.Screen name={screens.ProfileEditScreen} component={ProfileEditScreen} />
    <Stack.Screen name={screens.ChangePasswordScreen} component={ChangePasswordScreen} />
    <Stack.Screen name={screens.ChangeEmailScreen} component={ChangeEmailScreen} />
    <Stack.Screen name={screens.BillingInformationScreen} component={BillingInformationScreen} />
    <Stack.Screen name={screens.FeedBackScreen} component={FeedBackScreen} />
    <Stack.Screen name={screens.AddCreditInfoScreen} component={AddCreditInfoScreen} />
    <Stack.Screen name={screens.AgreementScreen} component={AgreementScreen} />
    <Stack.Screen name={screens.PrivacyPolicyInProfileScreen} component={PrivacyPolicyScreen}/>

  </Stack.Navigator>
)

// const ProfileNavigator = createStackNavigator(
//   {
//     [screens.ProfileScreen]: { screen: ProfileScreen, path: "profile" },
//     [screens.ProfileEditScreen]: ProfileEditScreen,
//     [screens.ChangePasswordScreen]: ChangePasswordScreen,
//     [screens.ChangeEmailScreen]: ChangeEmailScreen,
//     [screens.BillingInformationScreen]: BillingInformationScreen,
//     [screens.FeedBackScreen]: FeedBackScreen,
//     [screens.AddCreditInfoScreen]: AddCreditInfoScreen,
//     [screens.AgreementScreen]: AgreementScreen
//   },
//   {
//     headerMode: "none"
//   }
// );

// ProfileNavigator.navigationOptions = ({navigation }) => {
//   let tabBarVisible = true;
//   if (navigation.state.index > 0) {
//     tabBarVisible = false;
//   }

//   // console.log(ProfileNavigator.router);
//   return {
//     tabBarVisible
//   };
// };

export default ProfileNavigator;
