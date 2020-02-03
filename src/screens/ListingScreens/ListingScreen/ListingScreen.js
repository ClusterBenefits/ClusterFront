import React, { useState, useEffect, useContext } from "react";

import {
  fetchItems,
  fetchFavoriteItems,
  changeInitialFeatured,
  handleClickIcon,
  changeFavoriteCompanies
} from "../../../actions/userActions";
import ListingScreenForm from "./ListingScreenForm";
import { UserContext } from "./../../../reducers/context";
import { isSubscribed } from "../../../utils";
import { LoadingHOC } from "../../../components";
import { useBackButton } from "../../../hooks";

const ListingScreenWithLoading = LoadingHOC(ListingScreenForm);

export default function ListingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const {
    state: { subscription, userInfo, token, items },
    dispatch
  } = useContext(UserContext);

  useEffect(() => {
    asyncLoading();
  }, [subscription, userInfo]);

  useBackButton(true);

  const subscribed = isSubscribed(userInfo, subscription);

  async function asyncLoading() {
    // fetch all product items
    let response1 = await fetchItems({
      dispatch,
      token
    });

    //fetch all favorites items
    let response2 = await fetchFavoriteItems({
      token,
      dispatch
    });
    // change star color if item is in favorite list
    response1 &&
      changeInitialFeatured({
        items: response1,
        favoriteItems: response2,
        dispatch
      });

    setIsLoading(false);
  }

  // change item.featured and favoritelist
  const handleFavoriteChange = async item => {
    changeFavoriteCompanies({ token, item });
    handleClickIcon({ item, dispatch });
  };

  return (
    <ListingScreenWithLoading
      isLoading={isLoading}
      items={items}
      handleFavoriteChange={handleFavoriteChange}
      subscribed={subscribed}
    />
  );
}
