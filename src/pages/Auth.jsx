import React from "react";
import { useAppState } from "../AppState.jsx";

const Auth = (props) => {
  const type = props.match.params.form;
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });

  const [userData, setUserData] = React.useState(null);
  const { state, dispatch } = useAppState();

  React.useEffect(() => {
    if (userData) {
      console.log(userData);
      const { token, user } = userData;
      dispatch({ type: "auth", payload: { token, username: user.username } });
      window.localStorage.setItem(
        "auth",
        JSON.stringify({ token, username: user.username })
      );
      props.history.push("/dashboard");
    }
  }, [userData]);

  const actions = {
    signup: () => {
      return fetch(state.url + "/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((response) => response.json());
    },
    login: () => {
      return fetch(state.url + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((response) => response.json());
    },
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    actions[type]().then((data) => {
      setUserData(data);
    });
  };

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            className="form-control"
            placeholder="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            className="form-control"
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            className="btn btn-primary"
            type="submit"
            value={type.toUpperCase()}
          />
        </div>
      </form>
    </div>
  );
};

export default Auth;
