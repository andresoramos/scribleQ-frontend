import React, { useState } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Register from "./Components/Register";

function App() {
  const [test, setTest] = useState("butt bule");

  return (
    <Switch>
      <Route
        path="/"
        render={(props) => {
          return <Register test={"This test worked"} />;
        }}
      />
    </Switch>
  );
}

export default App;
