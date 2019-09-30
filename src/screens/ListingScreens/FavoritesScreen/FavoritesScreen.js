import React, { useContext } from "react";

import FavoritesScreenForm from "./FavoritesScreenForm";
import {
  handleClickIcon,
  changeFavoriteCompanies
} from "../../../actions/userActions";
import { UserContext } from "./../../../reducers/context";
import { LoadingHOC } from "@components/AllComponents";
import { screens } from "../../../constants";

const FavoritesScreenWithLoading = LoadingHOC(FavoritesScreenForm);

export default function FavoritesScreen(props) {
  const { state, dispatch } = useContext(UserContext);
  const goBarcodeScreen = item => {
    props.navigation.navigate(screens.BarcodeScreen, {
      item: item
    });
  };
  // remove item from favorite list
  const handleFavoriteChange = item => {
    changeFavoriteCompanies({ token: state.token, item });
    handleClickIcon({ item, dispatch });
  };

  return (
    <FavoritesScreenWithLoading
      favoriteItems={state.favoriteItems}
      handleFavoriteChange={handleFavoriteChange}
      goBarcodeScreen={goBarcodeScreen}
    />
  );
}
