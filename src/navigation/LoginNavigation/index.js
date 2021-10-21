import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  SignUpScreen,
  WelcomeScreen,
  ProfileFillingScreen,
  LoginScreen,
  ForgotPasswordScreen,
  NewPasswordScreen,
  SignUpConfirmScreen,
  PrivacyPolicyScreen,
  ContractInformationScreen
} from "../../screens";
import { screens, navigation } from "../../constants";

const Stack = createStackNavigator();


const ResetPasswordNavigator = () => (
  <Stack.Navigator 
    initialRouteName={screens.LoginScreen}
    screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen component={LoginScreen} name={screens.LoginScreen} />
      <Stack.Screen component={SignUpScreen} name={screens.SignUpScreen} /> 
      <Stack.Screen component={ForgotPasswordScreen} name={screens.ForgotPasswordScreen} />
      <Stack.Screen component={NewPasswordScreen} name={screens.NewPasswordScreen} />
      <Stack.Screen component={SignUpConfirmScreen} name={screens.SignUpConfirmScreen} />
      <Stack.Screen name={screens.PrivacyPolicyScreen} component={PrivacyPolicyScreen}/>
      <Stack.Screen name={screens.ContractInformationScreen} component={ContractInformationScreen}/>
    </Stack.Navigator>
)

// const ResetPasswordNavigation = createStackNavigator(
//   {
//     [screens.LoginScreen]: LoginScreen,
//     [screens.SignUpScreen]: SignUpScreen,
//     [screens.ForgotPasswordScreen]: ForgotPasswordScreen,
//     [screens.NewPasswordScreen]: NewPasswordScreen,
//     [screens.SignUpConfirmScreen]: SignUpConfirmScreen
//   },
//   {
//     initialRouteName: screens.LoginScreen,
//     headerMode: "none",
//     navigationOptions: {
//       headerVisible: false
//     }
//   }
// );

const FirstLoginNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}>
    <Stack.Screen component={WelcomeScreen} name={screens.WelcomeScreen}/>
    <Stack.Screen component={ProfileFillingScreen} name={screens.ProfileFillingScreen}/>
  </Stack.Navigator>
)

// const FirstLogin = createStackNavigator(
//   {
//     [screens.WelcomeScreen]: WelcomeScreen,
//     [screens.ProfileFillingScreen]: ProfileFillingScreen
//   },
//   {
//     headerMode: "none",
//     navigationOptions: {
//       headerVisible: false
//     }
//   }
// );

const LoginNavigation = () => (
  <Stack.Navigator 
    initialRouteName={navigation.ResetPasswordNavigation}
    screenOptions={{
      headerShown: false
    }}>
    <Stack.Screen name={navigation.ResetPasswordNavigation} component={ResetPasswordNavigator} />
    <Stack.Screen name={navigation.FirstLoginNavigator} component={FirstLoginNavigator} />
  </Stack.Navigator>
);


export default LoginNavigation;
