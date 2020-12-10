import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { useAppState } from "../AppState.jsx";

const Nav = (props) => {
  const { state, dispatch } = useAppState();
  return (
    <header>
      <h1>Gift List App</h1>
      <nav>
        {!state.token ? (
          <>
            <Link to="/">
              <div>Home</div>
            </Link>
            <Link to="/auth/signup">
              <div>Sign Up</div>
            </Link>
            <Link to="/auth/login">
              <div>Log In</div>
            </Link>
          </>
        ) : null}
        {state.token ? (
          <div
            onClick={() => {
              dispatch({ type: "logout" });
              props.history.push("/");
            }}
          >
            Log Out
          </div>
        ) : null}
      </nav>
    </header>
  );
};

export default Nav;
