import { BackHandler, Alert, AsyncStorage } from "react-native";
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
  getItemComments,
  sendMessageToAdmins,
  sendComments,
  checkBillingSubscription,
  addBillingSubscription,
  deleteBillingSubscription
} from "./axiosFetchs";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

export const ADD_TOKEN = "ADD_TOKEN";
export const CLEAR_USER = "CLEAR_USER";
export const ADD_USERINFO = "ADD_USERINFO";
export const ADD_ITEMS = "ADD_ITEMS";
export const FEATURED = "FEATURED";
export const FAVORITE_ITEMS_KEYS = "FAVORITE_ITEMS_KEYS";
export const ADD_FAVORITE_ITEMS = "ADD_FAVORITE_ITEMS";
export const ADD_COMMENTS = "ADD_COMMENTS";
export const SUBSCRIPTION = "SUBSCRIPTION";

export const url = "https://api.cluster.ukietech.org";
// export const url = "https://258910eb.ngrok.io";

///////// AUTH
export const registerForPushNotificationsAsync = async userToken => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );

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
      type: ADD_TOKEN,
      payload: response
    });
  }
  return response;
};

export const registerUser = async ({ ...props }) => {
  let response = await register(props);
  if (response) {
    props.dispatch({
      type: ADD_TOKEN,
      payload: response
    });
  }
  return response;
};

///////// AUTH

///////// Forgot password

export const resetUserPassword = async ({ email }) => {
  const response = await forgotPassword({ email });
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
      type: ADD_USERINFO,
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
      type: ADD_USERINFO,
      payload: response
    });
  }
  return response;
};

export const postUserInfo = async ({ token, data, dispatch }) => {
  const response = await updateUserInformation({ token, data });
  if (response) {
    dispatch({
      type: ADD_USERINFO,
      payload: response
    });
  }
  return response;
};

/////// User

export const fetchItems = async ({ dispatch, token }) => {
  let response = await listOfCompanies(token);
  if (response) {
    await dispatch({
      type: ADD_ITEMS,
      payload: response
    });
  }
  return response;
};

// fetch favoriteItemsKeys for user from server (doing it only once at start)

export const fetchFavoriteItems = async ({ token, dispatch }) => {
  let response = await listFavoritesCompanies(token);

  if (response) {
    response.forEach(item => (item.featured = true));
    await dispatch({
      type: ADD_FAVORITE_ITEMS,
      payload: response
    });
  }
  return response;
};

//  Message and Comments

export const getComments = async ({ id, token, dispatch, page, comments }) => {
  let response = await getItemComments({ id, token, page });
  if (response) {
    if (!page) {
      dispatch({
        type: ADD_COMMENTS,
        payload: response
      });
    } // adding new comments from page 2/3/4/5......
    else {
      let newPayload = { ...comments };
      newPayload.data = [...newPayload.data, ...response.data];
      newPayload.meta = response.meta;
      dispatch({
        type: ADD_COMMENTS,
        payload: newPayload
      });
    }
  }

  return response;
};

export const sendComment = async ({ ...props }) => {
  let response = await sendComments(props);

  return response;
};

export const sendMessageToAdmin = async ({ ...props }) => {
  let response = await sendMessageToAdmins(props);

  return response;
};

//  Message and Comments

// CreditCardApi

export const checkCreditCardSubscription = async ({ token, dispatch }) => {
  let response = await checkBillingSubscription(token);
  dispatch({
    type: SUBSCRIPTION,
    payload: response
  });
  return response;
};

export const addCreditCardSubscription = async ({ ...props }) => {
  let response = await addBillingSubscription(props);
  props.dispatch({
    type: SUBSCRIPTION,
    payload: response ? response : false
  });
  return response;
};

export const deleteCreditCardSubscription = async ({ ...props }) => {
  Alert.alert(
    "Cancel Subscription?",
    "Are you sure that you want to cancel subscription?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: "OK",
        onPress: async () => {
          props.setIsLoading(true);
          let response = await deleteBillingSubscription(props);
          if (response) {
            props.dispatch({
              type: SUBSCRIPTION,
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
    type: ADD_ITEMS,
    payload: items
  });
};

export const changeFavoriteCompanies = ({ token, item }) => {
  if (!item.featured) {
    removeFromFavorites({ token, id: item.id });
  } else {
    attachToFavorites({ token, id: item.id });
  }
};

// change item.featured , favoriteItems , favoriteItemsKeys(All logic in reducer)

export const handleClickIcon = ({ item, dispatch }) => {
  dispatch({
    type: FEATURED,
    payload: item
  });
};

// other

export const clearUserLocal = async ({ dispatch }) =>
  new Promise((resolve, reject) => {
    Alert.alert(
      "Logout user",
      "Are you sure that you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => {
            console.log("Cancel Pressed");
            resolve("No");
          },
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            console.log("loging out )");
            AsyncStorage.clear().catch(e => console.log(e));
            dispatch({
              type: CLEAR_USER
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

// handle back button
export const handleBackButton = () => {
  Alert.alert(
    "Exit App",
    "Exiting the application?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: "OK",
        onPress: () => BackHandler.exitApp()
      }
    ],
    {
      cancelable: false
    }
  );
  return true;
};
