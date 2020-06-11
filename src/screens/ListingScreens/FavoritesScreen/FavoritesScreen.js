import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import { H1, H3 } from "native-base";

import { MainItem, Container, ActivityIndicator } from "../../../components";
import { colors } from "../../../constants";
import { ButtonModal } from "../../../services/mainModal";

import { handleClickIcon, changeFavoriteCompanies, fetchFavoriteItems } from "../../../actions/userActions";
import { UserContext } from "./../../../reducers/context";
import { LoadingHOC } from "../../../components";
import { enhancedOnEndReached } from "../../../helpers";

const s = StyleSheet.create({
  mainText: {
    marginTop: 50,
    paddingLeft: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.mainGrey
  },
  extraMarginLeft: {
    marginLeft: 10
  }
});

export default function FavoritesScreen(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefetching, setIsRefetching] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const {
    state: { favoriteItems, token },
    dispatch
  } = useContext(UserContext);

  useEffect(() => {
    asyncLoading();
  }, []);

  async function asyncLoading() {
    await fetchFavoriteItems({ dispatch, token });
    setIsLoading(false);
  }

  // remove item from favorite list
  const handleFavoriteChange = item => {
    changeFavoriteCompanies({ token, item });
    handleClickIcon({ item, dispatch });
  };

  const fetchMore = async () => {
    if (favoriteItems.current_page < favoriteItems.last_page) {
      setIsFetchingMore(true);
      await fetchFavoriteItems({ dispatch, token, page: favoriteItems.current_page + 1 });
      setIsFetchingMore(false);
    }
  };

  const refetchItems = async () => {
    setIsRefetching(true);
    await fetchFavoriteItems({ dispatch, token });
    setIsRefetching(false);
  };

  return (
    <Container>
      <H1 style={s.mainText}>Улюблені</H1>
      {isLoading ? (
        <ActivityIndicator />
      ) : favoriteItems.data?.length > 0 ? (
        <FlatList
          data={favoriteItems.data}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <MainItem
              item={item}
              onPress={() => ButtonModal.showModal({ item, handleFavoriteChange })}
              handleFavoriteChange={handleFavoriteChange}
            />
          )}
          refreshing={isRefetching}
          onRefresh={refetchItems}
          onEndReached={enhancedOnEndReached(fetchMore)}
          onEndReachedThreshold={0.1}
          ListFooterComponent={isFetchingMore && <ActivityIndicator />}
        />
      ) : (
        <H3 style={s.extraMarginLeft}>Немає улюблених знижок</H3>
      )}
    </Container>
  );
}
