import React from "react";
import { Route, Link } from "react-router-dom";
import { useAppState } from "../AppState.jsx";
import Form from "../components/Form.jsx";

const Dashboard = (props) => {
  const { state, dispatch } = useAppState();
  const { token, url, people, username } = state;
  console.log(state);

  const getPeople = async () => {
    const response = await fetch(url + "/people/", {
      method: "GET",
      headers: {
        Authorization: "bearer " + token,
      },
    });
    const people = await response.json();
    dispatch({ type: "getPeople", payload: people });
  };

  React.useEffect(() => {
    getPeople();
  }, []);

  const loaded = () => (
    <div className="dashboard">
      <h1>{username}'s Gift List</h1>
      <Link to="/dashboard/new">
        <button>New Person</button>
      </Link>
      <Route
        path="/dashboard/:action"
        render={(rp) => <Form {...rp} getPeople={getPeople} />}
      />
      <ul>
        {state.people.map((person) => (
          <div className="person" key={person.id}>
            <h2>{person.name}</h2>
            <h4>{person.budget}</h4>
            <h4>{person.gifts}</h4>
            <button
              onClick={() => {
                dispatch({ type: "select", payload: person });
                props.history.push("/dashboard/edit");
              }}
            >
              Edit
            </button>

            <button
              onClick={() => {
                fetch(url + "/people/" + person.id, {
                  method: "DELETE",
                  headers: {
                    Authorization: "bearer " + token,
                  },
                }).then(() => getPeople());
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </ul>
    </div>
  );

  return people ? loaded() : <h3> Loading...</h3>;
};

export default Dashboard;
