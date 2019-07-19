import React, { useContext, useEffect, useState } from "react";

import CommentsScreenForm from "./CommentsScreenForm";
import { getComments } from "../../../actions/userActions";
import { UserContext } from "./../../../reducers/context";
import { LoadingHOC } from "@components/AllComponents";

const CommentsScreenWithLoading = LoadingHOC(CommentsScreenForm);

export default function CommentsScreen(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const getAllComments = async () => {
      await getComments({ id: item.id, token: state.token, dispatch });
      setIsLoading(false);
    };
    getAllComments();
  }, []);

  // adding on scrollview
  const handleLoadMore = async () => {
    if (
      state.comments.meta.pagination.current_page <
      state.comments.meta.pagination.total_pages
    ) {
      setRefreshing(true);
      await getComments({
        id: item.id,
        token: state.token,
        dispatch,
        page: state.comments.meta.pagination.current_page + 1,
        comments: state.comments
      });
      setRefreshing(false);
    }
  };

  const goBarcodeScreen = () => {
    props.navigation.pop();
  };

  const goAddCommentsScreen = () => {
    props.navigation.navigate("AddCommentsScreen", {
      item: item
    });
  };

  // getting item that needs to be rendered from navigation

  const item = props.navigation.getParam("item", "NO-ID");
  return (
    <CommentsScreenWithLoading
      isLoading={isLoading}
      goBarcodeScreen={goBarcodeScreen}
      goAddCommentsScreen={goAddCommentsScreen}
      comments={state.comments}
      userInfo={state.userInfo}
      handleLoadMore={handleLoadMore}
      refreshing={refreshing}
    />
  );
}
