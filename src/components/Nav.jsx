import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Nav = (props) => {
  return (
    <header>
      <h1>Gift List App</h1>
      <nav>
        <Link to="/">
          <div>Home</div>
        </Link>
        <Link to="/auth/signup">
          <div>Sign Up</div>
        </Link>
        <Link to="/auth/login">
          <div>Log In</div>
        </Link>
      </nav>
    </header>
  );
};

export default Nav;
