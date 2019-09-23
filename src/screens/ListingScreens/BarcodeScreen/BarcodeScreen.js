import React, { useEffect, useContext } from "react";
import { BackHandler } from "react-native";

import BarcodeScreenForm from "./BarcodeScreenForm";
import {
  handleClickIcon,
  changeFavoriteCompanies,
  handleBackButton
} from "../../../actions/userActions";
import { LoadingHOC } from "@components/AllComponents";
import { UserContext } from "./../../../reducers/context";

const BarcodeScreenWithLoading = LoadingHOC(BarcodeScreenForm);

export default function BarcodeScreen(props) {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  // change item.featured and favoritelist
  const handleFavoriteChange = item => {
    handleClickIcon({ item, dispatch });
    changeFavoriteCompanies({ token: state.token, item });
  };
  const goListingScreen = () => {
    props.navigation.pop();
  };
  const goCommentsScreen = () => {
    props.navigation.navigate("CommentsScreen", { item: item });
  };
  // getting item that needs to be rendered from navigation
  const item = props.navigation.getParam("item", "NO-ID");

  return (
    <BarcodeScreenWithLoading
      goListingScreen={goListingScreen}
      handleFavoriteChange={handleFavoriteChange}
      goCommentsScreen={goCommentsScreen}
      item={item}
    />
  );
}
