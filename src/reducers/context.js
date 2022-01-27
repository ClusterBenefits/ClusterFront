import React, {useReducer} from 'react';
import {dispatchTypes} from '../actions/userActions';

let reducer = (state, action) => {
  switch (action.type) {
    case dispatchTypes.ADD_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case dispatchTypes.CLEAR_USER:
      return {
        ...state,
        token: '',
      };
    case dispatchTypes.ADD_USERINFO:
      return {
        ...state,
        userInfo: {...(state?.userInfo || {}), ...(action?.payload || {})},
      };
    case dispatchTypes.FEATURED:
      const Item = state.items.data.find(item => item.id === action.payload.id);
      if (!Item) {
        const itemToRemove = state.favoriteItems.data.find(
          item => item.id === action.payload.id,
        );
        return {
          ...state,
          items: {...state.items},
          favoriteItems: {
            ...state.favoriteItems,
            data:
              state?.favoriteItems?.data?.filter(
                item => item.id !== itemToRemove.id,
              ) || [],
          },
        };
      }
      if (Item.is_favorite) {
        Item.is_favorite = false;
        return {
          ...state,
          items: {...state.items},
          favoriteItems: {
            ...state.favoriteItems,
            data:
              state?.favoriteItems?.data?.filter(item => item.id !== Item.id) ||
              [],
          },
        };
      } else {
        Item.is_favorite = true;
        //console.log(state.favoriteItems.data);
        return {
          ...state,
          items: {...state.items},
          favoriteItems: {
            ...state.favoriteItems,
            data: [...(state.favoriteItems?.data || {}), Item],
          },
        };
      }
    case dispatchTypes.SUBSCRIPTION:
      return {
        ...state,
        subscription: action.payload,
      };
    case dispatchTypes.ADD_FAVORITE_ITEMS:
      return {
        ...state,
        favoriteItems: {...(action?.payload || {})},
      };
    case dispatchTypes.ADD_ITEMS:
      return {
        ...state,
        items: {...action.payload},
      };
    case dispatchTypes.ADD_MORE_ITEMS:
      return {
        ...state,
        items: {
          ...action.payload,
          data: [
            ...(state?.items?.data || {}),
            ...(action?.payload?.data || []),
          ],
        },
      };
    case dispatchTypes.ADD_MORE_FAVORITE_ITEMS:
      return {
        ...state,
        favoriteItems: {
          ...action.payload,
          data: [
            ...(state?.favoriteItems?.data || []),
            ...(action?.payload?.data || []),
          ],
        },
      };
    default:
      return state;
  }
};
const initialState = {
  token: null,
  userInfo: null,
  items: {data: []},
  favoriteItems: {data: []},
  subscription: false,
};

const UserContext = React.createContext(initialState);

function MyProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{state, dispatch}}>
      {props.children}
    </UserContext.Provider>
  );
}
export {UserContext, MyProvider};
