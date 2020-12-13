import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Nav from "./components/Nav";
import { useAppState } from "./AppState.jsx";

const App = (props) => {
  const { state, dispatch } = useAppState();
  React.useState(() => {
    const auth = JSON.parse(window.localStorage.getItem("auth"));
    if (auth) {
      dispatch({ type: "auth", payload: auth });
      props.history.push("/dashboard");
    } else {
      props.history.push("/");
    }
  }, []);

  return (
    <>
      <Route path="/" component={Nav} />
      <div className="jumbotron">
        <div>
          <h1 className="display-4">Gift List</h1>
          <h2>
            Gift list is an easy way to keep track of gifts you need to buy for
            friends and family
          </h2>
        </div>
      </div>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/auth/:form" component={Auth} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </>
  );
};

export default App;
