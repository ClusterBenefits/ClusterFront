import React, { useState, useEffect, useContext } from "react";
import { BackHandler } from "react-native";

import {
  fetchItems,
  handleBackButton,
  fetchFavoriteItems,
  changeInitialFeatured,
  handleClickIcon,
  changeFavoriteCompanies
} from "../../../actions/userActions";
import ListingScreenForm from "./ListingScreenForm";
import { LoadingHOC } from "@components/AllComponents";
import { UserContext } from "./../../../reducers/context";

const ListingScreenWithLoading = LoadingHOC(ListingScreenForm);

export default function ListingScreen(props) {
  const [isLoading, setIsLoading] = useState(true);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    asyncLoading();

    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
  }, [state.subscription]);

  async function asyncLoading() {
    if (!state.subscription) {
      // fetch all product items
      let response1 = await fetchItems({
        dispatch,
        token: state.token
      });
      //fetch all favorites items
      let response2 = await fetchFavoriteItems({
        token: state.token,
        dispatch
      });
      // change star color if item is in favorite list
      changeInitialFeatured({
        items: response1,
        favoriteItems: response2,
        dispatch
      });
    }

    setIsLoading(false);
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
      subscription={!state.subscription}
    />
  );
}
