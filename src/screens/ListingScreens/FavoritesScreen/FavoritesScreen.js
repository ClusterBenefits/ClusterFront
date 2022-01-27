import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  View,
  Image,
  Dimensions,
} from 'react-native';
import {H1, H3} from 'native-base';

import {MainItem, Container, ActivityIndicator} from '../../../components';
import {colors, imgUrl} from '../../../constants';
import {ButtonModal} from '../../../services/mainModal';

import {
  handleClickIcon,
  changeFavoriteCompanies,
  fetchFavoriteItems,
} from '../../../actions/userActions';
import {UserContext} from './../../../reducers/context';
import {enhancedOnEndReached} from '../../../helpers';
import {isSubscribed} from '../../../utils';
import {getCompanyById} from '../../../actions/axiosFetchs';
import {CloseIcon, SearchIcon, SearchSwitcherIcon} from '../../../assets/svg';

const s = StyleSheet.create({
  mainText: {
    marginTop: 50,
    paddingLeft: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.mainGrey,
  },
  extraMarginLeft: {
    textAlign: 'center',
    color: colors.mainGrey,
  },
  image: {
    height: 40,
    width: 135,
    // width: 20,
  },

  input: {
    height: 38,
    flexGrow: 1,
    flexShrink: 1,
  },
  empty: {
    color: colors.mainGrey,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
  },
  inputWrapper: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    width: Dimensions.get('window').width - 32,
    borderBottomColor: colors.mainGrey,
  },
  icon: {
    flexShrink: 0,
  },
  inputBlue: {
    borderBottomColor: colors.mainBlue,
  },
  header: {
    paddingLeft: 15,

    borderBottomWidth: 1,
    borderBottomColor: colors.mainGrey,

    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default function FavoritesScreen(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefetching, setIsRefetching] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [value, setValue] = useState('');
  const [timer, setTimer] = useState(null);
  const [isShowSearch, setIsShowSearch] = useState(false);

  const {
    state: {favoriteItems, subscription, userInfo, token},
    dispatch,
  } = useContext(UserContext);

  const subscribed = isSubscribed(userInfo, subscription);

  useEffect(() => {
    asyncLoading();
  }, []);

  async function asyncLoading() {
    await fetchFavoriteItems({dispatch, token});
    setIsLoading(false);
  }

  // remove item from favorite list
  const handleFavoriteChange = item => {
    changeFavoriteCompanies({token, item});
    handleClickIcon({item, dispatch});
  };

  const fetchMore = async () => {
    if (favoriteItems.current_page < favoriteItems.last_page) {
      setIsFetchingMore(true);
      await fetchFavoriteItems({
        dispatch,
        token,
        page: favoriteItems.current_page + 1,
        name: value,
      });
      setIsFetchingMore(false);
    }
  };

  const bootstrap = async value => {
    setIsLoading(true);
    fetchFavoriteItems({dispatch, token, page: 1, name: value});
    setIsLoading(false);
  };

  useEffect(() => {
    if (isShowSearch) {
      clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          bootstrap(value);
        }, 500),
      );
    } else {
      if (value) {
        bootstrap('');
        setValue('');
      }
    }
  }, [value, isShowSearch]);

  const refetchItems = async () => {
    setIsRefetching(true);
    await fetchFavoriteItems({dispatch, token, name: value});
    setIsRefetching(false);
  };

  const fetchItem = useCallback(async id => {
    await getCompanyById({token, id});
  }, []);

  const handlePressItem = item => {
    // we don't need to wait for this async func to complete
    fetchItem(item.id); // hack for tracking event on server
    ButtonModal.showModal({item, handleFavoriteChange});
  };

  const renderHeader = useMemo(() => {
    return (
      <View style={s.header}>
        <View style={s.headerContent}>
          <Image
            style={s.image}
            source={{uri: `${imgUrl}${userInfo?.theme?.image?.preview?.url}`}}
          />
          <TouchableOpacity
            onPress={() => {
              setIsShowSearch(!isShowSearch);
            }}
            style={{marginRight: 16}}>
            <SearchSwitcherIcon
              size={36}
              fill={isShowSearch ? '#009fe3' : '#B8B0B0'}
            />
          </TouchableOpacity>
        </View>
        {isShowSearch && (
          <View style={[s.inputWrapper, !!value && s.inputBlue]}>
            <TextInput
              placeholder="Пошук"
              value={value}
              onChangeText={text => setValue(text)}
              style={s.input}
              name="search"
            />
            <TouchableOpacity
              style={s.icon}
              activeOpacity={0.8}
              onPress={() => {
                if (value) {
                  setValue('');
                }
              }}>
              {!value ? (
                <SearchIcon size={24} fill={colors.mainGrey} />
              ) : (
                <CloseIcon size={24} fill={colors.mainGrey} />
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }, [isShowSearch, value, userInfo]);

  console.log(favoriteItems.data.length);

  return (
    <Container>
      {renderHeader}
      {isLoading ? (
        <ActivityIndicator />
      ) : subscribed && favoriteItems.data?.length > 0 ? (
        <FlatList
          data={favoriteItems.data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <MainItem
              item={item}
              onPress={() => handlePressItem(item)}
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
