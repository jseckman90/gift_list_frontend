import React from "react";
import "../App.css";
import { useAppState } from "../AppState.jsx";

const Form = (props) => {
  const { state, dispatch } = useAppState();
  const { token } = state;
  const action = props.match.params.action;
  const [formData, setFormData] = React.useState(state[action]);

  const actions = {
    new: () => {
      return fetch(state.url + "/people", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },
        body: JSON.stringify(formData),
      }).then((response) => response.json());
    },
    edit: () => {
      return fetch(state.url + "/people/" + state.edit.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
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
    actions[action]().then((data) => {
      props.getPeople();
      props.history.push("/dashboard/");
    });
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
        />
        <input
          type="text"
          name="gifts"
          value={formData.gifts}
          onChange={handleChange}
        />
        <input type="submit" value={action} />
      </form>
    </div>
  );
};

export default Form;
