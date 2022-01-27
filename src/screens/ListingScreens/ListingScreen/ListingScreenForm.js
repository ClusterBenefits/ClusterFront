import React, {useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import {H1, H3, Text, Item, Input} from 'native-base';
import T from 'prop-types';
import {MainModalComponent} from '../../../services/mainModal';
import {colors, imgUrl} from '../../../constants';
import {ButtonModal} from '../../../services/mainModal';
import {
  Container,
  MainItem,
  ActivityIndicator,
  BlueButton,
  MainInput,
} from '../../../components';
import {enhancedOnEndReached} from '../../../helpers';
import {CloseIcon, SearchIcon, SearchSwitcherIcon} from '../../../assets/svg';
import {color, interpolate} from 'react-native-reanimated';
import {useEffect} from 'react/cjs/react.development';

const s = StyleSheet.create({
  // extraMarginLeft: {
  //   marginLeft: 10,
  //   textAlign: "center"
  // },
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
  buttonContainer: {
    paddingHorizontal: 30,
  },
  warning: {
    fontSize: 14,
    textAlign: 'center',
  },
  email: {
    color: '#009fe3',
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
  },
  icon: {
    flexShrink: 0,
  },
  inputBlue: {},
});

export default function ListScreenForm({
  items,
  handleFavoriteChange,
  subscribed,
  fetchMore,
  refetchItems,
  fetchItem,
  isRefetching,
  isFetchingMore,
  goBillingInformationScreen,
  setIsShowSearch,
  isShowSearch,
  userInfo,
  value,
  setValue,
}) {
  const handlePressItem = item => {
    // we don't need to wait for this async func to complete
    fetchItem(item.id); // hack for tracking event on server
    ButtonModal.showModal({item, handleFavoriteChange});
  };

  const renderHeader = useMemo(() => {
    console.log('rerender');

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
  }, [isShowSearch, value, userInfo, items]);
  return (
    <Container>
      {renderHeader}

      {subscribed ? (
        <FlatList
          refreshing={isRefetching}
          onRefresh={refetchItems}
          data={items}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <MainItem
              item={item}
              onPress={() => handlePressItem(item)}
              handleFavoriteChange={handleFavoriteChange}
              subscribed={subscribed}
            />
          )}
          ListEmptyComponent={
            isShowSearch ? (
              <Text style={s.empty}>Нічого не знайдено !</Text>
            ) : null
          }
          onEndReached={enhancedOnEndReached(fetchMore)}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            isFetchingMore && <ActivityIndicator size="small" />
          }
        />
      ) : (
        <>
          {/* <H3 style={s.extraMarginLeft}>Підпишіться, щоб отримати доступ до знижок</H3> */}
          <View style={s.buttonContainer}>
            <Text style={s.warning}>
              Щоб отримати доступ напишіть на пошту:{' '}
              <Text style={[s.warning, s.email]}>
                {' '}
                itbenefitscard@gmail.com
              </Text>
            </Text>
          </View>
          <FlatList
            refreshing={isRefetching}
            onRefresh={refetchItems}
            data={items}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <MainItem
                item={item}
                onPress={() => {}}
                subscribed={subscribed}
              />
            )}
            ListEmptyComponent={
              isShowSearch ? (
                <Text style={s.empty}>Нічого не знайдено !</Text>
              ) : null
            }
            onEndReached={enhancedOnEndReached(fetchMore)}
            onEndReachedThreshold={0.1}
            ListFooterComponent={
              isFetchingMore && <ActivityIndicator size="small" />
            }
          />
        </>
      )}
    </Container>
  );
}

ListScreenForm.propTypes = {
  items: T.array,
  handleFavoriteChange: T.func.isRequired,
  subscribed: T.bool,
  fetchMore: T.func,
  refetchItems: T.func,
  fetchItem: T.func,
  isRefetching: T.bool,
};
