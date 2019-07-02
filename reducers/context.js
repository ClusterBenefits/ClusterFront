import React, { useReducer } from "react";
import {
  ADD_TOKEN,
  CLEAR_USER,
  ADD_USERINFO,
  ADD_ITEMS,
  FEATURED,
  ADD_FAVORITE_ITEMS,
  ADD_COMMENTS
} from "../actions/userActions";

let reducer = (state, action) => {
  switch (action.type) {
    case ADD_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    case CLEAR_USER:
      return {
        ...state,
        token: ""
      };
    case ADD_USERINFO:
      return {
        ...state,
        userInfo: action.payload
      };
    case ADD_ITEMS:
      return {
        ...state,
        items: action.payload
      };
    case FEATURED:
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
    case ADD_FAVORITE_ITEMS:
      return {
        ...state,
        favoriteItems: action.payload
      };
    case ADD_COMMENTS:
      return {
        ...state,
        comments: action.payload
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
  comments: {}
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
