import React, { useState, useEffect, useContext } from "react";
import { AsyncStorage, BackHandler } from "react-native";
import * as Font from "expo-font";

import IntroScreenForm from "./IntroScreenForm";
import { LoadingHOC } from "@components/AllComponents";
import { handleBackButton, loginUser } from "../../../actions/userActions";
import { UserContext } from "./../../../reducers/context";

const IntroScreenWithLoading = LoadingHOC(IntroScreenForm);

export default function IntroScreen(props) {
  const [isLoading, setIsLoading] = useState(true);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    loadAll();
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  async function loadAll() {
    await loadFontsAsync();
    await getUserData();
  }
  // loading all extra fonts and fonticons i need

  const loadFontsAsync = async () => {
    await Font.loadAsync({
      Helvetica: require("../../../assets/fonts/Helvetica.ttf"),
      fontello: require("../../../assets/fonts/font-icons/fontello.ttf")
    });
  };

  // Autologin , try to get password and email from asyncstorage, if yes => try to login
  const getUserData = async () => {
    let email = (await AsyncStorage.getItem("email")) || "none";
    let password = (await AsyncStorage.getItem("password")) || "none";

    console.log(email, password);

    // tryng to auto login

    if (!(email === "none") && !(password === "none")) {
      let response = await loginUser({
        email,
        password,
        dispatch
      });

      if (response) {
        props.navigation.navigate("WelcomeScreen");
      } else {
        console.log("wrong token");
        setIsLoading(false);
      }
    } else {
      console.log("no data at async storage");
      setIsLoading(false);
    }
  };

  const goLogIn = () => {
    props.navigation.navigate("LoginScreen");
  };

  const goSignIn = () => {
    props.navigation.navigate("SignUpScreen");
  };

  return (
    <IntroScreenWithLoading
      isLoading={isLoading}
      goLogIn={goLogIn}
      goSignIn={goSignIn}
    />
  );
}
