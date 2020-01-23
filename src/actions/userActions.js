import { Alert, AsyncStorage } from "react-native";
import {
  postTokenToServer,
  login,
  register,
  forgotPassword,
  confirmCodeFromEmail,
  resetPassword,
  showUserInformation,
  updateUserInformation,
  changeUserEmail,
  changeUserPassword,
  listFavoritesCompanies,
  attachToFavorites,
  removeFromFavorites,
  listOfCompanies,
  sendMessageToAdmins,
  checkBillingSubscription,
  addBillingSubscription,
  deleteBillingSubscription,
  updateUserAvatar
} from "./axiosFetchs";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

export const dispatchTypes = {
  ADD_TOKEN: "ADD_TOKEN",
  CLEAR_USER: "CLEAR_USER",
  ADD_USERINFO: "ADD_USERINFO",
  ADD_ITEMS: "ADD_ITEMS",
  FEATURED: "FEATURED",
  FAVORITE_ITEMS_KEYS: "FAVORITE_ITEMS_KEYS",
  ADD_FAVORITE_ITEMS: "ADD_FAVORITE_ITEMS",
  ADD_COMMENTS: "ADD_COMMENTS",
  SUBSCRIPTION: "SUBSCRIPTION"
};

///////// AUTH
export const registerForPushNotificationsAsync = async userToken => {
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    return;
  }
  try {
    let token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
    if (token) {
      postTokenToServer({ expoToken: token, token: userToken });
    }
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async ({ ...props }) => {
  let response = await login(props);
  if (response) {
    props.dispatch({
      type: dispatchTypes.ADD_TOKEN,
      payload: response
    });
  }
  return response;
};

export const registerUser = async ({ ...props }) => {
  let response = await register(props);
  if (response) {
    props.dispatch({
      type: dispatchTypes.ADD_TOKEN,
      payload: response
    });
  }
  return response;
};

///////// AUTH

///////// Forgot password

export const resetUserPassword = async ({ email, resend }) => {
  const response = await forgotPassword({ email, resend });
  return response;
};

export const confirmUserCodeFromEmail = async ({ email, code }) => {
  const response = await confirmCodeFromEmail({ email, code });
  return response;
};

export const setNewUserPassword = async ({ ...props }) => {
  const response = await resetPassword(props);
  return response;
};

///////// Forgot password

///////// Password/Email Reset

export const changeEmail = async ({ token, email, dispatch }) => {
  let response = await changeUserEmail({ token, email });
  if (response) {
    console.log("email changed to", email);
    AsyncStorage.setItem("email", email);
    dispatch({
      type: dispatchTypes.ADD_USERINFO,
      payload: response
    });
  }
  return response;
};

export const changePassword = async ({ ...props }) => {
  let response = await changeUserPassword(props);
  if (response) {
    console.log("password changed to", props.new_password);
    AsyncStorage.setItem("password", props.new_password);
  }
  return response;
};

//////// Password/Email Reset

//////// User

export const fetchUserInfo = async ({ token, dispatch }) => {
  const response = await showUserInformation(token);
  if (response) {
    dispatch({
      type: dispatchTypes.ADD_USERINFO,
      payload: response
    });
  }
  return response;
};

export const postUserInfo = async ({ token, data, dispatch }) => {
  const response = await updateUserInformation({ token, data });
  if (response) {
    dispatch({
      type: dispatchTypes.ADD_USERINFO,
      payload: response
    });
  }
  return response;
};

/////// User

export const fetchItems = async ({ dispatch, token }) => {
  let response = await listOfCompanies(token);

  await dispatch({
    type: dispatchTypes.ADD_ITEMS,
    payload: response ? response : null
  });

  return response;
};

// fetch favoriteItemsKeys for user from server (doing it only once at start)

export const fetchFavoriteItems = async ({ token, dispatch }) => {
  let response = await listFavoritesCompanies(token);

  response && response.forEach(item => (item.featured = true));
  await dispatch({
    type: dispatchTypes.ADD_FAVORITE_ITEMS,
    payload: response ? response : null
  });

  return response;
};

// CreditCardApi

export const checkCreditCardSubscription = async ({ token, dispatch }) => {
  let response = await checkBillingSubscription(token);
  dispatch({
    type: dispatchTypes.SUBSCRIPTION,
    payload: response
  });
  return response;
};

export const addCreditCardSubscription = async ({ ...props }) => {
  let response = await addBillingSubscription(props);
  if (response) {
    checkCreditCardSubscription({ token: props.token, dispatch: props.dispatch });
  }
  props.dispatch({
    type: dispatchTypes.SUBSCRIPTION,
    payload: response ? response : false
  });
  return response;
};

export const deleteCreditCardSubscription = async ({ ...props }) => {
  Alert.alert(
    "Скасувати підписку",
    "Ви впевнені, що хочете скасувати підписку?",
    [
      {
        text: "Ні",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: "Так",
        onPress: async () => {
          props.setIsLoading(true);
          let response = await deleteBillingSubscription(props);
          if (response) {
            props.dispatch({
              type: dispatchTypes.SUBSCRIPTION,
              payload: response.status === "unsubscribe" ? false : null
            });
          }
          props.setIsLoading(false);
        }
      }
    ],
    {
      cancelable: false
    }
  );
};

// CreditCardApi

// change star color if item is in favorite list (doing it only once at start)
export const changeInitialFeatured = ({ items, favoriteItems, dispatch }) => {
  favoriteItems.forEach(key => {
    items.forEach(item => {
      if (item.id === key.id) {
        item.featured = true;
      }
    });
  });
  dispatch({
    type: dispatchTypes.ADD_ITEMS,
    payload: items
  });
};

export const changeFavoriteCompanies = ({ token, item }) => {
  item.featured ? removeFromFavorites({ token, id: item.id }) : attachToFavorites({ token, id: item.id });
};

// change item.featured , favoriteItems , favoriteItemsKeys(All logic in reducer)

export const handleClickIcon = ({ item, dispatch }) => {
  dispatch({
    type: dispatchTypes.FEATURED,
    payload: item
  });
};

// other

export const sendMessageToAdmin = async ({ ...props }) => {
  let response = await sendMessageToAdmins(props);

  return response;
};

export const clearUserLocal = async ({ dispatch }) =>
  new Promise(resolve => {
    Alert.alert(
      "Вийти",
      "Ви впевнені, що хочете вийти?",
      [
        {
          text: "Ні",
          onPress: () => {
            console.log("Cancel Pressed");
            resolve("No");
          },
          style: "cancel"
        },
        {
          text: "Так",
          onPress: () => {
            console.log("loging out )");
            AsyncStorage.clear().catch(e => console.log(e));
            dispatch({
              type: dispatchTypes.CLEAR_USER
            });
            resolve("Yes");
          }
        }
      ],
      {
        cancelable: false
      }
    );
  });
