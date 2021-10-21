import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ListingScreen } from "../../screens";
import { screens } from "../../constants";

const Stack = createStackNavigator();

const ListingNavigator = () => (
  <Stack.Navigator
    screenOptions={{
        headerShown: false
    }}>
    <Stack.Screen name={screens.ListingScreen} component={ListingScreen}/>
  </Stack.Navigator>
)


// export default createStackNavigator(
//   {
//     [screens.ListingScreen]: ListingScreen
//   },
//   {
//     headerMode: "none",
//     navigationOptions: {
//       headerVisible: false
//     }
//   }
// );

export default ListingNavigator;
