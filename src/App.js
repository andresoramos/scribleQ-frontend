import React, { useState } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { Home } from "./Components/Home";
import Register from "./Components/Register";
import NavBar from "./Components/NavBar";
import Login from "./Components/Login";

function App() {
  const [test, setTest] = useState("butt bule");

  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route
          path="/"
          render={(props) => {
            return <Home />;
          }}
        />
      </Switch>
    </React.Fragment>
  );
}

export default App;
