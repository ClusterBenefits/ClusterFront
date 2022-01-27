import React, {useState, useEffect, useContext, useCallback} from 'react';

import {
  fetchItems,
  handleClickIcon,
  changeFavoriteCompanies,
} from '../../../actions/userActions';
import ListingScreenForm from './ListingScreenForm';
import {UserContext} from './../../../reducers/context';
import {isSubscribed} from '../../../utils';
import {LoadingHOC} from '../../../components';
import {useBackButton} from '../../../hooks';
import {screens} from '../../../constants';
import {getCompanyById} from '../../../actions/axiosFetchs';
import {BackHandler} from 'react-native';

const ListingScreenWithLoading = LoadingHOC(ListingScreenForm);

export default function ListingScreen({navigation}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefetching, setIsRefetching] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isShowSearch, setIsShowSearch] = useState(false);

  const [value, setValue] = useState('');
  const [timer, setTimer] = useState(null);

  const {
    state: {subscription, userInfo, token, items},
    dispatch,
  } = useContext(UserContext);

  useEffect(() => {
    asyncLoading();
  }, [subscription, userInfo]);

  useBackButton(true);

  const subscribed = isSubscribed(userInfo, subscription);

  async function asyncLoading() {
    await fetchItems({dispatch, token});
    setIsLoading(false);
  }

  const fetchMore = async () => {
    if (items.current_page < items.last_page) {
      setIsFetchingMore(true);
      await fetchItems({
        dispatch,
        token,
        page: items.current_page + 1,
        name: value,
      });
      setIsFetchingMore(false);
    }
  };

  const bootstrap = async value => {
    fetchItems({dispatch, token, page: 1, name: value});
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

  // change item.featured and favoritelist
  const handleFavoriteChange = async item => {
    changeFavoriteCompanies({token, item});
    handleClickIcon({item, dispatch});
  };

  const refetchItems = async () => {
    setIsRefetching(true);
    await fetchItems({dispatch, token, name: value});
    setIsRefetching(false);
  };

  const fetchItem = useCallback(async id => {
    await getCompanyById({token, id});
  }, []);

  const goBillingInformationScreen = () =>
    navigation.navigate(screens.BillingInformationScreen);

  return (
    <ListingScreenWithLoading
      isLoading={isLoading}
      items={items.data}
      handleFavoriteChange={handleFavoriteChange}
      subscribed={subscribed}
      fetchMore={fetchMore}
      refetchItems={refetchItems}
      fetchItem={fetchItem}
      isRefetching={isRefetching}
      isFetchingMore={isFetchingMore}
      goBillingInformationScreen={goBillingInformationScreen}
      userInfo={userInfo}
      isShowSearch={isShowSearch}
      setIsShowSearch={setIsShowSearch}
      value={value}
      setValue={setValue}
    />
  );
}
