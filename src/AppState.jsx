import React from "react";

//INITIAL STATE

const initialState = {
  url: "http://jsgiftlistbackend.herokuapp.com",
};

//REDUCER
// action  = {type: "", payload: }
const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
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
