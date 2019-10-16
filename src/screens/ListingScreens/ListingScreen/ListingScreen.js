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
import { UserContext } from "./../../../reducers/context";
import { isSubscribed } from "../../../utils";
import { LoadingHOC } from "../../../components";

const ListingScreenWithLoading = LoadingHOC(ListingScreenForm);

export default function ListingScreen(props) {
  const [isLoading, setIsLoading] = useState(true);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    asyncLoading();

    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
  }, [state.subscription]);

  const subscribed = isSubscribed(state.subscription);

  async function asyncLoading() {
    if (!subscribed) {
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
      response1 &&
        changeInitialFeatured({
          items: response1,
          favoriteItems: response2,
          dispatch
        });
    }

    setIsLoading(false);
  }

  // change item.featured and favoritelist
  const handleFavoriteChange = async item => {
    changeFavoriteCompanies({ token: state.token, item });
    handleClickIcon({ item, dispatch });
  };

  return (
    <ListingScreenWithLoading
      isLoading={isLoading}
      items={state.items}
      handleFavoriteChange={handleFavoriteChange}
      subscribed={subscribed}
    />
  );
}
