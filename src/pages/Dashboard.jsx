import React from "react";
import { Route, Link } from "react-router-dom";
import { useAppState } from "../AppState.jsx";
import Form from "../components/Form.jsx";

const Dashboard = (props) => {
  const { state, dispatch } = useAppState();
  const { token, url, people, username } = state;

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
        <button className="btn btn-outline-dark new">
          <ion-icon size="large" name="add-outline"></ion-icon>NEW PERSON
        </button>
      </Link>
      <Route
        path="/dashboard/:action"
        render={(rp) => <Form {...rp} getPeople={getPeople} />}
      />
      <div className="container">
        <ul>
          {state.people.map((person) => (
            <div className="card" style={{ width: "18rem" }} key={person.id}>
              <div className="card-body">
                <h2 className="card-title">{person.name}</h2>
                <h3>${person.budget}</h3>
                <h4>{person.gifts}</h4>
                <h4>{person.purchased}</h4>
                <h4>{person.wrapped}</h4>

                <button
                  className="btn"
                  onClick={() => {
                    dispatch({ type: "select", payload: person });
                    props.history.push("/dashboard/edit");
                  }}
                >
                  <ion-icon size="large" name="create-outline"></ion-icon>
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    fetch(url + "/people/" + person.id, {
                      method: "DELETE",
                      headers: {
                        Authorization: "bearer " + token,
                      },
                    }).then(() => getPeople());
                  }}
                >
                  <ion-icon size="large" name="trash-outline"></ion-icon>
                </button>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );

  return people ? loaded() : <h3> Loading...</h3>;
};

export default Dashboard;
