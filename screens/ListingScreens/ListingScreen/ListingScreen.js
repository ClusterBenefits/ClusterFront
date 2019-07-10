import React, { useState, useEffect, useContext } from "react";
import ListingScreenForm from "./ListingScreenForm";
import { BackHandler } from "react-native";
import {
  fetchItems,
  handleBackButton,
  fetchFavoriteItems,
  changeInitialFeatured,
  handleClickIcon,
  changeFavoriteCompanies,
  checkCreditCardSubscription
} from "../../../actions/userActions";
import { LoadingHOC } from "@components/AllComponents";
import { UserContext } from "./../../../reducers/context";

const ListingScreenWithLoading = LoadingHOC(ListingScreenForm);

export default function ListingScreen(props) {
  const [isLoading, setIsLoading] = useState(true);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    asyncLoading();

    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
  }, []);

  async function asyncLoading() {
    checkCreditCardSubscription({ token: state.token, dispatch });
    let response1 = await fetchItems({ dispatch }); // fetch all product items
    let response2 = await fetchFavoriteItems({ token: state.token, dispatch }); //fetch all favorites items
    changeInitialFeatured({
      // change star color if item is in favorite list
      items: response1,
      favoriteItems: response2,
      dispatch
    });
    setIsLoading(false);
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
  }

  const goBarcodeScreen = item => {
    props.navigation.navigate("BarcodeScreen", {
      item: item
    });
  };

  // change item.featured and favoritelist
  const handleFavoriteChange = async item => {
    handleClickIcon({ item, dispatch });
    changeFavoriteCompanies({ token: state.token, item });
  };

  return (
    <ListingScreenWithLoading
      isLoading={isLoading}
      items={state.items}
      goBarcodeScreen={goBarcodeScreen}
      handleFavoriteChange={handleFavoriteChange}
    />
  );
}
