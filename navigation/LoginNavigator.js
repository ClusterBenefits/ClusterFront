import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import React from "react";
import { Icon } from "@components/AllComponents";

// login screens

import IntroScreen from "../screens/LoginScreens/IntroScreen";
import LoginScreen from "../screens/LoginScreens/LoginScreen";
import SignUpScreen from "../screens/LoginScreens/SignUpScreen";
import SignUpConfirmScreen from "../screens/LoginScreens/SignUpConfirmScreen";
import ForgotPasswordScreen from "../screens/LoginScreens/ForgotPasswordScreen";
import NewPasswordScreen from "../screens/LoginScreens/NewPasswordScreen";

// welcome screens

import WelcomeScreen from "../screens/LoginScreens/WelcomeScreen";
import ProfileFillingScreen from "../screens/LoginScreens/ProfileFillingScreen";
import AddCreditInfoScreen from "../screens/LoginScreens/AddCreditInfoScreen";

// listing screens next

import ListingScreen from "../screens/ListingScreens/ListingScreen";
import BarcodeScreen from "../screens/ListingScreens/BarcodeScreen";
import FavoritesScreen from "../screens/ListingScreens/FavoritesScreen";
import CommentsScreen from "../screens/ListingScreens/CommentsScreen";
import AddCommentsScreen from "../screens/ListingScreens/AddCommentsScreen";

// profile screens next

import ProfileScreen from "../screens/ProfileScreens/ProfileScreen";
import ProfileEditScreen from "../screens/ProfileScreens/ProfileEditScreen";
import ChangePasswordScreen from "../screens/ProfileScreens/ChangePasswordScreen";
import ChangeEmailScreen from "../screens/ProfileScreens/ChangeEmailScreen";
import BillingInformationScreen from "../screens/ProfileScreens/BillingInformationScreen";
import FeedBackScreen from "../screens/ProfileScreens/FeedBackScreen";

const ProfileStack = createStackNavigator(
  {
    ProfileScreen,
    ProfileEditScreen,
    ChangePasswordScreen,
    ChangeEmailScreen,
    BillingInformationScreen,
    FeedBackScreen,
    AddCreditInfoScreen
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const ListingStack = createStackNavigator(
  {
    ListingScreen,
    BarcodeScreen,
    CommentsScreen,
    AddCommentsScreen
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const ProfileBottomTabNavigatior = createBottomTabNavigator(
  {
    ListingScreen: {
      screen: ListingStack,
      navigationOptions: {
        tabBarLabel: "Listing"
      }
    },
    FavoritesScreen: {
      screen: FavoritesScreen,
      navigationOptions: {
        tabBarLabel: "Favorites"
      }
    },
    ProfileScreen: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: "Profile"
      }
    }
  },
  {
    initialRouteName: "ListingScreen",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor, focused }) => {
        let { routeName } = navigation.state;
        let iconName;
        if (routeName === "ProfileScreen") {
          iconName = "user";
        }
        if (routeName === "ListingScreen") {
          iconName = "list";
        }
        if (routeName === "FavoritesScreen") {
          iconName = "star-empty";
        }
        return (
          <Icon
            color={`${tintColor}`}
            name={`${iconName}`}
            size={30}
            style={{ padding: 4 }}
          />
        );
      }
    }),
    tabBarOptions: {
      style: {
        height: 50,
        borderTopWidth: 1,
        borderTopColor: "#c9c9c9",
        backgroundColor: "#eb3a85"
      },
      labelStyle: {
        fontSize: 9,
        marginBottom: 0.5
      },
      // activeBackgroundColor: "lightblue",
      // inactiveBackgroundColor: "white",
      activeTintColor: "#ffcd02",
      inactiveTintColor: "white"
    }
  }
);

const ResetPassword = createStackNavigator(
  {
    LoginScreen,
    ForgotPasswordScreen,
    NewPasswordScreen,
    SignUpConfirmScreen
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const WelcomeBundle = createSwitchNavigator({
  AddCreditInfoScreen,
  IntroScreen,
  SignUpScreen,
  ResetPassword,
  WelcomeScreen,
  ProfileFillingScreen
});

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: WelcomeBundle },
  ProfileBottomTabNavigatior
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default AppContainer;
