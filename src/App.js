import React, { useState } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Register from "./Components/Register";
import NavBar from "./Components/NavBar";

function App() {
  const [test, setTest] = useState("butt bule");

  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route
          path="/"
          render={(props) => {
            return <Register test={"This test worked"} />;
          }}
        />
      </Switch>
    </React.Fragment>
  );
}

export default App;
