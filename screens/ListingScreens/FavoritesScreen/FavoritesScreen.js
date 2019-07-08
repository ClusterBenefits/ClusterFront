import React, { useContext } from "react";
import FavoritesScreenForm from "./FavoritesScreenForm";
import {
  handleClickIcon,
  changeFavoriteCompanies
} from "../../../actions/userActions";
import { UserContext } from "./../../../reducers/context";
import { LoadingHOC } from "@components/AllComponents";

const FavoritesScreenWithLoading = LoadingHOC(FavoritesScreenForm);

export default function FavoritesScreen(props) {
  const { state, dispatch } = useContext(UserContext);
  const goBarcodeScreen = item => {
    props.navigation.navigate("BarcodeScreen", {
      item: item
    });
  };
  const handleFavoriteChange = item => {
    handleClickIcon({ item, dispatch });
    changeFavoriteCompanies({ token: state.token, item });
  };

  return (
    <FavoritesScreenWithLoading
      favoriteItems={state.favoriteItems}
      handleFavoriteChange={handleFavoriteChange}
      goBarcodeScreen={goBarcodeScreen}
    />
  );
}
