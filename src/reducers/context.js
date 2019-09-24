import React, { useReducer } from "react";
import { dispatchTypes } from "../actions/userActions";

let reducer = (state, action) => {
  switch (action.type) {
    case dispatchTypes.ADD_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    case dispatchTypes.CLEAR_USER:
      return {
        ...state,
        token: ""
      };
    case dispatchTypes.ADD_USERINFO:
      return {
        ...state,
        userInfo: action.payload
      };
    case dispatchTypes.ADD_ITEMS:
      return {
        ...state,
        items: action.payload
      };
    case dispatchTypes.FEATURED:
      const Item = state.items.find(item => item.id === action.payload.id);
      if (Item.featured) {
        Item.featured = false;
        return {
          ...state,
          items: [...state.items],
          favoriteItems: state.favoriteItems.filter(item => item.id !== Item.id)
        };
      } else {
        Item.featured = true;
        return {
          ...state,
          items: [...state.items],
          favoriteItems: [Item, ...state.favoriteItems]
        };
      }
    case dispatchTypes.ADD_FAVORITE_ITEMS:
      return {
        ...state,
        favoriteItems: action.payload
      };
    case dispatchTypes.ADD_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };
    case dispatchTypes.SUBSCRIPTION:
      return {
        ...state,
        subscription: action.payload
      };

    default:
      return state;
  }
};
const initialState = {
  token: null,
  userInfo: null,
  items: [],
  favoriteItems: [],
  comments: {},
  subscription: false
};

const UserContext = React.createContext(initialState);

function MyProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
}
export { UserContext, MyProvider };
