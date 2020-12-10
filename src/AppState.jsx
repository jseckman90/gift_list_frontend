import React, { useContext, useReducer } from "react";

//INITIAL STATE

const initialState = {
  url: "http://jsgiftlistbackend.herokuapp.com",
  token: null,
  username: null,
  people: null,
  new: {
    name: "",
    budget: "",
    gifts: "",
  },
  edit: {
    id: 0,
    name: "",
    budget: "",
    gifts: "",
  },
};

//REDUCER
// action  = {type: "", payload: }
const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case "auth":
      newState = { ...state, ...action.payload };
      return newState;
      break;
    case "logout":
      newState = { ...state, token: null, username: null };
      window.localStorage.removeItem("auth");
      return newState;
      break;
    case "getPeople":
      newState = { ...state, people: action.payload };
      return newState;
      break;
    default:
      return state;
      break;
  }
};

//APPCONTEXT
const AppContext = React.createContext(null);

//AppState component
export const AppState = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};

//useAppState hook

export const useAppState = () => {
  return React.useContext(AppContext);
};
