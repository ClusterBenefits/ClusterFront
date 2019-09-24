import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import ProfileNavigation from "../ProfileNavigator";
import ListingNavigation from "../ListingNavigator";
import { Icon } from "@components/AllComponents";
import { FavoritesScreen } from "../../screens";

export default createBottomTabNavigator(
  {
    ListingScreen: {
      screen: ListingNavigation,
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
      screen: ProfileNavigation,
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
