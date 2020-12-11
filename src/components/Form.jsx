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
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <input
            className="form-control"
            type="text"
            name="name"
            value={formData.name}
            placeholder="Name"
            onChange={handleChange}
          />
        </div>
        <div class="mb-3">
          <input
            className="form-control"
            type="number"
            name="budget"
            value={formData.budget}
            placeholder="Budget"
            onChange={handleChange}
          />
        </div>
        <div class="mb-3">
          <input
            className="form-control"
            type="text"
            name="gifts"
            value={formData.gifts}
            placeholder="Gifts"
            onChange={handleChange}
          />
        </div>
        <input
          className="btn btn-primary"
          type="submit"
          value={action.toUpperCase()}
        />
      </form>
    </div>
  );
};

export default Form;
