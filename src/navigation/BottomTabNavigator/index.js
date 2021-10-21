import React from "react";
// import { createBottomTabNavigator } from "react-navigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileNavigator from "../ProfileNavigator";
import ListingNavigator from "../ListingNavigator";
import { FavoritesScreen } from "../../screens";
import { colors, screens, navigation } from "../../constants";
import { ProfileIcon, FavoritesIcon, MyCardsIcon } from "../../assets/svg";
import { useSafeAreaInsets } from 'react-native-safe-area-context'



const Tabs = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const insets = useSafeAreaInsets();


  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 55 + insets.bottom,
          backgroundColor: "#fff",
          paddingTop: 6,
          alignItems: "center"
        },
        tabBarLabelStyle: {
          fontSize: 9,
          marginBottom: 0.5,
          justifyContent: 'space-between',
          height: 20
        },
        tabBarActiveTintColor: colors.mainBlue,
        tabBarInactiveTintColor: colors.mainGrey
      }}
      initialRouteName={navigation.ListingNavigator}>
      <Tabs.Screen 
        component={ListingNavigator} 
        name={navigation.ListingNavigator} 
        options={{
          tabBarIcon: ({color}) => (<MyCardsIcon fill={`${color}`} />),
          tabBarLabel: "Мої картки"
        }}/>
  
      <Tabs.Screen 
        component={FavoritesScreen} 
        name={screens.FavoritesScreen} 
        options={{
          tabBarIcon: ({color}) => (<FavoritesIcon fill={`${color}`} />),
          tabBarLabel: "Улюблені"
        }}/>
  
      <Tabs.Screen 
        component={ProfileNavigator} 
        name={navigation.ProfileNavigator} 
        options={{
          tabBarIcon: ({color, size}) => (<ProfileIcon fill={`${color}`} size={size}/>),
          tabBarLabel: "Профіль"
        }}/>
  
    </Tabs.Navigator>
  )
};

export default BottomTabNavigator;


// export default createBottomTabNavigator(
  // {
  //   ListingScreen: {
  //     screen: ListingNavigation,
  //     navigationOptions: {
  //       tabBarLabel: "Мої картки"
  //     }
  //   },
  //   FavoritesScreen: {
  //     screen: FavoritesScreen,
  //     path: "favorites",
  //     navigationOptions: {
  //       tabBarLabel: "Улюблені"
  //     }
  //   },
  //   ProfileScreen: {
  //     screen: ProfileNavigation,
  //     navigationOptions: {
  //       tabBarLabel: "Профіль"
  //     },
  //     path: "tab"
  //   }
  // },
  // //{
  //   initialRouteName: screens.ListingScreen,
  //   defaultNavigationOptions: ({ navigation }) => ({
  //     tabBarIcon: ({ tintColor, focused }) => {
  //       let { routeName } = navigation.state;
  //       if (routeName === screens.ProfileScreen) {
  //         return <ProfileIcon fill={`${tintColor}`} />;
  //       }
  //       if (routeName === screens.ListingScreen) {
  //         return <MyCardsIcon fill={`${tintColor}`} />;
  //       }
  //       if (routeName === screens.FavoritesScreen) {
  //         return <FavoritesIcon fill={`${tintColor}`} />;
  //       }
  //     }
  //   }),
//     tabBarOptions: {
//       style: {
//         height: 53,
//         backgroundColor: "#fff",
//         paddingTop: 6
//       },
//       labelStyle: {
//         fontSize: 9,
//         marginBottom: 0.5
//       },
//       // activeBackgroundColor: "lightblue",
//       // inactiveBackgroundColor: "white",
//       activeTintColor: colors.mainBlue,
//       inactiveTintColor: colors.mainGrey
//     }
//   }
// );
