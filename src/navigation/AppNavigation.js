import React from "react";
import LoginNavigation from "./LoginNavigation";
import {createStackNavigator} from "@react-navigation/stack";
import ProfileBottomTabNavigator from "./BottomTabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import {screens, navigation} from "../constants/navigation";
import {PrivacyPolicyScreen, ContractInformationScreen} from "../screens";

const Stack = createStackNavigator();

const AppNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator 
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name={navigation.WelcomeNavigator} component={LoginNavigation}/>
      <Stack.Screen name={navigation.ProfileBottomTabNavigator} component={ProfileBottomTabNavigator} />
    </Stack.Navigator>
    
  </NavigationContainer>
);

export default AppNavigation;
