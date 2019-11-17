import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import ProfileNavigation from "../ProfileNavigator";
import ListingNavigation from "../ListingNavigator";
import { FavoritesScreen } from "../../screens";
import { colors, screens } from "../../constants";
import { ProfileIcon, FavoritesIcon, MyCardsIcon } from "../../assets/svg";

export default createBottomTabNavigator(
  {
    ListingScreen: {
      screen: ListingNavigation,
      navigationOptions: {
        tabBarLabel: "Мої картки"
      }
    },
    FavoritesScreen: {
      screen: FavoritesScreen,
      navigationOptions: {
        tabBarLabel: "Улюблені"
      }
    },
    ProfileScreen: {
      screen: ProfileNavigation,
      navigationOptions: {
        tabBarLabel: "Профіль"
      }
    }
  },
  {
    initialRouteName: screens.ListingScreen,
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor, focused }) => {
        let { routeName } = navigation.state;
        if (routeName === screens.ProfileScreen) {
          return <ProfileIcon fill={`${tintColor}`} />;
        }
        if (routeName === screens.ListingScreen) {
          return <MyCardsIcon fill={`${tintColor}`} />;
        }
        if (routeName === screens.FavoritesScreen) {
          return <FavoritesIcon fill={`${tintColor}`} />;
        }
      }
    }),
    tabBarOptions: {
      style: {
        height: 53,
        backgroundColor: "#fff",
        paddingTop: 6
      },
      labelStyle: {
        fontSize: 9,
        marginBottom: 0.5
      },
      // activeBackgroundColor: "lightblue",
      // inactiveBackgroundColor: "white",
      activeTintColor: colors.mainBlue,
      inactiveTintColor: colors.mainGrey
    }
  }
);
